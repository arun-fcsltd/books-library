<template>
  <div class="custom-uploader">
    <!-- Drop zone -->
    <div
      class="drop-zone"
      @click="handleClick"
      @dragover.prevent
      @dragenter.prevent
      @drop.prevent="handleDrop"
    >
      <p v-if="!files.length">Drag & drop files here or click to select</p>
      <p v-else>Drop more files or click to select</p>

      <input
        type="file"
        ref="fileInput"
        :multiple="multiple"
        :accept="accept"
        class="hidden"
        @change="handleSelect"
      />
    </div>

    <!-- Previews -->
    <div v-if="files.length" class="files-preview mt-2 grid grid-cols-4 gap-4">
      <div v-for="(file, index) in files" :key="file.id" class="relative border p-1 rounded">
        <img v-if="file.isImage" :src="file.preview" class="h-20 w-20 object-cover rounded" />
        <div
          v-else
          class="h-20 w-20 flex items-center justify-center bg-gray-100 text-gray-700 text-sm text-center p-1 rounded"
        >
          {{ file.name }}
        </div>
        <button
          @click="removeFile(index)"
          class="absolute top-0 right-0 text-red-500 bg-white rounded-full p-1 hover:bg-gray-100"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Upload button -->
    <button
      v-if="files.length && files.some(f => !f.url)"
      @click="uploadFiles"
      class="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Upload
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, watch } from 'vue'
import { useToast } from 'primevue/usetoast'

interface UploadFile {
  id: string
  file?: File
  name: string
  preview: string
  isImage: boolean
  url?: string
}

const props = defineProps({
  modelValue: {
    type: [Array, String] as () => string[] | string,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: true
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  maxFileSize: {
    type: Number,
    default: 2_000_000 // 2MB
  },
  uploadUrl: {
    type: String,
    required: true
  },
  deleteApi: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])
const toast = useToast()
const files = reactive<UploadFile[]>([])
const fileInput = ref<HTMLInputElement>()

// Convert external modelValue (string | string[]) into internal files list
function syncFromModelValue(val: string[] | string) {
  files.splice(0, files.length) // clear
  const urls = Array.isArray(val) ? val : val ? [val] : []
  urls.forEach(url => {
    const id = Math.random().toString(36).substring(2, 15)
    const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(url)
    files.push({ id, name: url.split('/').pop() || 'file', preview: url, isImage, url })
  })
}

// Watch for external updates
watch(() => props.modelValue, syncFromModelValue, { immediate: true })

// Handle click
function handleClick() {
  fileInput.value?.click()
}

// File select
function handleSelect(event: Event) {
  const input = event.target as HTMLInputElement
  addFiles(input.files)
  if (input) input.value = ''
}

// Drag & drop
function handleDrop(event: DragEvent) {
  addFiles(event.dataTransfer?.files)
}

// Add files
function addFiles(fileList: FileList | null | undefined) {
  if (!fileList) return
  for (const file of Array.from(fileList)) {
    if (file.size > props.maxFileSize) {
      toast.add({ severity: 'warn', summary: 'File too large', detail: file.name, life: 2000 })
      continue
    }
    const id = Math.random().toString(36).substring(2, 15)
    const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(file.name)
    const preview = isImage ? URL.createObjectURL(file) : ''
    files.push({ id, file, name: file.name, preview, isImage })
  }
}

// Upload files
async function uploadFiles() {
  if (!files.length) return
  const newFiles = files.filter(f => !f.url) // only local files
  const formData = new FormData()
  newFiles.forEach(f => f.file && formData.append('file', f.file))

  try {
    const res = await fetch(props.uploadUrl, { method: 'POST', body: formData })
    const data = await res.json()

    if (res.ok) {
      newFiles.forEach((f, i) => {
        f.url = data.urls[i]
        f.preview = data.urls[i]
      })

      updateModelValue()
      toast.add({ severity: 'success', summary: 'Uploaded', detail: `${data.urls.length} files uploaded`, life: 3000 })
    } else {
      toast.add({ severity: 'error', summary: 'Upload Failed', detail: data.statusMessage || 'Error', life: 3000 })
    }
  } catch (err: any) {
    toast.add({ severity: 'error', summary: 'Upload Failed', detail: err.message, life: 3000 })
  }
}

// Remove file
async function removeFile(index: number) {
  const file = files[index]
  if (!file) return

  if (props.deleteApi && file.url) {
    try {
      await fetch(props.deleteApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: file.url })
      })
    } catch (err) {
      console.warn('Delete API error:', err)
    }
  }
  files.splice(index, 1)
  updateModelValue()
}

// Sync internal files to modelValue
function updateModelValue() {
  if (props.multiple) {
    emit('update:modelValue', files.filter(f => f.url).map(f => f.url!))
  } else {
    emit('update:modelValue', files[0]?.url || '')
  }
}
</script>

<style scoped>
.drop-zone {
  border: 2px dashed #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}
.drop-zone:hover {
  background: #f9f9f9;
}
</style>
