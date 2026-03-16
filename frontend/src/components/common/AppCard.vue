<script setup lang="ts">
const props = defineProps<{
  title?: string
  subtitle?: string
  description?: string
  elevation?: number | string
  variant?: "flat" | "text" | "elevated" | "outlined" | "plain" | "tonal" 
  titleClass?: string
}>()
</script>

<template>
  <v-card
    :elevation="props.elevation ?? 2"
    :variant="props.variant ?? 'elevated'"
    class="app-card"
    v-bind="$attrs"
  >

    <!-- actions -->
    <v-card-actions class="float-right custom-actions" v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>

    <!-- header -->
    <v-card-title :class="props.titleClass" v-if="props.title || $slots.title">
      <slot name="title">
        {{ props.title }}
      </slot>
    </v-card-title>

    <v-card-subtitle v-if="props.subtitle || $slots.subtitle">
      <slot name="subtitle">
        {{ props.subtitle }}
      </slot>
    </v-card-subtitle>

    <!-- body -->
    <v-card-text v-if="props.description || $slots.default">
      <slot>
        {{ props.description }}
      </slot>
    </v-card-text>

    <slot />
  </v-card>
</template>
<style scoped>
.custom-actions {
  min-height: 35px;
}
</style>