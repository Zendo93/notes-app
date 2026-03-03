<script setup lang="ts">
const props = withDefaults(defineProps<{
  label?: string
  type?: 'button' | 'submit' | 'reset'
  block?: boolean
  loading?: boolean
  disabled?: boolean
  variant?: "flat" | "text" | "elevated" | "outlined" | "plain" | "tonal" | undefined
  color?: string
}>(), {
  type: 'button',
  variant: undefined,
  color: undefined,
  block: false,
  loading: false,
  disabled: false
})
</script>

<template>
  <v-btn
    :type="props.type"
    :block="props.block"
    :loading="props.loading"
    :disabled="props.disabled"
    :variant="props.variant"
    :color="props.color"
    class="app-btn"
    v-bind="$attrs"
  >
    <slot>
      {{ props.label }}
    </slot>
  </v-btn>
</template>