<template>
  <nav class="bg-blue-600 text-white p-4 flex justify-between dark:bg-gray-800 items-center">
    <!-- Logo / Home -->
    <NuxtLink to="/" class="font-bold">Talentaimer Library</NuxtLink>

    <!-- Links -->
    <div class="flex gap-4 items-center">
      <!-- Admin only -->
   

      <!-- Logged-in User -->
      <template v-if="Object.keys(user).length > 0">
        <!-- Profile Avatar -->
        <div>
          <img
            :src="`https://ui-avatars.com/api/?name=${user.first_name} ${user.last_name}&background=random&color=random`"
            alt="Profile"
            class="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
            @click="toggleMenu"
            ref="avatar"
          />

          <!-- Custom Overlay Menu -->
          <OverlayPanel ref="op">
            <div class="p-4 w-64">
              <!-- Top Profile -->
              <div class="flex items-center gap-3 border-b pb-3">
                <img
                  :src="`https://ui-avatars.com/api/?name=${user.first_name} ${user.last_name}&background=random&color=random`"
                  class="w-12 h-12 rounded-full"
                />
                <div class="flex flex-col">
                  <span class="font-semibold">{{ user.first_name }} {{ user.last_name }}</span>
                  <span class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ user.email }}</span>
                </div>
              </div>

              <!-- Menu Items -->
              <ul class="mt-3 space-y-2">
                <li>
                  <button class="flex items-center gap-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
                    @click="navigateTo('/books')">
                    <i class="pi pi-book"></i> Books
                  </button>
                </li>
                <li>
                  <button class="flex items-center gap-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded"
                    @click="navigateTo('/settings')">
                    <i class="pi pi-cog"></i> Settings
                  </button>
                </li>
                <li>
                  <button class="flex items-center gap-2 w-full text-left text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 px-2 py-1 rounded"
                    @click="handlelogout">
                    <i class="pi pi-sign-out"></i> Logout
                  </button>
                </li>
              </ul>

              <!-- Bottom Name -->
              <div class="mt-4 text-center text-sm text-gray-400">
                Signed in as <span class="font-medium text-gray-600 dark:text-gray-300">{{ user.first_name }}</span>
              </div>
            </div>
          </OverlayPanel>
        </div>
      </template>

      <!-- Not Logged In -->
      <template v-else>
        <NuxtLink :icon="'pi pi-user'" to="/auth/login" class="dark:bg-gray-700 rounded-full text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium py-2 px-4">Login</NuxtLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import OverlayPanel from "primevue/overlaypanel";
import { icon } from "@primeuix/themes/aura/avatar";
import { object } from "zod";

const { user, logout } = useAuth();
const op = ref();

const toggleMenu = (event) => {
  op.value.toggle(event);
};

const handlelogout = async () => {
  await logout();
  window.location.href = "/auth/login";
};
</script>
