<script setup lang="ts">
import AppCard from '../common/AppCard.vue';
import AppButton from '../common/AppButton.vue';

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  message?: string
  color?: string
  loading?: boolean
  confirmText: string
  cancelText?: string
}>(), {
    title: 'Confirm delete',
    message: 'Are you sure you want to delete this item?',
    loading: false,
    color: 'red',
    cancelText: 'Close',
  })

const emit = defineEmits(['update:modelValue', 'confirm', 'close'])

function close() {
  // emit('update:modelValue', false)
  emit('close')
}

function confirm() {
  emit('confirm')
  // close()
}
</script>

<template>
  <v-dialog v-model="props.modelValue" max-width="400">
    <app-card 
        :title="title"
        :description="message"
        actionsPosition="bottom"
    >
    <template v-slot:actions>
        <v-spacer />
        <app-button :disabled="loading" @click="close">{{ cancelText }}</app-button>
        <app-button :loading="loading" :color=color @click="confirm">{{ confirmText }}</app-button>
    </template>
    </app-card>
  </v-dialog>
</template>