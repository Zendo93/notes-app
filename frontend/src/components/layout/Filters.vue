<template>
    <v-sheet class="pa-4" color="surface-variant">
        <search-input class="w-50 mb-5" density="compact" prepend-inner-icon="mdi-magnify" clear-icon="mdi-close-circle-outline" label="Search Company Directory" variant="solo" />
        <Select class="w-25" label="Sort" :items="sorts" variant="outlined" />
        <Select class="w-25" label="Category" :items="categories" variant="outlined" />
    </v-sheet>
</template>
<script setup lang="ts">
import Select from '@/components/common/Select.vue';
import SearchInput from '../common/SearchInput.vue';

const sorts = ["A-Z", "Z-A"]
const categories = ["Personal", "Work", "Study", "To-Do", "Ideas"]
</script>