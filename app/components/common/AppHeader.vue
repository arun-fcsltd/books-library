<template>
  <nav class="bg-blue-600 text-white p-4 flex justify-between dark:bg-gray-800">
    <!-- Logo / Home -->
    <NuxtLink to="/" class="font-bold">Talentaimer Library</NuxtLink>

    <!-- Links -->
    <div class="flex gap-4 items-center">
      <!-- Show only when user logged in -->
      <template v-if="user">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        <!-- <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button> -->
      </template>

      <!-- Show only when user NOT logged in -->
      <template v-else>
        <NuxtLink to="/auth/login">Login</NuxtLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser() // ✅ this is already reactive


</script>
