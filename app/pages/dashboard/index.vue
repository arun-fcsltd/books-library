<template>
  <div class="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
    <h2 class="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Dashboard</h2>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Borrowed Books -->
      <div class="p-6 bg-white dark:bg-gray-800 shadow rounded-lg transition-colors duration-300">
        <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
          📖 My Borrowed Books
        </h3>
        <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300">
          <li v-for="book in borrowedBooks" :key="book.id">
            {{ book.title }} — due: {{ book.due }}
          </li>
        </ul>
      </div>

      <!-- Account Settings -->
      <div class="p-6 bg-white dark:bg-gray-800 shadow rounded-lg transition-colors duration-300">
        <h3 class="font-semibold text-lg mb-2 text-gray-900 dark:text-gray-100">
          ⚙️ Account Settings
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Update profile, password, and preferences.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const borrowedBooks = [
  { id: 1, title: "1984", due: "25th Sept 2025" },
  { id: 2, title: "The Great Gatsby", due: "30th Sept 2025" },
]

// definePageMeta({
//   middleware: 'auth' // only runs on this page
// })
</script>
