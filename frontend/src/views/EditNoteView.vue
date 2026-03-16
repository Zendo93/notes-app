<template>
  <NoteForm
    v-if="note"
    :model-value="note"
    submit-label="Update Note"
    @submit="updateNote"
  />
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"

import NoteForm from "@/components/notes/NoteForm.vue"
import { useNotesStore } from "@/stores/notes"
import { useSnackbar } from "@/composables/useSnackbar"
import type { Note } from "@/types/note"

const route = useRoute()
const router = useRouter()

const notesStore = useNotesStore()
const { getNoteById, noteById } = useNotesStore()
const notify = useSnackbar()

const noteId: string = route.params.id as string

const note = computed(() => noteById(noteId))

onMounted(() => {
  getNoteById(noteId)
})

function updateNote(updatedNote: Note) {
  notesStore.updateNote(updatedNote)

  notify.success("Note updated")

  router.push("/")
}
</script>