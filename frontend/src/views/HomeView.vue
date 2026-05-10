<template>
    <Filters />
    <v-container fluid>
        <v-row density="comfortable">
            <v-col v-for="note in notes" :key="note.id" :cols="12 / columns">
                <AppCard :title="note.title"
          :subtitle="note.category"
          :description="note.description"
          actions-position="top"
          title-class="pb-0" 
         >
                <template v-slot:actions>
                    <v-icon class="cursor-pointer" icon="mdi-pencil" size="small" @click="$router.push(`/edit-note/${note.id}`)"></v-icon>
                    <v-icon class="cursor-pointer" color="error" icon="mdi-delete" size="small" @click="handleDelete(note.id)"></v-icon>
                </template>
                </AppCard>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup lang="ts">
import AppCard from '@/components/common/AppCard.vue';
import Filters from '@/components/layout/Filters.vue';
import { useConfirmDialog } from '@/composables/useConfirmDialog';
import { useSnackbar } from '@/composables/useSnackbar';
import { useNotesStore } from '@/stores/notes';
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue';
import { useDisplay } from 'vuetify';

const notesStore = useNotesStore()
const { getNotes } = notesStore
const { notes } = storeToRefs(notesStore)
const { confirm, setLoading, cancel } = useConfirmDialog()
const notify = useSnackbar()

const { xs, sm, md, lg } = useDisplay()

const columns = computed(() => {
  if (xs.value) return 1
  if (sm.value) return 2
  if (md.value) return 3
  if (lg.value) return 4

  return 5
})

async function handleDelete(noteId: string) {
  const ok = await confirm({
    title: 'Delete note',
    message: `Are you sure, you want to delete note with id=${noteId}?`,
    confirmText: 'Delete'
  })

  if (!ok) return

   try {
    setLoading(true)
    await notesStore.deleteNote(noteId)
    notify.success(`Note with id=${noteId} has been successfuly deleted`)
  } finally {
    setLoading(false)
    cancel()
  }
}

onMounted(() => {
  getNotes()
})

</script>