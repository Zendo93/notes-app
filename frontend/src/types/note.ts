export interface Note {
  id: string
  title: string
  category: string
  description: string
}

export type CreateNote = Omit<Note, "id" | "timestamp">