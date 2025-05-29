import { LoginResponse } from "@/shared/models/auth.model"
import { login } from "./login.service"

export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await login(email, password)
        return response
    } catch (error) {
        console.error('Error en login:', error)
        throw error
    }
}

export const logoutService = async () => {
    try {
        // await api.post('/auth/logout')
    } catch (error) {
        console.error('Error en logout:', error)
        throw error
    }
}



