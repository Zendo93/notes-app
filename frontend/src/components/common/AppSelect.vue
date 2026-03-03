<script setup lang="ts">
import { computed } from 'vue'

type Value = string | number | boolean | object | null

const props = withDefaults(defineProps<{
  modelValue: Value | Value[]
  items: any[]
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  multiple?: boolean
  chips?: boolean
  clearable?: boolean
  itemTitle?: string
  itemValue?: string
}>(), {
  itemTitle: 'title',
  itemValue: 'value',
  clearable: false,
  multiple: false,
  chips: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Value | Value[]): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>

<template>
  <v-select
    v-model="model"
    :items="props.items"
    :label="props.label"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :required="props.required"
    :multiple="props.multiple"
    :chips="props.chips"
    :clearable="props.clearable"
    :item-title="props.itemTitle"
    :item-value="props.itemValue"
    density="comfortable"
    variant="outlined"
    hide-details="auto"
    v-bind="$attrs"
  >
    <slot />
  </v-select>
</template>