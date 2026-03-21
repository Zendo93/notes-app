import type { CreateNote, DeleteNote, Filters, Note } from "@/types/note"
import { client } from "../client"
import { buildQueryParams } from "@/utils/buildQueryParams"

export const notesApi = {
  getAll(filters?: Filters) {
    const params = buildQueryParams(filters as any ?? {});

    // Only add ? if there are any params
    const queryString = params.toString();
    const url = queryString ? `/notes?${queryString}` : "/notes";

    return client.get<Note[]>(url);
  },

  getById(id: string) {
    return client.get<Note>(`/notes/${id}`)
  },

  create(note: CreateNote) {
    return client.post<Note>("/notes", note)
  },

  update(note: Note) {
    return client.put<Note>(`/notes/${note.id}`, note)
  },

  delete(id: string) {
    return client.delete<DeleteNote>(`/notes/${id}`)
  }
}