import { CreateUserResponse, User, UserHeaderResponse } from "@/shared/models/user.model"
import interceptor from "@/shared/services/interceptor"


const API_URL = process.env.NEXT_PUBLIC_API_URL


export const getMembers = async ({ page, limit, search }: { page: number, limit: number, search: string }): Promise<UserHeaderResponse> => {

    const response = await interceptor.get(`${API_URL}/users`, { params: { page, limit, search } })
    return response.data
}


export const createMembers = async (user: User): Promise<CreateUserResponse> => {
    const response = await interceptor.post(`${API_URL}/users`, user)
    return response.data
}


export const updateMember = async (user: User): Promise<CreateUserResponse> => {

    const memberId = user.id

    delete user.id

    const response = await interceptor.patch(`${API_URL}/users/${memberId}`, user)
    return response.data
}


export const deleteMember = async (memberId: number): Promise<void> => {
    const response = await interceptor.delete(`${API_URL}/users/${memberId}`)
    return response.data
}


