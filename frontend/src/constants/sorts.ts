export const sorts = [{title: "None", value: null},{title: "A-Z", value: "asc"}, {title: "Z-A", value: "desc"}]
export type Sort = typeof sorts[number]["value"]