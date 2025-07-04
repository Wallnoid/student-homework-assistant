import { LoginResponse } from "@/shared/models/auth.model"
import { login } from "./login.service"


// This file contains the service functions for authentication, including login and logout.
// It uses the login function to handle user login and returns a promise with the login response.
export const loginService = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await login(email, password)
        return response
    } catch (error) {
        console.error('Error en login:', error)
        throw error
    }
}

// The logout function is currently commented out, indicating that it may be implemented later.
export const logoutService = async () => {
    try {
        // await api.post('/auth/logout')
    } catch (error) {
        console.error('Error en logout:', error)
        throw error
    }
}



