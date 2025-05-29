

export interface NoteTag {
    id?: number
    name: string
    color: string
}


export interface TagResponse {
    success: boolean
    message: {
        content: string[]
        displayable: boolean
    }
    data: NoteTag[]
}

