import { Note } from "../models/note.model"
import interceptor from "./interceptor"


const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getNotes = async () => {
    const response = await interceptor.get(`${API_URL}/notes`)
    return response.data
}

export const getNoteById = async (id: string) => {
    const response = await interceptor.get(`${API_URL}/notes/${id}`)
    return response.data
}

export const createNote = async (note: Note) => {
    const response = await interceptor.post(`${API_URL}/notes`, note)
    return response.data
}

export const updateNote = async (note: Note) => {
    const id = note.id

    delete note.id

    const response = await interceptor.patch(`${API_URL}/notes/${id}`, note)
    return response.data
}

export const deleteNote = async (id: number) => {
    const response = await interceptor.delete(`${API_URL}/notes/${id}`)
    return response.data
}







