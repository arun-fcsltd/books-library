<template>
  <div class="custom-uploader w-full max-w-xl mx-auto">
    <!-- Drop zone -->
    <div
      class="drop-zone border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200
                 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600
                 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900"
      :class="{ 'border-blue-500 bg-blue-50 dark:bg-blue-900': files.length }"
      @click="handleClick"
      @dragover.prevent
      @dragenter.prevent
      @drop.prevent="handleDrop"
      v-if="!files.length || multiple"
    >
      <p v-if="!files.length" class="text-gray-600 dark:text-gray-300 text-sm">
        📁 Drag & drop files here or click to select
      </p>
      <p v-else class="text-gray-700 dark:text-gray-200 text-sm">
        📂 Drop more files or click to select
      </p>

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
    <div v-if="files.length" class="files-preview mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <div
        v-for="(file, index) in files"
        :key="file.id"
        class="relative border rounded-lg p-1 bg-white dark:bg-gray-700 shadow hover:shadow-lg transition"
      >
        <img
          v-if="file.isImage"
          :src="file.preview"
          class="h-24 w-24 object-cover rounded"
        />
        <div
          v-else
          class="h-24 w-24 flex items-center justify-center bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm text-center p-2 rounded"
        >
          {{ file.name }}
        </div>

        <!-- Remove button -->
        <button
          @click="removeFile(index)"
          class="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition"
        >
          ×
        </button>
      </div>
    </div>

    <!-- Upload button -->
    <button
      v-if="files.length && files.some(f => !f.url) && (multiple || files.length === 1)"
      @click="uploadFiles"
      class="mt-4 px-5 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
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
  multiple: { type: Boolean, default: false },
  accept: { type: String, default: 'image/*' },
  maxFileSize: { type: Number, default: 2_000_000 },
  uploadUrl: { type: String, required: true },
  deleteApi: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue'])
const toast = useToast()
const files = reactive<UploadFile[]>([])
const fileInput = ref<HTMLInputElement>()

function syncFromModelValue(val: string[] | string) {
  files.splice(0, files.length)
  const urls = Array.isArray(val) ? val : val ? [val] : []
  urls.forEach(url => {
    const id = Math.random().toString(36).substring(2, 15)
    const isImage = /\.(png|jpg|jpeg|gif|webp)$/i.test(url)
    files.push({ id, name: url.split('/').pop() || 'file', preview: url, isImage, url })
  })
}

watch(() => props.modelValue, syncFromModelValue, { immediate: true })

function handleClick() {
  fileInput.value?.click()
}

function handleSelect(event: Event) {
  const input = event.target as HTMLInputElement
  addFiles(input.files)
  if (input) input.value = ''
}

function handleDrop(event: DragEvent) {
  addFiles(event.dataTransfer?.files)
}

function addFiles(fileList: FileList | null | undefined) {
  if (!fileList) return
  if (!props.multiple) files.splice(0, files.length)

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

async function uploadFiles() {
  if (!files.length) return
  const newFiles = files.filter(f => !f.url)
  if (!newFiles.length) return

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

function updateModelValue() {
  if (props.multiple) {
    emit('update:modelValue', files.filter(f => f.url).map(f => f.url!))
  } else {
    emit('update:modelValue', files[0]?.url || '')
  }
}
</script>
