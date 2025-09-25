<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Hero Section with Book Cover -->
    <div
      class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <!-- Book Cover -->
          <div class="flex justify-center lg:justify-start">
            <div class="relative group">
              
              <div class="relative">
               
                <img :src="book.thumbnail || '/api/placeholder/300/400'" :alt="book.title"
                  class="w-64 h-80 object-cover rounded-lg shadow-2xl transform group-hover:scale-105 transition-transform duration-300" />

              </div>
            </div>
          </div>

          <!-- Book Info -->
          <div class="text-white space-y-6 col-span-2">
            <div>
              <h1 class="text-4xl md:text-5xl font-bold leading-tight mb-4">
                {{ book.title }}
              </h1>
              <p class="text-xl text-blue-100 mb-2">
                by <span class="font-semibold">{{ book.author_name }}</span>
              </p>

              <!-- Book Categories -->
              <div v-if="book.categories && book.categories.length > 0" class="flex flex-wrap gap-2 mb-4">
                <span v-for="category in book.categories" :key="category"
                  class="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {{ formatCategory(category) }}
                </span>
              </div>

              <!-- Book Stats -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div class="text-2xl font-bold">{{ book.price || 'Free' }}</div>
                  <div class="text-sm text-blue-100">Price</div>
                </div>
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div class="text-2xl font-bold">{{book?.published_date ? dayjs(book?.published_date).format('MMM YY') : dayjs(book.created_at).format('YYYY') }}</div>
                  <div class="text-sm text-blue-100">Year</div>
                </div>
              
                <div class="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-center">
                  <div class="text-2xl font-bold">4.5★</div>
                  <div class="text-sm text-blue-100">Rating</div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-4">  
              <button
                class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transform hover:scale-105 transition-all duration-200 shadow-lg">
                <i class="pi pi-book mr-2"></i>
                Borrow Book
              </button>
              <button
                class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-200">
                <i class="pi pi-heart mr-2"></i>
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Description -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <i class="pi pi-info-circle text-blue-500 mr-3"></i>
              About This Book
            </h3>
            <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {{ book.description || 'No description available for this book.' }}
            </p>
          </div>

          <!-- Additional Images -->
          <div v-if="book.images && book.images.length > 0" class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <i class="pi pi-images text-blue-500 mr-3"></i>
              Gallery
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div v-for="(image, index) in book.images" :key="index" class="relative group cursor-pointer">
                <img :src="image" :alt="`Book image ${index + 1}`"
                  class="w-full h-32 object-cover rounded-lg shadow-md group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300" />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-all duration-300">
                </div>
              </div>
            </div>
          </div>

          <!-- Reviews Section -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hidden">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <i class="pi pi-star text-yellow-500 mr-3"></i>
              Student Reviews
            </h3>
            <div class="space-y-6">
              <!-- Sample Reviews -->
              <div v-for="review in sampleReviews" :key="review.id"
                class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                <div class="flex items-start space-x-4">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {{ review.name.charAt(0) }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <h4 class="font-semibold text-gray-900 dark:text-white">{{ review.name }}</h4>
                      <div class="flex items-center">
                        <span class="text-yellow-500 mr-1">★</span>
                        <span class="text-gray-600 dark:text-gray-400">{{ review.rating }}/5</span>
                      </div>
                    </div>
                    <p class="text-gray-700 dark:text-gray-300">{{ review.comment }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">{{ review.date }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-8">
          <!-- Book Details Card -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 ">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <i class="pi pi-list text-blue-500 mr-3"></i>
              Book Details
            </h3>
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">ISBN</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ book.isbn || 'N/A' }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Genre</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ JSON.parse(book?.genre)?.join(', ') || 'General' }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Publication Year</span>
                <span class="font-semibold text-gray-900 dark:text-white">{{ book?.published_date ? dayjs(book?.published_date).format('MMM YY') : dayjs(book.created_at).format('MMM YY') }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span class="text-gray-600 dark:text-gray-400">Price</span>
                <span class="font-semibold text-green-600 dark:text-green-400">₹{{ book.price || 'Free' }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-600 dark:text-gray-400">Availability</span>
                <span
                  class="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm font-medium">
                  Available
                </span>
              </div>
            </div>
          </div>

          <!-- Related Books -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <i class="pi pi-bookmark text-blue-500 mr-3"></i>
              Related Books
            </h3>
            <div class="space-y-4">
              <div v-for="relatedBook in relatedBooks" :key="relatedBook.id"
                class="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                <img :src="relatedBook.thumbnail" :alt="relatedBook.title" class="w-12 h-16 object-cover rounded">
                <div class="flex-1">
                  <h4 class="font-semibold text-gray-900 dark:text-white text-sm">{{ relatedBook.title }}</h4>
                  <p class="text-gray-600 dark:text-gray-400 text-xs">{{ relatedBook.author_name }}</p>
                  <div class="flex items-center mt-1">
                    <span class="text-yellow-500 text-xs">★</span>
                    <span class="text-gray-500 text-xs ml-1">{{ relatedBook.rating }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Back Button (Floating) -->

  </div>
</template>

<script setup>
import dayjs from 'dayjs'
const client = useSupabaseClient()
const book = ref({})
const relatedBooks = ref([])
const route = useRoute()

// Sample data for enhanced UI
const sampleReviews = ref([
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely loved this book! The writing style is engaging and the content is very informative.",
    date: "2 days ago"
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    comment: "Great resource for my studies. Well-structured and easy to understand.",
    date: "1 week ago"
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 5,
    comment: "This book changed my perspective completely. Highly recommended!",
    date: "2 weeks ago"
  }
])



// Format category names
const formatCategory = (category) => {
  return category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Fetch book data
try {
  const response = await fetch(`/api/books?slug=${route.params.slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json()
  book.value = data
} catch (error) {
  console.error('Error fetching book:', error)
}

// SEO Meta
useHead({
  title: `${book.value.title || 'Book Details'} - College Library`,
  meta: [
    { name: 'description', content: book.value.description || 'Book details from our college library' }
  ]
})

//related books
const fetchRelatedBooks = async () => {
  try {
    const { data, error } = await client.from('books').select('*').limit(3)
    if (error) throw error
    console.log(data, "related books in this page")
    relatedBooks.value = data
    } catch (error) {
    console.error('Error fetching related books:', error)
  }
}

onMounted(() => {
  fetchRelatedBooks()
})

</script>


<style scoped>
@keyframes tilt {

  0%,
  50%,
  100% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(1deg);
  }

  75% {
    transform: rotate(-1deg);
  }
}

.animate-tilt {
  animation: tilt 10s infinite linear;
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #2563eb, #7c3aed);
}
</style>