<template>
  <section class="py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
    <!-- Background Animation -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
      <div class="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-10 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-white mb-4">📊 Library by Numbers</h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">Discover the impact of our digital library on student success and academic excellence</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="(stat, index) in stats" :key="index" class="text-center group">
          <div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105">
            <div class="text-4xl mb-4">{{ stat.icon }}</div>
            <div class="text-3xl md:text-4xl font-bold text-white mb-2 counter" :data-target="stat.number">0</div>
            <div class="text-gray-300 font-medium">{{ stat.label }}</div>
            <div class="text-sm text-gray-400 mt-2">{{ stat.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    icon: "📚",
    number: "25000",
    label: "Books Available",
    description: "Digital & Physical"
  },
  {
    icon: "👥",
    number: "5000",
    label: "Active Students",
    description: "Monthly Users"
  },
  {
    icon: "📖",
    number: "150000",
    label: "Books Borrowed",
    description: "This Year"
  },
  {
    icon: "⭐",
    number: "4.8",
    label: "User Rating",
    description: "Out of 5 Stars"
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
</style>