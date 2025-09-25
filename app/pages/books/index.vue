<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
    <!-- Header -->
    <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        <i class="pi pi-book mr-2 text-blue-500"></i> Book Collection
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        Explore our curated selection of books
      </p>
    </header>

    <!-- Books Grid -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
         <HomeBookCard v-for="book in books" :key="book.id" :book="book" />
      </div>
      <p v-if="!books.length" class="text-center text-gray-500 dark:text-gray-400 mt-8">
        No books available. Add some to get started!
      </p>
    </div>
  </div>
</template>

<script setup>
const client = useSupabaseClient()
import HomeBookCard from '~/components/home/HomeBookCard.vue'



definePageMeta({
  layout: 'guest'
})

const books = ref([])
// books fatche

const fetchBooks = async () => {
  const { data, error } = await client.from('books').select('*')
  books.value = data || []
}



onMounted(() => {
  fetchBooks()
})

</script>

<style scoped>
.grid {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>