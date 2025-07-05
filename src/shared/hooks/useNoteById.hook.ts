import { useEffect, useState } from "react"
import { Note, NoteHeaderResponse } from "../models/note.model"
import { getNoteById } from "../services/notes.service"


/**
 * Custom hook to fetch a note by its ID.
 * It provides functionality to manage the loading state, error handling, and the fetched note data.
 * 
 * @param {string} id - The ID of the note to fetch
 * @returns {Object} - Contains the fetched note, loading state, and error state
 * * @property {Note | null} note - The fetched note data or null if not found
 * * @property {boolean} isLoading - Indicates whether the note is currently being fetched
 * * @property {boolean} error - Indicates whether there was an error fetching the note
 */
export const useNoteById = (id: string) => {

    // State variables to manage the note data, loading state, and error state
    // The note state holds the fetched note data or null if not found
    const [note, setNote] = useState<Note | null>(null)

    // The isLoading state indicates whether the note is currently being fetched
    // It is set to true when the fetch operation starts and false when it completes
    const [isLoading, setIsLoading] = useState(true)

    // The error state indicates whether there was an error fetching the note
    // It is set to true if an error occurs during the fetch operation
    const [error, setError] = useState(false)

    // Effect to fetch the note by ID
    // This effect runs when the component mounts or when the ID changes
    // It calls the getNoteById function to fetch the note data from the API
    useEffect(() => {
        setIsLoading(true)
        setError(false)
        getNoteById(id).then((note: NoteHeaderResponse) => {
            setNote(note.data as Note)

        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [id])

    return { note, isLoading, error }
}
