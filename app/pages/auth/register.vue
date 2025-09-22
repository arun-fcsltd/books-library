<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form class="space-y-4" @submit.prevent="register">
        <input 
          v-model="name"
          type="text" 
          placeholder="Full Name"
          class="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          v-model="email"
          type="email" 
          placeholder="Email"
          class="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          v-model="password"
          type="password" 
          placeholder="Password"
          class="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" 
        />
        <button 
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
      <p class="mt-4 text-center text-sm">
        Already have an account? 
        <NuxtLink to="/auth/login" class="text-blue-600">Login</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSupabaseClient } from '#imports'

definePageMeta({
  layout: 'guest',
})

const client = useSupabaseClient()
const name = ref('')
const email = ref('')
const password = ref('')

const register = async () => {
  try {
    const { data, error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { full_name: name.value } // 👈 store name in user metadata
      }
    })

    if (error) {
      console.error('Registration error:', error.message)
      alert(error.message)
      return
    }

    console.log('Registration success:', data)
    alert('Registration successful! Please check your email for verification.')

  } catch (err) {
    console.error('Unexpected error:', err)
    alert('Something went wrong, please try again.')
  }
}
</script>
