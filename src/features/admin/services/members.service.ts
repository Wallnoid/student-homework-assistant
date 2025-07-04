import { AssignAdmin, CreateUserResponse, User, UserHeaderResponse } from "@/shared/models/user.model"
import interceptor from "@/shared/services/interceptor"


const API_URL = process.env.NEXT_PUBLIC_API_URL


// Function to get members of an organization with pagination and search functionality
// It takes page number, limit of items per page, search term, and optional organization ID
export const getMembers = async ({ page, limit, search, organizationId }: { page: number, limit: number, search: string, organizationId?: number }): Promise<UserHeaderResponse> => {

    const response = await interceptor.get(`${API_URL}/users`, { params: { page, limit, search, organizationId } })
    return response.data
}


// Function to get a member by their ID
// It takes the member ID as an argument and returns a User object 
export const createMembers = async (user: User): Promise<CreateUserResponse> => {
    const response = await interceptor.post(`${API_URL}/users`, user)
    return response.data
}


// Function to update a member's information
// It takes a User object or AssignAdmin object as an argument and returns a CreateUserResponse
export const updateMember = async (user: User | AssignAdmin): Promise<CreateUserResponse> => {

    const memberId = user.id

    delete user.id

    const response = await interceptor.patch(`${API_URL}/users/${memberId}`, user)
    return response.data
}


// Function to delete a member by their ID
// It takes the member ID as an argument and returns a Promise that resolves to void
export const deleteMember = async (memberId: number): Promise<void> => {
    const response = await interceptor.delete(`${API_URL}/users/${memberId}`)
    return response.data
}


