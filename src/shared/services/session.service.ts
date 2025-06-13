import { SessionResponse } from "../models/session.model"
import interceptor from "./interceptor"


const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getSessionById = async (id: number): Promise<SessionResponse> => {
    const response = await interceptor.get(`${API_URL}/sessions/${id}`)
    return response.data
}


export const updateSession = async (id: number, title: string) => {
    const response = await interceptor.patch(`${API_URL}/sessions/${id}`, { title })
    return response.data
}


export const deleteSession = async (id: number) => {
    const response = await interceptor.delete(`${API_URL}/sessions/${id}`)
    return response.data
}


