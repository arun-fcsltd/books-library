<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <!-- Enhanced Hero Section -->
    <section class="relative overflow-hidden py-20 lg:py-32">
      <!-- Animated Background -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div class="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-10 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 text-center">
        <!-- Main Heading -->
        <div class="mb-8">
          <h1 class="text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 leading-tight">
            📚 College Mini-Library
          </h1>
          <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        <p class="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
          Welcome to your digital library — browse, borrow, and manage books online anytime, anywhere. 
          <span class="font-semibold text-blue-600 dark:text-blue-400">Transform your academic journey</span> with our cutting-edge platform.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row justify-center gap-6 mb-16">
          <NuxtLink
            to="/books"
            class="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700"
          >
            <span class="flex items-center justify-center">
              Explore Books
              <svg class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </NuxtLink>
          
          <NuxtLink
            to="/auth/login"
            class="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 text-lg font-semibold rounded-2xl shadow-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50"
          >
            Login / Register
          </NuxtLink>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">25K+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Books Available</div>
          </div>
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">5K+</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Active Students</div>
          </div>
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div class="text-3xl font-bold text-pink-600 dark:text-pink-400">24/7</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">Access</div>
          </div>
          <div class="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">4.8★</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 font-medium">User Rating</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Books Section -->
    <section class="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            📖 Featured Books
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our most popular and recently added books, carefully curated for academic excellence
          </p>
        </div>
        
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          <HomeBookCard v-for="book in featuredBooks" :key="book.id" :book="book" />
        </div>

        <div class="text-center">
          <NuxtLink
            to="/books"
            class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            See All Books
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Library Statistics -->
    <StatsSection />

    <!-- Services Section -->
    <ServicesSection />

    <!-- Study Spaces Section -->
    <section class="py-20 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold mb-4">🏛️ Virtual Study Spaces</h2>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience our beautiful study environments designed for focus and productivity
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(space, index) in studySpaces" :key="index" class="group relative overflow-hidden rounded-3xl">
            <img :src="space.image" :alt="space.name" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6">
              <h3 class="text-xl font-bold mb-2">{{ space.name }}</h3>
              <p class="text-gray-300 text-sm mb-3">{{ space.description }}</p>
              <div class="flex items-center text-sm text-gray-400">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
                {{ space.capacity }} seats
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <TestimonialsSection />

    <!-- Quick Access Tools -->
    <section class="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-4">⚡ Quick Access</h2>
          <p class="text-xl text-blue-100 max-w-2xl mx-auto">
            Everything you need at your fingertips
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(tool, index) in quickTools" :key="index" class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-300 border border-white/20 group hover:scale-105">
            <div class="text-4xl mb-4 group-hover:scale-110 transition-transform">{{ tool.icon }}</div>
            <h3 class="text-xl font-bold text-white mb-2">{{ tool.title }}</h3>
            <p class="text-blue-100 mb-4">{{ tool.description }}</p>
            <button class="px-6 py-2 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              {{ tool.action }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- News & Events -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">📰 Latest News & Events</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay updated with library announcements, events, and academic resources
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article v-for="(news, index) in newsItems" :key="index" class="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <img :src="news.image" :alt="news.title" class="w-full h-48 object-cover">
            <div class="p-6">
              <div class="flex items-center mb-3">
                <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold rounded-full">
                  {{ news.category }}
                </span>
                <span class="ml-3 text-sm text-gray-500 dark:text-gray-400">{{ news.date }}</span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {{ news.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ news.excerpt }}</p>
              <button class="text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Read More →
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Enhanced Footer -->
    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <!-- Library Info -->
          <div>
            <h3 class="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              📚 College Library
            </h3>
            <p class="text-gray-400 mb-4">Your gateway to academic excellence and knowledge discovery.</p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/></svg>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
            <ul class="space-y-2">
              <li><a href="/books" class="text-gray-400 hover:text-white transition-colors">Browse Books</a></li>
              <li><a href="/search" class="text-gray-400 hover:text-white transition-colors">Advanced Search</a></li>
              <li><a href="/my-account" class="text-gray-400 hover:text-white transition-colors">My Account</a></li>
              <li><a href="/reservations" class="text-gray-400 hover:text-white transition-colors">My Reservations</a></li>
              <li><a href="/study-rooms" class="text-gray-400 hover:text-white transition-colors">Study Rooms</a></li>
            </ul>
          </div>

          <!-- Services -->
          <div>
            <h4 class="text-lg font-semibold mb-4">Services</h4>
            <ul class="space-y-2">
              <li><a href="/research-help" class="text-gray-400 hover:text-white transition-colors">Research Help</a></li>
              <li><a href="/tutorials" class="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
              <li><a href="/citation-tools" class="text-gray-400 hover:text-white transition-colors">Citation Tools</a></li>
              <li><a href="/interlibrary-loan" class="text-gray-400 hover:text-white transition-colors">Interlibrary Loan</a></li>
              <li><a href="/digital-archives" class="text-gray-400 hover:text-white transition-colors">Digital Archives</a></li>
            </ul>
          </div>

          <!-- Contact & Hours -->
          <div>
            <h4 class="text-lg font-semibold mb-4">Contact & Hours</h4>
            <div class="space-y-3 text-gray-400">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                123 College Ave, Campus
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                (555) 123-4567
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                library@college.edu
              </div>
              <div class="mt-4">
                <p class="font-medium text-white">Library Hours:</p>
                <p class="text-sm">Mon-Thu: 7AM - 11PM</p>
                <p class="text-sm">Fri-Sat: 7AM - 9PM</p>
                <p class="text-sm">Sunday: 10AM - 11PM</p>
              </div>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 text-center">
          <p class="text-gray-400">© 2025 College Mini-Library. All rights reserved. Built with ❤️ for students.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import HomeBookCard from "~/components/home/HomeBookCard.vue"

