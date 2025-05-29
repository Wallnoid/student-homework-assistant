import { User } from "./user.model"


export interface LoginResponse {
    success: boolean
    message: {
        content: string[]
        displayable: boolean
    }
    data: {
        token: string
        user: User
        role: string
    }
}




