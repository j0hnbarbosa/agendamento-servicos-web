import axios from "axios"
const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
})

export const handleSetToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api