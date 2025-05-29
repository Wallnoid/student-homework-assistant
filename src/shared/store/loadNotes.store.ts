
import { create } from 'zustand'

export const useLoadNotesStore = create((set) => ({
    load: true,
    setLoad: (load: boolean) => set({ load }),
}))
