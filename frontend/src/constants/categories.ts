export const categories = [
    {title: "None", value: null},
    {title: "Personal", value: "Personal"},
    {title: "Work", value: "Work"},
    {title: "Study", value: "Study"},
    {title: "To-Do", value: "To-Do"},
    {title: "Ideas", value: "Ideas"}
] as const

export type Category = typeof categories[number]["value"];