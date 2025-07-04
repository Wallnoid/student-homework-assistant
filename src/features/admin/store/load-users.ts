
import { create } from 'zustand'


// This store is used to manage the loading state of users in the application
// It allows components to trigger a reload of users when necessary, such as after creating or editing
export const useLoadUsersStore = create((set) => ({
    load: true,
    setLoad: (load: boolean) => set({ load }),
}))
