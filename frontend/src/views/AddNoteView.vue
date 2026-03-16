<template>
  <NoteForm
    :model-value="initialState"
    submit-label="Create Note"
    @submit="createNote"
  />
</template>

<script setup lang="ts">
import NoteForm from "@/components/notes/NoteForm.vue"
import { useNotesStore } from "@/stores/notes"
import { useSnackbar } from "@/composables/useSnackbar"

const notesStore = useNotesStore()
const notify = useSnackbar()

const initialState = {
  title: "",
  category: "",
  description: ""
}

function createNote(note: typeof initialState) {
  notesStore.addNote(note)

  notify.success("Note created")
}
</script>