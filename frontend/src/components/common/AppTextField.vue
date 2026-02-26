<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | null
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  counter?: number | string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number | null): void
}>()
</script>

<template>
  <v-text-field
    density="comfortable"
    variant="outlined"
    hide-details="auto"
    :model-value="props.modelValue"
    :label="props.label"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :required="props.required"
    :counter="props.counter"
    @update:model-value="emit('update:modelValue', $event)"
    v-bind="$attrs"
  />
</template>/