definePageMeta({
  layout: 'guest'
})

const client = useSupabaseClient()
const featuredBooks = ref([])

onMounted(async () => {
  const { data, error } = await client
    .from('books')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3)

  if (data) {
    featuredBooks.value = data
  } else if (error) {
    console.error(error)
  }
})

// Enhanced book data with more details


const studySpaces = [
  {
    name: "Silent Study Hall",
    description: "Perfect for focused individual study sessions",
    capacity: 120,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop"
  },
  {
    name: "Collaborative Workspace",
    description: "Ideal for group projects and discussions",
    capacity: 60,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop"
  },
  {
    name: "Digital Media Lab",
    description: "High-tech space with computers and multimedia tools",
    capacity: 30,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
  }
]

const quickTools = [
  {
    icon: "🔍",
    title: "Quick Search",
    description: "Find books instantly",
    action: "Search Now"
  },
  {
    icon: "📅",
    title: "Book Catalog",
    description: "Browse all collections",
    action: "View Catalog"
  },
  {
    icon: "🕒",
    title: "Library Hours",
    description: "Check opening times",
    action: "View Hours"
  },
  {
    icon: "💬",
    title: "Ask Librarian",
    description: "Get instant help",
    action: "Chat Now"
  }
]

const newsItems = [
  {
    title: "New Digital Collection Added",
    excerpt: "We've added 500+ new e-books to our digital collection, including latest academic publications.",
    category: "Announcement",
    date: "Dec 15, 2024",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop"
  },
  {
    title: "Extended Holiday Hours",
    excerpt: "Library will remain open with extended hours during finals week to support student success.",
    category: "Hours",
    date: "Dec 10, 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
  },
  {
    title: "Research Workshop Series",
    excerpt: "Join our weekly workshops on advanced research techniques and citation management.",
    category: "Event",
    date: "Dec 5, 2024",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop"
  }
]
</script>

<style scoped>
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>