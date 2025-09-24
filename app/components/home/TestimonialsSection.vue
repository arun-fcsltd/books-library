<template>
  <section class="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">💬 What Students Say</h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Real experiences from students who've transformed their academic journey with our library
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(testimonial, index) in testimonials" :key="index" class="group">
          <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:scale-105">
            <!-- Quote Icon -->
            <div class="flex justify-center mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L4.414 9H17a1 1 0 100-2H4.414l1.879-1.879z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>

            <!-- Rating -->
            <div class="flex justify-center mb-4">
              <div class="flex text-yellow-400">
                <svg v-for="i in testimonial.rating" :key="i" class="w-5 h-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
            </div>

            <!-- Testimonial Text -->
            <blockquote class="text-gray-700 dark:text-gray-300 text-center mb-6 italic leading-relaxed">
              "{{ testimonial.text }}"
            </blockquote>

            <!-- Student Info -->
            <div class="flex items-center justify-center">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="w-12 h-12 rounded-full mr-4 border-2 border-blue-200">
              <div class="text-center">
                <div class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400">{{ testimonial.course }}</div>
                <div class="text-xs text-blue-600 dark:text-blue-400">{{ testimonial.year }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    text: "This digital library has completely transformed how I study. The search functionality is incredible and I can access resources 24/7!",
    name: "Sarah Johnson",
    course: "Computer Science",
    year: "3rd Year",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    text: "The study group feature helped me connect with classmates and improve my grades significantly. Best academic tool ever!",
    name: "Michael Chen",
    course: "Business Administration",
    year: "2nd Year", 
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    text: "I love how I can bookmark articles, take notes, and sync everything across my devices. It's like having a personal research assistant!",
    name: "Emily Rodriguez",
    course: "Psychology",
    year: "4th Year",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    text: "The recommendation system introduced me to books I never would have found otherwise. It's expanded my academic horizons tremendously.",
    name: "David Kim",
    course: "Literature",
    year: "1st Year",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    text: "Quick access to research databases and citation tools saved me countless hours on my thesis. Absolutely essential for graduate students!",
    name: "Lisa Thompson",
    course: "Environmental Science",
    year: "Graduate",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    text: "The mobile app is fantastic! I can read during my commute and pick up right where I left off on my laptop at home.",
    name: "Alex Martinez",
    course: "Engineering",
    year: "3rd Year",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  }
]
</script>