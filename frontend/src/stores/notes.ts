import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Note } from '@/types/note'
import { notesApi } from '@/api/modules/notes'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])

  const noteById = computed(() => (id: string) =>
    notes.value.find(n => n.id === id)
  )
 
  async function getNotes() {
    notes.value = await notesApi.getAll()
  }

  async function addNote(note: Note) {
    const res = await notesApi.create(note)
    if (res) {
      notes.value.push(note)
    }
  }

   function updateNote(updated: Note) {
    const index = notes.value.findIndex(n => n.id === updated.id)
    if (index !== -1) {
      notes.value[index] = updated
    }
  }

  async function deleteNote(id: string) {
    const res = await notesApi.delete(id)
    if (res) {
      notes.value = notes.value.filter(n => n.id !== id)
    }
  }

  return {
    notes,
    noteById,
    getNotes,
    addNote,
    updateNote,
    deleteNote
  }
})
