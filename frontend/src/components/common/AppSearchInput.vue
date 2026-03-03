<script setup lang="ts">
import { computed } from 'vue';
import AppTextField from './AppTextField.vue';

type Value = string | null

const props = defineProps<{
  modelValue: Value
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: Value): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>

<template>
  <AppTextField
    v-model="model"
    :label="props.label ?? 'Search'"
    prepend-inner-icon="mdi-magnify"
    clearable
    single-line
    flat
    hide-details
    @update:model-value="emit('update:modelValue', $event as Value)"
    v-bind="$attrs"
  />
</template>