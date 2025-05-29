'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createNote, updateNote } from '../services/notes.service';
import { useEditorStore } from '../store/note.store';
import toast from 'react-hot-toast';
import { useLoadNotesStore } from '../store/loadNotes.store';
import { isEquals } from '../utils/compareObjects.utils';

export default function useBlockNavigation(message: string, shouldBlock: boolean) {
    const router = useRouter();
    const pathname = usePathname();
    const note = useEditorStore((state) => state.note);
    const editNote = useEditorStore((state) => state.noteEdit);
    const deleteNote = useEditorStore((state) => state.deleteNote);
    const deleteNoteEdit = useEditorStore((state) => state.deleteNoteEdit);
    const setLoadNotes = useLoadNotesStore((state: any) => state.setLoad)
    const isFirstRun = useRef(true);


    useEffect(() => {


        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        if (!shouldBlock) return;
        if (!pathname.includes('editor')) return;

        if ((note.content === "/n" || note.content === "") && note.title === "" && note.tagsIds.length === 0) {
            console.log('delete entró');
            deleteNote();
            return;
        }


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

                        // toast.success('Guardado correctamente');
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
