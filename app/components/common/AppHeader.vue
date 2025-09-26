<template>
  <nav class="bg-blue-600 text-white p-4 flex justify-between dark:bg-gray-800">
    <!-- Logo / Home -->
    <NuxtLink to="/" class="font-bold">Talentaimer Library</NuxtLink>

    <!-- Links -->
    <div class="flex gap-4 items-center">
      <!-- Show only when user logged in -->
      <template v-if="user.role == 'admin'">
        <NuxtLink to="/dashboard">Dashboard</NuxtLink>
        
      </template>
      <template v-if="user.role == 'user'">
        <!-- {{ user }} -->
        <span class="mr-2 truncate">Hello, {{ user.first_name }} {{ user.last_name }}</span>
        <Button label="Logout" severity="danger" class="p-button-outlined p-button-sm" @click="handlelogout" />
      </template>


      <!-- Show only when user NOT logged in -->
      <template v-else>
        <NuxtLink to="/auth/login">Login</NuxtLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { handle } from '@primeuix/themes/aura/imagecompare';

const { user, logout } = useAuth()
const { showToast, confirmDialog } = useNotify()

const handlelogout = async () => {

  confirmDialog({
    message: 'Are you sure you want to logout?',
    header: 'Logout Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: async () => {
      showToast({
        severity: 'success',
        summary: 'Logout Successful',
        detail: 'You have successfully logged out.',
        life: 3000,
      })
      await logout()
      window.location.href = '/auth/login'
    },
    reject: () => { 
      //
    }
  })
}
</script>
