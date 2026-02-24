<template>
    <v-text-field v-model="search" clear-icon="mdi-close-circle-outline" label="Search Company Directory" variant="solo"
        clearable flat hide-details></v-text-field>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const search  = ref<string>("")
</script>