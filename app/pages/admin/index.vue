<template>
  <div
    class="p-6 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-500">
    <!-- Header -->
    <header class="flex justify-between items-center mb-8">
      <h2 class="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        Welcome to Your Dashboard
      </h2>
     
    </header>

    <!-- Main Grid -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <!-- Borrowed Books Card -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
          <svg class="w-6 h-6 mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016 2.292c1.052 0 2.062-.18 3-.512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          My Borrowed Books
        </h3>
        <ul class="space-y-3 text-gray-600 dark:text-gray-300">
          <li v-for="book in borrowedBooks" :key="book.id"
            class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
            <span class="font-medium">{{ book.title }}</span>
            <span class="text-sm text-gray-500 dark:text-gray-400">Due: {{ book.due }}</span>
          </li>
          <li v-if="!borrowedBooks.length" class="text-gray-500 dark:text-gray-400 italic">
            No books borrowed yet.
          </li>
        </ul>
      </div>

      <!-- Account Settings Card -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
          <svg class="w-6 h-6 mr-2 text-green-500 dark:text-green-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
          </svg>
          Account Settings
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          Manage your profile, password, and preferences.
        </p>
        <button
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          @click="openSettings">
          Update Settings
        </button>
      </div>

      <!-- Quick Actions Card -->
      <div class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
          <svg class="w-6 h-6 mr-2 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor"
            viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h3>
        <div class="space-y-3">
          <NuxtLink to="/books"
            class="w-full block text-center py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
            Browse Books
          </NuxtLink>
          <button
            class="w-full py-2 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            @click="viewHistory">
            View Borrowing History
          </button>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'



// Sample data for borrowed books
const borrowedBooks = ref([
  { id: 1, title: "1984", due: "25th Sept 2025" },
  { id: 2, title: "The Great Gatsby", due: "30th Sept 2025" },
])

// Dark mode toggle (simplified for demo; implement actual logic as needed)
// Placeholder functions for buttons
const openSettings = () => {
  alert('Opening settings...')
}

const browseBooks = () => {
  alert('Browsing books...')
}

const viewHistory = () => {
  alert('Viewing borrowing history...')
}

// definePageMeta({
//   middleware: 'auth' // only runs on this page
// })
</script>

<style scoped>
/* Custom styles for enhanced visuals */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>