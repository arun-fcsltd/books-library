<template>
  <div
    class="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
    <!-- Sidebar -->
    <aside class="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 transition-colors duration-300">
      <div class="p-4">
        <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
      </div>
      <nav class="mt-4">
        <ul class="space-y-2">
          <li>
            <nuxt-link to="/dashboard"
              class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/dashboard/books"
              class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2M9 19" />
              </svg>
              Books
            </nuxt-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->

      <!-- breadcrumb -->



      <header
        class="bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center transition-colors duration-300">
        <div class="flex items-center text-gray-700 dark:text-gray-200">
          <button class="md:hidden mr-4" @click="toggleSidebar">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h2 class="text-xl font-semibold">Overview</h2>
        </div>
        <div class="flex items-center space-x-4">
          <!-- Color mode switcher -->
           
       <div>
  <ToggleButton
    v-model="isDark"
    :onLabel="''"
    :offLabel="''"
    class="w-14 h-8 rounded-full relative transition-colors duration-300"
    :class="isDark 
      ? 'bg-gray-800 border-gray-700' 
      : 'bg-yellow-400 border-yellow-300'"
  >
    <template #default>
      <span
        class="absolute top-1 left-1 w-6 h-6 flex items-center justify-center rounded-full transition-transform duration-300"
        :class="isDark 
          ? 'translate-x-6 bg-gray-900 text-white' 
          : 'translate-x-0 bg-white text-yellow-500'"
      >
        {{ isDark ? '🌙' : '☀️' }}
      </span>
    </template>
  </ToggleButton>
</div>


          <!-- User avatar -->
          <div class="relative">
            <button class="flex items-center" @click="toggle">
              <img src="https://placehold.co/40x40/png" alt="User"
                class="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <!-- Popover -->
      <Popover ref="op">
        <div class="flex flex-col gap-4 w-[18rem]">
          <div>
            <ul class="list-none p-0 m-0 flex flex-col gap-4">
              <li class="flex items-center gap-2">
                <img src="https://placehold.co/400" style="width: 32px" class="rounded-full" />
                <div>
                  <span class="font-medium">{{ user_metadata.full_name }}</span>
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ user_metadata.email }}</div>
                </div>
              </li>
              <li class="flex items-center gap-2">
                <img src="https://placehold.co/400" style="width: 32px" class="rounded-full opacity-0" />
                <div>
                  <Button label="Logout" severity="danger" class="p-button-outlined p-button-sm" @click="logout" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Popover>

      <!-- Content -->
      <main class="p-6">



        <slot />
      </main>
    </div>
  </div>
   <Toast />
</template>

<script setup>
import { ref, watch } from 'vue'
import Popover from 'primevue/popover'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton';
import MyBreadcrumb from '~/components/common/MyBreadcrumb.vue';
import Toast from "primevue/toast";

const client = useSupabaseClient()
const user = useSupabaseUser()
const { user_metadata, role, id } = user.value

console.log("Default layout user:")



const isSidebarOpen = ref(false)
const toggleSidebar = () => { isSidebarOpen.value = !isSidebarOpen.value }

const colorMode = useColorMode()
// Local toggle state based on colorMode
const isDark = ref(colorMode.preference === "dark");

// Watch toggle change and update colorMode
watch(isDark, (val) => {
  colorMode.preference = val ? "dark" : "light";
});

// Sync if colorMode changes externally
watch(() => colorMode.preference, (val) => {
  isDark.value = val === "dark";
});

const op = ref()
const toggle = (event) => { op.value.toggle(event) }

const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}



</script>

<style scoped>

.p-togglebutton-content, span.p-togglebutton-content {
  background: #000000!important;
}

</style>
