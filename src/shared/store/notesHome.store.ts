
import { create } from 'zustand';

export const useNotesHomeStore = create((set) => ({
    notesHome: [],

    setNotesHome: (notesHome: any[]) => set({ notesHome }),

}));