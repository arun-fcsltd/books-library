<template>
  <div>
     <AppHeader :user="user" />
    <slot />
      <Toast />
  <ConfirmPopup />
  </div>
</template>

<script setup>
import AppHeader from '~/components/common/AppHeader.vue'
const { user, logout } = useAuth()
</script>
