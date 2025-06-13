import { ChatSession } from "./session.model"


export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPER = 'SUPER'
}


export interface Organization {
    id: number
    name: string
    domain: string
}


export interface User {
    id?: number
    name: string
    lastName: string
    email: string
    role?: Role
    isActive?: boolean
    password?: string
    organizationId?: number
    createdAt?: string
    sessions?: ChatSession[]
    organization?: Organization
}


export interface UserResponse {
    data: User[]
    total: number
    totalPages: number
}


export interface UserHeaderResponse {
    success: boolean
    message: {
        content: string[]
        displayable: boolean
    }
    data: {
        records: User[]

        total: number
        limit: number
        page: number
        pages: number
    }

}


export interface CreateUserResponse {
    success: boolean
    message: {
        content: string[]
        displayable: boolean
    },
    data: unknown
}



//User Me

export interface UserMeResponse {
    success: boolean
    message: {
        content: string[]
        displayable: boolean
    }
    data: User
}


