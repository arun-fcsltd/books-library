<template>
  <div class="bg-gray-200 dark:bg-gray-700 p-4 flex justify-between items-center">
    <!-- Left: Breadcrumb navigation -->
    <ul class="flex space-x-2 text-gray-600 dark:text-gray-300 text-sm">
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
        <span v-if="index > 0" class="mx-1">/</span>
        <NuxtLink :to="crumb.to" class="hover:underline flex items-center gap-1">
          <i v-if="crumb.icon" :class="crumb.icon"></i>
          {{ crumb.name }}
        </NuxtLink>
      </li>
    </ul>

    <!-- Right: Action buttons -->
    <div class="flex space-x-2">
  <template v-for="(action, index) in actions" :key="index">
    <!-- Link action -->
    <NuxtLink
      v-if="action.type === 'link'"
      :to="action.to"
      :class="action.class || 'bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded flex items-center gap-1'"
    >
      <i v-if="action.icon" :class="action.icon"></i>
      {{ action.name }}
    </NuxtLink>

    <!-- Button action -->
    <button
      v-else-if="action.type === 'button'"
      @click="$emit('action', action)"
      :class="action.class || 'bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1'"
    >
      <i v-if="action.icon" :class="action.icon"></i>
      {{ action.name }}
    </button>
  </template>
</div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  breadcrumbs: Array<{
    name: string
    to: string
    icon?: string
    class?: string
  }>
  actions: Array<{
    name: string
    icon?: string
    class?: string
    type?: 'button' | 'link',
    to?: string
  }>
}>()

const emit = defineEmits<{
  (e: 'action', action: { name: string; icon?: string; class?: string }): void
}>()
</script>
