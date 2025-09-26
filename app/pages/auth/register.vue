<template>
 <div class="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-105">
      <!-- Header -->
      <h2 class="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
        <i class="pi pi-sign-in mr-2 text-blue-500"></i> Sign Up
      </h2>
      <p class="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
        Create an account to access your dashboard
      </p>

      <form class="space-y-4" @submit.prevent="register">
        
        <!-- Full Name -->
        <div>
          <input 
            v-model="name"
            type="text" 
            placeholder="Full Name"
            class="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition duration-200" 
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <input 
            v-model="email"
            type="email" 
            placeholder="Email"
            class="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition duration-200" 
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <input 
            v-model="password"
            type="password" 
            placeholder="Password"
            class="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition duration-200" 
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Loading Button -->
        <Button 
          type="submit" 
          label="Register" 
          icon="pi pi-user-plus" 
          :loading="loading" 
          class="w-full"
        />
      </form>

      <p class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account? 
        <NuxtLink to="/auth/login" class="text-blue-600">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'
import { useRouter } from 'vue-router' // ✅ needed for navigation

definePageMeta({
  layout: 'guest',
})

const client = useSupabaseClient()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const errors = ref({ name: '', email: '', password: '' })
const loading = ref(false) // ✅ only once

// Validation
const validateForm = () => {
  errors.value = { name: '', email: '', password: '' }
  let valid = true

  if (!name.value.trim()) {
    errors.value.name = 'Full name is required'
    valid = false
  }
  if (!email.value.trim()) {
    errors.value.email = 'Email is required'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = 'Enter a valid email address'
    valid = false
  }
  if (!password.value.trim()) {
    errors.value.password = 'Password is required'
    valid = false
  } else if (password.value.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    valid = false
  }

  return valid
}

// Register
const register = async () => {
  if (!validateForm()) return
  loading.value = true

  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { full_name: name.value }
      }
    })

    if (error) {
      errors.value.email = error.message
      loading.value = false
      return
    }

    console.log('Registration success:', data)
    alert('Registration successful! Please check your email for verification.')
    router.push('/auth/login')

  } catch (err) {
    console.error('Unexpected error:', err)
    alert('Something went wrong, please try again.')
  } finally {
    loading.value = false
  }
}
</script>
