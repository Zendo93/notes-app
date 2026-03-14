<template>
  <v-snackbar
    v-model="show"
    :color="color"
    location="bottom"
    :prepend-icon="prependIcon"
    :text="message"
    timeout="1000"
    :title="title"
    contained
  >
    <template #actions>
        <slot name="actions" />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbar } from "@/composables/useSnackbar"

const { show, message, color, title, prependIcon } = useSnackbar()
</script>