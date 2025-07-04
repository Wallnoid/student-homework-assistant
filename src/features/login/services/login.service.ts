import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL


/**
 * login function sends a POST request to the API to authenticate a user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<any>} - A promise that resolves to the response data from the API.
 */
export const login = async (email: string, password: string) => {

    const response = await axios.post(`${API_URL}/auth/login`, { email, password })
    return response.data
}





