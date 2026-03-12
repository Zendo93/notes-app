import { mande } from "mande"

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

export const client = mande(baseURL)

// example default headers
client.options.headers = {
  "Content-Type": "application/json"
}