export const categories = ["Personal", "Work", "Study", "To-Do", "Ideas"] as const
export type Category = (typeof categories)[number]