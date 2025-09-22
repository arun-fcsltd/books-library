<template>
  <div
    class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1"
  >
    <!-- Book Title & Author -->
    <div class="mb-4">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <i class="pi pi-book text-blue-500"></i>
        {{ book.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm">by {{ book.author_name }}</p>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between mt-4">
      <div class="flex gap-3">
        <NuxtLink
          :to="`/dashboard/books/${book.id}`"
          class="text-sm px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition"
        >
          <i class="pi pi-eye mr-1"></i> View
        </NuxtLink>

        <NuxtLink
          :to="`/dashboard/books/edit/${book.id}`"
          class="text-sm px-3 py-1 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition"
        >
          <i class="pi pi-pencil mr-1"></i> Edit
        </NuxtLink>
      </div>

      <button
        @click="$emit('delete', book.id)"
        class="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition"
      >
        <i class="pi pi-trash mr-1"></i> Delete
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: Object
})
defineEmits(['delete'])
</script>
