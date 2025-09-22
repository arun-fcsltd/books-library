<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">Login</h2>
      <!-- <form class="space-y-4"> -->
      <input type="email" placeholder="Email" v-model="email"
        class="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
      <input v-model="password" type="password" placeholder="Password"
        class="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-blue-500" />
      <button type="button" @click="signInUser" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
      <ul class="mt-4 text-sm text-gray-600 bg-rose-100 p-2 rounded-lg shadow">
        <li v-for="instrument in instruments" :key="instrument.id">{{ instrument.title }}</li>
      </ul>
      <!-- </form> -->
      <p class="mt-4 text-center text-sm">
        Don’t have an account?
        <NuxtLink to="/auth/register" class="text-blue-600">Register</NuxtLink>
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