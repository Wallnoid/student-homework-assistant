import { Note } from "../models/note.model"

export function isEquals(obj1: any, obj2: any) {

    console.log('obj1')
    console.log(obj1)
    console.log('obj2')
    console.log(obj2)
    if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
        console.log('no son iguales')
    }

    return JSON.stringify(obj1) === JSON.stringify(obj2);
}



export function isInitialNote(obj: Note) {
    return obj.content === "" && obj.title === "" && obj.tagsIds.length === 0
}

