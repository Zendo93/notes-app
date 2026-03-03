// utils/validation.ts
export const required = (v: unknown) =>
  (!!v && String(v).trim().length > 0) || 'Field is required'

export const maxLength = (max: number) => (v: unknown) =>
  (!v || String(v).length <= max) || `Max ${max} characters`