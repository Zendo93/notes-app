<template>
    <v-sheet class="pa-4" color="surface-variant">
        <app-search-input v-model="search" class="w-50 mb-5" density="compact" prepend-inner-icon="mdi-magnify" clear-icon="mdi-close-circle-outline" label="Search Company Directory" variant="solo" />
        <app-select v-model="sort" class="w-25" label="Sort" :items="sorts" variant="outlined" />
        <app-select v-model="category" class="w-25" label="Category" :items="categories" variant="outlined" />
    </v-sheet>
</template>
<script setup lang="ts">
import AppSelect from '@/components/common/AppSelect.vue';
import AppSearchInput from '../common/AppSearchInput.vue';
import { ref } from 'vue';

const search = ref<string>("");
const sorts = ["A-Z", "Z-A"]
const categories = ["Personal", "Work", "Study", "To-Do", "Ideas"]
const sort = ref<string>("");
const category = ref<string>("")
</script>