<template>
  <div class="bg-neutral-800 p-4 rounded-lg shadow-md hover:shadow-green-500/30 transition">
    <div class="flex items-center justify-between mb-2">
      <span
        class="px-2 py-1 text-xs font-bold rounded"
        :class="badgeColor"
      >
        {{ framework }}
      </span>
    </div>
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="text-sm text-gray-400">{{ language }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  framework: string;
  title: string;
  language: string;
  badgeColor: string;
}>();
</script>
