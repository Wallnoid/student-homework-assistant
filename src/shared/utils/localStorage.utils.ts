"use client"

import { Note } from "../models/note.model"
import { Organization } from "../models/organization.model"
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

export const setUserLocal = (user: User) => {
    localStorage.setItem('user', JSON.stringify(user))
}

export const getUserLocal = (): User | null => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

export const removeUser = () => {
    localStorage.removeItem('user')
    removeOrganization()
}


export const setOrganization = (org: Organization) => {
    localStorage.setItem('organization', JSON.stringify(org))

}

export const getOrganization = (): Organization | null => {
    const org = localStorage.getItem('organization')
    return org ? JSON.parse(org) : null
}
export const removeOrganization = () => {
    localStorage.removeItem('organization')
}


export const getNote = (): Note | null => {

    const note = localStorage.getItem('editor-storage')

    return note ? JSON.parse(note) : null
}


export const removeAllData = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('editor-storage')
}



