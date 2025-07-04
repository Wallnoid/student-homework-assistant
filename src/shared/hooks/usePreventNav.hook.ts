'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createNote, updateNote } from '../services/notes.service';
import { useEditorStore } from '../store/note.store';
import toast from 'react-hot-toast';
import { useLoadNotesStore } from '../store/loadNotes.store';
import { isEquals } from '../utils/compareObjects.utils';


/**
 * Custom hook to block navigation when there are unsaved changes in the editor.
 * It listens for click events on anchor tags and prompts the user to save changes before navigating away.
 *
 * @param {string} message - The message to display in the confirmation dialog.
 * @param {boolean} shouldBlock - Whether to block navigation or not.
 */
export default function useBlockNavigation(message: string, shouldBlock: boolean) {

    // Using Next.js router and pathname to manage navigation
    // The router is used to programmatically navigate to different pages
    const router = useRouter();

    // The pathname is used to determine the current path of the application
    // It helps in checking if the user is currently on the editor page
    const pathname = usePathname();

    // Using Zustand store to manage the note state
    // The note state holds the current note being edited, including its content, title, and
    const note = useEditorStore((state) => state.note);
    // The editNote state holds the note being edited, if any
    // It is used to determine if the current note is being edited or created
    const editNote = useEditorStore((state) => state.noteEdit);

    // The deleteNote function is used to delete the current note
    // It is called when the user navigates away from the editor without saving changes
    const deleteNote = useEditorStore((state) => state.deleteNote);

    // The deleteNoteEdit function is used to clear the note being edited
    // It is called when the user navigates away from the editor without saving changes
    const deleteNoteEdit = useEditorStore((state) => state.deleteNoteEdit);

    // The setLoadNotes function is used to trigger loading of notes
    // It is called after a note is created or updated to refresh the notes list
    const setLoadNotes = useLoadNotesStore((state: any) => state.setLoad)

    // Using a ref to track if this is the first run of the effect
    // This is useful to avoid running the effect on the initial render
    const isFirstRun = useRef(true);


    // Effect to handle navigation blocking
    // This effect runs when the component mounts or when the pathname or note changes  
    useEffect(() => {


        // If the pathname does not include 'editor', do not block navigation
        if (isFirstRun.current) {

            // If the pathname does not include 'editor', do not block navigation
            if (!pathname.includes('editor')) {
                deleteNote();
                deleteNoteEdit();
            }

            isFirstRun.current = false;
            return;
        }

        // If the pathname does not include 'editor', do not block navigation
        // This is to ensure that navigation blocking only applies when the user is in the editor
        if (!shouldBlock) return;

        // If the pathname does not include 'editor', do not block navigation
        if (!pathname.includes('editor')) return;

        // If the note is empty (content, title, and tagsIds are all empty), delete the note
        // This is to prevent saving an empty note
        if ((note.content === "/n" || note.content === "") && note.title === "" && note.tagsIds.length === 0) {
            console.log('delete entró');
            deleteNote();
            return;
        }


        // Add an event listener for click events on the document
        // This listener checks if the clicked element is an anchor tag and handles navigation accordingly
        const onClick = async (e: MouseEvent) => {

            const target = e.target as HTMLElement;
            const anchor = target.closest('a');

            if (anchor && anchor.href) {
                e.preventDefault();


                if (note.title === "")
                    note.title = "New Note"


                if (editNote && !isEquals(editNote, note)) {

                    note.id = editNote.id

                    updateNote(note).then((response) => {

                        // toast.success('actualizado correctamente');
                        deleteNote();
                        deleteNoteEdit();
                        setLoadNotes(true)

                        router.push(anchor.getAttribute('href')!);

                    }).catch((error) => {
                        console.error('Error al actualizar la nota:', error);
                        toast.error('Ocurrió un error al actualizar la nota');
                    })


                } else {
                    createNote(note).then((response) => {



                        deleteNote();
                        deleteNoteEdit();
                        setLoadNotes(true)


                        router.push(anchor.getAttribute('href')!);



                    }).catch((error) => {

                        router.push('/editor/new')
                        console.error('Error al guardar la nota:', error);
                        toast.error('Ocurrió un error al guardar la nota');
                    })
                }
            }
        };
        document.addEventListener('click', onClick);

        return () => {
            document.removeEventListener('click', onClick);
        };
    }, [pathname, note]);

}
