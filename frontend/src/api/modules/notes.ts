import type { Note } from "@/types/note"
import { client } from "../client"

export const notesApi = {
  getAll() {
    return client.get<Note[]>("/notes")
  },

  getById(id: string) {
    return client.get<Note>(`/notes/${id}`)
  },

  create(note: Partial<Note>) {
    return client.post("/notes", note)
  },

  update(id: string, note: Partial<Note>) {
    return client.put(`/notes/${id}`, note)
  },

  delete(id: string) {
    return client.delete(`/notes/${id}`)
  }
}