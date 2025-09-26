<template>
  <div
    class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm hover:shadow-xl 
    transition transform hover:-translate-y-1 max-w-sm w-full mx-auto mb-4">
    <!-- Thumbnail -->
    <div class="mb-4">
      <img :src="book.thumbnail || '/images/placeholder.png'" :alt="book.title" class="w-full h-48 object-cover rounded-lg shadow-md" />
    </div>

    <!-- Book Title & Author -->
    <div class="mb-4">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
        <i class="pi pi-book text-blue-500"></i>
        {{ book.title }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400 text-sm">by {{ book.author_name }}</p>
    </div>

    <!-- Description -->
    <div class="mb-4">
      <p class="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
        {{ book.description || 'No description available' }}
      </p>
    </div>

    <!-- Published Date & Price -->
    <div class="mb-4 flex justify-between items-center">
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Published: {{ new Date(book.published_date).toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day:
            'numeric' }) }}
      </p>
      <p v-if="book.price" class="text-lg font-semibold text-green-600 dark:text-green-400 border border-green-600 dark:border-green-400 px-3 py-1 rounded-full">
        ₹{{ (book.price / 100).toFixed(2) }}
      </p>
      <p v-else class="text-lg font-semibold text-green-600 dark:text-green-400 ">Free</p>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between mt-4">
      <div class="flex gap-3">
        <NuxtLink :to="`/admin/books/${book.slug}`"
          class="text-sm px-4 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition font-medium">
          <i class="pi pi-eye mr-1"></i> View
        </NuxtLink>

      </div>

      <div v-if="edit" class="flex justify-end">

        <NuxtLink :to="`/admin/books/edit/${book.slug}`" 
          class="text-sm mr-2 px-4 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition font-medium">
          <i class="pi pi-pencil mr-1"></i> Edit
        </NuxtLink>
          <button @click="$emit('delete', book.id)" :loading="true"
        class="text-sm px-4 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition font-medium">
        <i class="pi pi-trash mr-1"></i> Delete
      </button>

        

      </div>
    
    </div>
  </div>
</template>

<script setup>
const { user } = useAuth()
defineProps({
  edit: {
    type: Boolean,
    default: false
  },
  book: {
    type: Object,
    required: true,
    default: () => ({
      id: '',
      slug: '',
      title: '',
      author_name: '',
      description: '',
      published_date: '',
      thumbnail: '',
      price: 0
    })
  }
})
defineEmits(['delete'])
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>