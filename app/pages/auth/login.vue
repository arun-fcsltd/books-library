<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transform transition-all hover:scale-105">
      <!-- Header -->
      <h2 class="text-3xl font-extrabold text-center mb-6 text-gray-900 dark:text-white">
        <i class="pi pi-sign-in mr-2 text-blue-500"></i> Welcome Back
      </h2>
      <p class="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
        Sign in to access your dashboard
      </p>

      <!-- Form Inputs -->
      <div class="space-y-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Enter your email"
            class="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition duration-200"
            required
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="w-full mt-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 transition duration-200"
            required
          />
        </div>
        <button
          type="button"
          @click="signInUser"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium transition duration-200"
        >
          Sign In
        </button>
      </div>

      <!-- Register Link -->
      <p class="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
        Don’t have an account?
        <NuxtLink to="/auth/register" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
          Register now
        </NuxtLink>
      </p>
    </div>
  </div>
</template>


<script setup>
const client = useSupabaseClient()
definePageMeta({
  layout: 'guest',
  
})
const email = ref('')
const password = ref('')
const instruments = ref([])

// async function getInstruments() {
//   const { data, error } = await client.from('books').select('*')
//   console.log('Instruments data:', data, error)
//   instruments.value = data
// }

// onMounted(() => {
//   getInstruments()
// })

const signInWithOtp = async () => {
  const { user, error } = await client.auth.signIn({
    email: email.value,
    password: password.value
  })
  console.log('User:', user)
}

const signInUser = async () => {
  const { data, error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    console.error('Login error:', error.message)
    alert(error.message)
    return
  }

  console.log('Login success:', data.user)
  //if login is successful
  navigateTo('/dashboard')
  alert(`Welcome ${data.user.email}!`)
}


</script>