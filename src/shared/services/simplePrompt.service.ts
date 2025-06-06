import interceptor from "./interceptor"

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const simplePrompt = async (prompt: string) => {
    const response = await interceptor.post(`${API_URL}/chats/simple-prompt`, { prompt })
    return response.data
}




