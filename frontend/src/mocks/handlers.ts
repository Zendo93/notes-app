import { http, HttpResponse } from "msw"
import { notesMock } from "./data/notes"

export const handlers = [
  http.get("/api/notes", () => {
    return HttpResponse.json(notesMock)
  })
]