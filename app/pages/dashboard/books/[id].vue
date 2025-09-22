<template>
  <div class="max-w-2xl mx-auto p-6">
    <h2 class="text-3xl font-bold text-blue-600 mb-2">{{ book.title }}</h2>
    <p class="text-gray-600 mb-6">by {{ book.author_name }}</p>

    <p class="mb-6 text-gray-700">
      {{ book.description }}
    </p>

    <NuxtLink to="/dashboard/books" class="dark:text-gray-100 text-blue-600 hover:underline mb-6 dark:bg-gray-800 p-2 rounded">
      ← Back to Books
    </NuxtLink>
  </div>
</template>

<script setup>
const book = ref({})
const route = useRoute()


const response = await fetch(`/api/books?id=${route.params.id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },

});

const data = await response.json()
book.value = data


</script>
