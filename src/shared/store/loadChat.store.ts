

import { create } from 'zustand'

export const useLoadChatsStore = create((set) => ({
    load: true,
    setLoad: (load: boolean) => set({ load }),
}))
