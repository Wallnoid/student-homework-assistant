"use client"
import { useEffect, useState } from "react"
import { getNotes } from "../services/notes.service"
import { Note, NoteHeaderResponse } from "../models/note.model"
import { useLoadNotesStore } from "../store/loadNotes.store"
import toast from "react-hot-toast"




export const useNotes = () => {
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const loadNotes = useLoadNotesStore((state: any) => state.load)
    const setLoadNotes = useLoadNotesStore((state: any) => state.setLoad)

    useEffect(() => {

        if (!loadNotes) return
        setLoading(true)
        getNotes().then((response: NoteHeaderResponse) => {
            setNotes(response.data as Note[])
            console.log(response)
        }).catch((error) => {
            setError(error)
        }).finally(() => {
            setLoading(false)
            setLoadNotes(false)
        })
    }, [loadNotes])


    const deleteNote = async (noteId: number) => {
        try {
            deleteNote(noteId).then(() => {
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
