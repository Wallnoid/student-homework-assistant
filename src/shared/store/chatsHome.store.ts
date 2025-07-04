import { create } from 'zustand'


export const useChatsHomeStore = create((set) => ({
    chatsHome: [],

    setChatsHome: (chatsHome: any[]) => set({ chatsHome }),
}))
