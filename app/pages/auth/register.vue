<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-900">Register</h2>
      <form class="space-y-4" @submit.prevent="register">
        
        <!-- Full Name -->
        <div>
          <input 
            v-model="name"
            type="text" 
            placeholder="Full Name"
            class="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" 
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <input 
            v-model="email"
            type="email" 
            placeholder="Email"
            class="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" 
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <input 
            v-model="password"
            type="password" 
            placeholder="Password"
            class="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" 
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
