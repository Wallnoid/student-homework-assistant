import { CreateUserResponse, User, UserHeaderResponse } from "@/shared/models/user.model"
import axios from "axios"


const API_URL = process.env.NEXT_PUBLIC_API_URL


export const getMembers = async ({ page, limit, search }: { page: number, limit: number, search: string }): Promise<UserHeaderResponse> => {

    const response = await axios.get(`${API_URL}/users`, { params: { page, limit, search } })
    return response.data
}


export const createMembers = async (user: User): Promise<CreateUserResponse> => {
    const response = await axios.post(`${API_URL}/users`, user)
    return response.data
}


export const updateMember = async (user: User): Promise<CreateUserResponse> => {

    const memberId = user.id

    delete user.id

    const response = await axios.patch(`${API_URL}/users/${memberId}`, user)
    return response.data
}


export const deleteMember = async (memberId: number): Promise<void> => {
    const response = await axios.delete(`${API_URL}/users/${memberId}`)
    return response.data
}


