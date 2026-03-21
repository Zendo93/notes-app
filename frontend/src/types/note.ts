import type { Category } from "@/constants/categories"
import type { Sort } from "@/constants/sorts"

export interface DeleteNote {
  success: boolean
  id: string
}

export interface Note {
  id: string
  title: string
  category: string
  description: string
}

export type CreateNote = Omit<Note, "id" | "timestamp">

export interface Filters {
  search?: string
  sort?: Sort
  category?: Category
}