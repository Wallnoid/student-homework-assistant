import { useEffect, useState } from "react"
import { ChatSession, SessionResponse } from "../models/session.model"
import { getSessionById } from "../services/session.service"




export const useSession = (id: number) => {

    const [session, setSession] = useState<ChatSession | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

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
