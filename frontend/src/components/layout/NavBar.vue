<template>
      <app-bar @click="drawer = !drawer"/>

      <v-navigation-drawer
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : undefined"
        temporary
      >
        <v-list
          :items="items"
        ></v-list>
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
        },
        {
          title: 'Add Note',
          value: 'add-note',
        },
      ]
</script>