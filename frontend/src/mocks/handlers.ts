import { http, HttpResponse } from "msw"
import { notesMock } from "./data/notes"
import type { CreateNote, Note } from "@/types/note"
import type { Sort } from "@/constants/sorts"
import type { Category } from "@/constants/categories"

export const handlers = [
  http.get("/api/notes", ({ request }) => {
    const url = new URL(request.url)

    const search = url.searchParams.get("search")?.toLowerCase()
    const sort: Sort = (url.searchParams.get("sort") ?? 'asc') as Sort 
    const category = url.searchParams.get("category") as Category

    let result = [...notesMock]

    // 🔍 filter by search
    if (search) {
      result = result.filter(note =>
        note.title.toLowerCase().includes(search) ||
        note.description.toLowerCase().includes(search)
      )
    }

    // 🏷 filter by category
    if (category) {
      console.log(category)
      result = result.filter(note => note.category === category)
    }

    // 🔤 sorting
    if (sort === "asc") {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    if (sort === "desc") {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    return HttpResponse.json(result)
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