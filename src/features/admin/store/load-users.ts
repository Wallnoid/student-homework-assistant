
import { create } from 'zustand'

export const useLoadUsersStore = create((set) => ({
    load: true,
    setLoad: (load: boolean) => set({ load }),
}))
