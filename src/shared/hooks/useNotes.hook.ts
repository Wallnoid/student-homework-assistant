"use client"
import { useEffect, useState } from "react"
import { deleteNoteS, getNotes } from "../services/notes.service"
import { Note, NoteHeaderResponse } from "../models/note.model"
import { useLoadNotesStore } from "../store/loadNotes.store"
import toast from "react-hot-toast"
import { useNotesHomeStore } from "../store/notesHome.store"



/** * Custom hook to manage notes in an application.
 * It provides functionality to fetch, delete, and manage notes.
 * @returns {Object} - Contains notes, loading state, error state, and functions to delete notes.
 * @property {Note[]} notes - List of notes fetched from the API
 * @property {boolean} loading - Indicates whether notes are currently being fetched
 * @property {boolean} error - Indicates whether there was an error fetching notes
 * @property {Function} deleteNote - Function to delete a note by its ID
 *      
 * * This hook uses the `useLoadNotesStore` to manage the loading state of notes
 * * and the `useNotesHomeStore` to manage the notes displayed on the home page
*/
export const useNotes = () => {

    // State variables to manage notes, loading state, and error state
    // The notes state holds the list of notes fetched from the API
    const [notes, setNotes] = useState<Note[]>([])

    // The loading state indicates whether the notes are currently being fetched
    // It is set to true when the fetch operation starts and false when it completes
    const [loading, setLoading] = useState(false)

    // The error state indicates whether there was an error fetching the notes
    // It is set to true if an error occurs during the fetch operation
    const [error, setError] = useState(false)

    // Using Zustand stores to manage the loading state of notes and the notes displayed on the home page
    // The `useLoadNotesStore` is used to determine if notes should be loaded
    const loadNotes = useLoadNotesStore((state: any) => state.load)

    // The `useNotesHomeStore` is used to manage the notes displayed on the home page
    const setLoadNotes = useLoadNotesStore((state: any) => state.setLoad)

    // The `setNotesHome` function is used to set the notes displayed on the home page
    // It is called with the last two notes fetched from the API
    const setNotesHome = useNotesHomeStore((state: any) => state.setNotesHome)


    // Effect to fetch notes when the component mounts or when `loadNotes` changes
    // This effect calls the `getNotes` function to fetch the notes from the API
    useEffect(() => {

        if (!loadNotes) return
        setLoading(true)
        getNotes().then((response: NoteHeaderResponse) => {
            setNotes(response.data as Note[])


            if (Array.isArray(response.data) && response.data.length > 2) {
                // take the last 2 notes
                setNotesHome(Array.isArray(response.data) ? response.data.slice(-2) : [response.data])
            }
            else {
                setNotesHome(response.data)
            }
        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setLoading(false)
            setLoadNotes(false)
        })
    }, [loadNotes])


    const deleteNote = async (noteId: number) => {
        try {
            deleteNoteS(noteId).then(() => {
                setLoadNotes(true)
            }).catch((error) => {
                console.log(error)
                toast.error("Error al eliminar la nota")
            })
        } catch (error) {
            console.log(error)
            toast.error("Error al eliminar la nota")
        }
    }


    return { notes, loading, error, deleteNote }
}
