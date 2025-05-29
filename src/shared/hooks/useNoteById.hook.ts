import { useEffect, useState } from "react"
import { Note, NoteHeaderResponse } from "../models/note.model"
import { getNoteById } from "../services/notes.service"




export const useNoteById = (id: string) => {

    const [note, setNote] = useState<Note | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setError(false)
        getNoteById(id).then((note: NoteHeaderResponse) => {
            setNote(note.data as Note)
            console.log('note useNoteById')
            console.log(note)
        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [id])

    return { note, isLoading, error }
}
