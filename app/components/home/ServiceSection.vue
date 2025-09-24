<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">🎯 Our Services</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Everything you need for academic success, all in one digital platform
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(service, index) in services" :key="index" class="group">
          <div class="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:-translate-y-2">
            <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <span class="text-2xl">{{ service.icon }}</span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ service.title }}
            </h3>
            
            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ service.description }}
            </p>
            
            <ul class="space-y-2 mb-6">
              <li v-for="feature in service.features" :key="feature" class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <svg class="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
                {{ feature }}
              </li>
            </ul>
            
            <button class="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: "🔍",
    title: "Smart Search",
    description: "Find exactly what you need with our AI-powered search engine that understands context and intent.",
    features: ["Advanced filters", "Voice search", "Recommendation engine", "Search history"]
  },
  {
    icon: "📱",
    title: "Digital Reading",
    description: "Access thousands of e-books and digital resources from anywhere, anytime on any device.",
    features: ["Offline reading", "Note-taking tools", "Bookmarks sync", "Multiple formats"]
  },
  {
    icon: "🤝",
    title: "Study Groups",
    description: "Connect with fellow students, form study groups, and collaborate on academic projects.",
    features: ["Group chat", "Shared notes", "Study schedules", "Peer reviews"]
  },
  {
    icon: "📊",
    title: "Research Tools",
    description: "Advanced research capabilities with citation management and academic database access.",
    features: ["Citation generator", "Research tracker", "Database access", "Export options"]
  },
  {
    icon: "🎓",
    title: "Academic Support",
    description: "Get help from librarians and tutors through our integrated support system.",
    features: ["Live chat support", "Appointment booking", "Tutorial videos", "FAQ database"]
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description: "Monitor your reading progress, set goals, and track your academic achievements.",
    features: ["Reading statistics", "Goal setting", "Achievement badges", "Progress reports"]
  }
]
</script>