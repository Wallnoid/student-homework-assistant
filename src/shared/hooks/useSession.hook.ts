import { useEffect, useState } from "react"
import { ChatSession, SessionResponse } from "../models/session.model"
import { getSessionById } from "../services/session.service"



/** * Custom hook to fetch a chat session by its ID.
 * It provides functionality to manage the loading state, error handling, and the fetched session data.
 * * @param {number} id - The ID of the chat session to fetch
 * * @returns {Object} - Contains the fetched session, loading state, and error state
 * * @property {ChatSession | null} session - The fetched chat session data or null if not found
 * * @property {boolean} isLoading - Indicates whether the session is currently being fetched
 * * @property {boolean} error - Indicates whether there was an error fetching the session
 */
export const useSession = (id: number) => {

    // State variables to manage the session data, loading state, and error state
    // The session state holds the fetched chat session data or null if not found
    const [session, setSession] = useState<ChatSession | null>(null)

    // The isLoading state indicates whether the session is currently being fetched
    // It is set to true when the fetch operation starts and false when it completes
    const [isLoading, setIsLoading] = useState(true)

    // The error state indicates whether there was an error fetching the session
    // It is set to true if an error occurs during the fetch operation
    const [error, setError] = useState(false)

    // Effect to fetch the session by ID
    // This effect runs when the component mounts or when the ID changes
    useEffect(() => {
        setIsLoading(true)
        setError(false)
        getSessionById(id).then((session: SessionResponse) => {
            setSession(session.data as ChatSession)
            console.log('session useSession')
            console.log(session)
        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [id])

    return { session, isLoading, error }
}
