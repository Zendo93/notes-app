import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { CreateNote, Filters, Note } from '@/types/note'
import { notesApi } from '@/api/modules/notes'

export const useNotesStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])

  const noteById = computed(() => (id: string) =>
    notes.value.find(n => n.id === id)
  )
 
  async function getNoteById(id: string) {
    try {
      const note = await notesApi.getById(id);
      const index = notes.value.findIndex(n => n.id === note.id)
      if (index !== -1) {
        notes.value[index] = note
      }
    } catch(error) {
      console.log(`Failed to get note with id ${id}`, error)
    }
  }

  async function getNotes(filters?: Filters) {
    notes.value = await notesApi.getAll(filters)
  }

  async function addNote(note: CreateNote) {
    try {
      const createdNote = await notesApi.create(note)

      if (!createdNote) return

      notes.value.push(createdNote)
    } catch (error) {
      console.error("Failed to create note:", error)
    }
  }

   async function updateNote(updated: Note) {
    try {
      const note: Note = await notesApi.update(updated);
      const index = notes.value.findIndex(n => n.id === note.id)
      if (index !== -1) {
        notes.value[index] = note
      }
    } catch(error) {
      console.log(`Failed to update note ${JSON.stringify(updateNote)}`, error)
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
    getNoteById,
    getNotes,
    addNote,
    updateNote,
    deleteNote
  }
})
