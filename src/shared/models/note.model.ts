
export interface Line {
    id?: number;
    content: string;
    type: string;
}


export interface Note {
    id?: number;
    title: string;
    content: string;
    tagsIds: number[]
    createdAt?: string;
    updatedAt?: string;
    userId?: number;
    lines?: Line[];
}



export interface NoteHeaderResponse {
    success: boolean
    message: {
        content: string[]
        displayable: boolean
    }
    data: Note[] | Note

}




