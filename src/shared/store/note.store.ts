'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Note } from '../models/note.model';

type EditorState = {
    note: Note;
    noteEdit: Note | null;
    setNote: (note: Note) => void;
    getNote: () => Note;
    deleteNote: () => void;
    deleteNoteEdit: () => void;
    setNoteEdit: (note: Note | null) => void;
    getNoteEdit: () => Note | null;

};

const initialNote: Note = {
    title: '',
    content: '',
    tagsIds: [],
};

export const useEditorStore = create<EditorState>()(
    persist(
        (set, get) => ({
            note: initialNote,
            noteEdit: null,
            setNote: (note: Note) => set({ note }),
            getNote: () => get().note,
            deleteNote: () => {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('editor-storage');
                }
                set({ note: initialNote });
            },
            setNoteEdit: (note: Note | null) => set({ noteEdit: note }),
            getNoteEdit: () => get().noteEdit,
            deleteNoteEdit: () => set({ noteEdit: null }),
        }),
        {
            name: 'editor-storage',
        }
    )
);  
