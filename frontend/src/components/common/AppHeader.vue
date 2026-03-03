<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'App'
})

const emit = defineEmits<{
  (e: 'nav-click'): void
}>()
</script>

<template>
  <v-app-bar
    color="teal-darken-4"
    image="https://picsum.photos/1920/1080?random"
  >
    <template #image>
      <v-img
        gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
      />
    </template>

    <template #prepend>
      <v-app-bar-nav-icon @click="emit('nav-click')" />
    </template>

    <v-app-bar-title>
      <slot name="title">
        {{ props.title }}
      </slot>
    </v-app-bar-title>

    <!-- actions area -->
    <slot name="actions">
      <!-- sensible defaults -->
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </slot>
  </v-app-bar>
</template>