<template>
    <Filters />
    <v-container fluid>
        <v-row density="comfortable">
            <v-col v-for="note in notes" :key="note.id" cols="3">
                <AppCard :title="note.title"
          :subtitle="note.category"
          :description="note.description"
          title-class="pb-0" 
         >
                <template v-slot:actions>
                    <v-icon class="cursor-pointer" icon="mdi-pencil" size="small" @click="$router.push(`/edit-note/${note.id}`)"></v-icon>
                    <v-icon class="cursor-pointer" color="error" icon="mdi-delete" size="small"></v-icon>
                </template>
                </AppCard>
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