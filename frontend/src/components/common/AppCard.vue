<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  subtitle?: string
  description?: string
  elevation?: number | string
  variant?: "flat" | "text" | "elevated" | "outlined" | "plain" | "tonal" 
  titleClass?: string
  actionsPosition?: "top" | "bottom"
}>(), {
  actionsPosition: 'bottom'
})
</script>

<template>
  <v-card
    :elevation="props.elevation ?? 2"
    :variant="props.variant ?? 'elevated'"
    class="app-card"
    v-bind="$attrs"
  >

    <!-- actions top -->
    <v-card-actions class="float-right custom-actions" v-if="$slots.actions && actionsPosition === 'top'">
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

    <!-- actions bottom -->
    <v-card-actions v-if="$slots.actions && actionsPosition === 'bottom'">
      <slot name="actions" />
    </v-card-actions>
    
    <slot />
  </v-card>
</template>
<style scoped>
.custom-actions {
  min-height: 35px;
}
</style>