<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description?: string
}>()
</script>

<template>
  <div class="empty-state">
    <v-icon color="primary">{{ icon }}</v-icon>
    <p class="text-h6 font-weight-medium">{{ title }}</p>
    <p v-if="description" class="text-body2 mt-1">{{ description }}</p>
    <div v-if="$slots.actions" class="mt-4">
      <slot name="actions" />
    </div>
  </div>
</template>
