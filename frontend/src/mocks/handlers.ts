import { http, HttpResponse } from "msw"
import { notesMock } from "./data/notes"
import type { CreateNote, Note } from "@/types/note"

export const handlers = [
  http.get("/api/notes", () => {
    return HttpResponse.json(notesMock)
  }),
  http.post("/api/notes", async ({ request }) => {
    const newNote: CreateNote = (await request.json()) as CreateNote

    const createdNote = {
      id: crypto.randomUUID(),
      ...newNote,
      timestamp: new Date().toISOString()
    }

    notesMock.push(createdNote)
    return HttpResponse.json(createdNote, { status: 201 })
  }),
  http.put("/api/notes/:id", async ({ params, request }) => {
    const { id } = params
    const updatedData: Note = (await request.json()) as Note

    const noteIndex = notesMock.findIndex(note => note.id === id)

    if (noteIndex === -1) {
      return HttpResponse.json(
        { message: "Note not found" },
        { status: 404 }
      )
    }

    const updatedNote = {
      ...notesMock[noteIndex],
      ...updatedData,
      timestamp: new Date().toISOString()
    }

    notesMock[noteIndex] = updatedNote

    return HttpResponse.json(updatedNote)
  })
]