<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    modelValue: string | null,
  label?: string
  rows?: number | string
  autoGrow?: boolean
}>()


const emit = defineEmits<{
  (e: 'update:modelValue', v: string | number | null): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})

</script>

<template>
  <v-textarea
    v-model="model"
    :label="props.label"
    :rows="props.rows ?? 3"
    :auto-grow="props.autoGrow ?? true"
    variant="underlined"
    v-bind="$attrs"
  />
</template>