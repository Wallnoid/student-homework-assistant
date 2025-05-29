"use client"

import { Note } from "../models/note.model"
import { User } from "../models/user.model"


export const setToken = (token: string) => {
    localStorage.setItem('token', token)
}

export const getToken = () => {
    return localStorage.getItem('token')
}

export const removeToken = () => {
    localStorage.removeItem('token')
}

export const setUser = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const getUser = (): User | null => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

export const removeUser = () => {
    localStorage.removeItem('user')
}


export const getNote = (): Note | null => {

    const note = localStorage.getItem('editor-storage')

    return note ? JSON.parse(note) : null
}




