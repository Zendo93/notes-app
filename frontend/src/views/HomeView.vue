<template>
    <Filters />
    <v-container fluid>
        <v-row density="comfortable">
            <v-col v-for="note in notes" :key="note.id" cols="3">
                <AppCard :title="note.title"
          :subtitle="note.category"
          :description="note.description"
          title-class="pb-0" />
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import AppCard from '@/components/common/AppCard.vue';
import Filters from '@/components/layout/Filters.vue';
import { useNotesStore } from '@/stores/notes';
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';

const notesStore = useNotesStore()
const { getNotes } = notesStore
const { notes } = storeToRefs(notesStore)

onMounted(() => {
  getNotes()
})

</script>