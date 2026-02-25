<template>
  <app-bar @click="drawer = !drawer" />

  <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'left' : undefined" temporary>
    <v-list nav>
      <v-list-item v-for="item in items" :key="item.value" :to="item.to" :title="item.title" link
        @click="drawer = false" />
    </v-list>
  </v-navigation-drawer>
</template>
<script setup lang="ts">
import AppBar from '@/components/common/AppBar.vue';
import { ref } from 'vue';

const drawer = ref<boolean>(false)
const items = [
  {
    title: 'Home',
    value: 'home',
    to: '/',
  },
  {
    title: 'Add Note',
    value: 'add-note',
    to: '/add-note',
  },
]
</script>