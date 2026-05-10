<template>
    <v-sheet class="pa-4" color="surface-variant">
        <app-search-input v-model="search" class="small-search mb-5" density="compact" prepend-inner-icon="mdi-magnify" clear-icon="mdi-close-circle-outline" label="Search Note" variant="solo" />
        <app-select v-model="sort" class="small-select mb-5" density="compact" label="Sort" :items="sorts" variant="outlined" />
        <app-select v-model="category" class="small-select" density="compact" label="Category" :items="categories as unknown as any[]" variant="outlined" />
    </v-sheet>
</template>
<script setup lang="ts">
import AppSelect from '@/components/common/AppSelect.vue';
import AppSearchInput from '../common/AppSearchInput.vue';
import { ref, watch } from 'vue';
import { useDebounceFn } from "@vueuse/core"
import { categories, type Category } from '@/constants/categories';
import { sorts, type Sort } from "@/constants/sorts"
import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore()
const { getNotes } = notesStore
const search = ref<string>("");
const sort = ref<Sort>(null);
const category = ref<Category>(null)

const debouncedFetch = useDebounceFn(() => {
  getNotes({
    search: search.value,
    category: category.value as Category,
    sort: sort.value as Sort
  })
}, 300)

watch(search, debouncedFetch)
watch([sort, category], () => {
  getNotes({
    search: search.value,
    category: category.value as Category,
    sort: sort.value as Sort
  })
})
</script>
<style scoped>
.small-select {
  max-width: 140px;
}

.small-search {
  max-width: 240px;
}
</style>