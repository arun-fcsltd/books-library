<template>
  <div class="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 hover:scale-105">
    <!-- Book Cover with Overlay -->
    <div class="relative overflow-hidden">
      <img
        :src="book.cover"
        :alt="book.title"
        class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Floating Action Button -->
      <div class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <button class="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>

      <!-- Status Badge -->
      <div class="absolute top-4 left-4">
        <span :class="[
          'px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm',
          book.available ? 'bg-green-500/90 text-white' : 'bg-red-500/90 text-white'
        ]">
          {{ book.available ? 'Available' : 'Borrowed' }}
        </span>
      </div>
    </div>

    <!-- Book Details -->
    <div class="p-6">
      <div class="mb-2">
        <span class="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">{{ book.category }}</span>
      </div>
      
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {{ book.title }}
      </h3>
      
      <p class="text-gray-600 dark:text-gray-400 mb-3 font-medium">by {{ book.author }}</p>
      
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{{ book.description }}</p>
      
      <!-- Rating -->
      <div class="flex items-center mb-4">
        <div class="flex text-yellow-400">
          <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= book.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        </div>
        <span class="ml-2 text-sm text-gray-600 dark:text-gray-400">({{ book.reviews }} reviews)</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex space-x-2">
        <NuxtLink
          :to="`/books/${book.id}`"
          class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-center shadow-lg hover:shadow-xl"
        >
          View Details
        </NuxtLink>
        <button class="px-4 py-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 text-sm font-semibold rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300">
          {{ book.available ? 'Borrow' : 'Reserve' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: {
    type: Object,
    required: true
  }
})
</script>