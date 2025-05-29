import { NoteTag } from "../models/tag.model"
import interceptor from "./interceptor"



const API_URL = process.env.NEXT_PUBLIC_API_URL


export const getTags = async () => {
    const response = await interceptor.get(`${API_URL}/tags/by-user`)
    return response.data
}


export const createTag = async (tag: NoteTag) => {
    const response = await interceptor.post(`${API_URL}/tags`, tag)
    return response.data
}


export const updateTag = async (tag: NoteTag) => {
    const id = tag.id
    delete tag.id

    const response = await interceptor.patch(`${API_URL}/tags/${id}`, tag)
    return response.data
}


export const deleteTag = async (id: number) => {
    const response = await interceptor.delete(`${API_URL}/tags/${id}`)
    return response.data
}







