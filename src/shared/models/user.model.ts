

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    SUPER = 'SUPER'
}


export interface User {
    id?: number
    name: string
    lastName: string
    email: string
    role?: Role
    password?: string
    organizationId?: number
    createdAt?: string
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



