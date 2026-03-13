import { http, HttpResponse } from "msw"
import { notesMock } from "./data/notes"
import type { CreateNote } from "@/types/note"

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
  })
]