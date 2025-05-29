import { Line } from "../models/note.model";

export function getFirstLetter(word: string) {
    return word.charAt(0).toUpperCase()
}

export function capitalizedFormat(word: string) {
    return getFirstLetter(word) + word.slice(1).toLowerCase;
}


export function truncateText(text: string, maxLength: number) {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
}


export function lineToString(lines: Line[] | undefined) {

    if (!lines) {
        return ''
    }
    let stringToReturn = ''
    console.log('lines')
    console.log(lines)

    const lineLength = lines.length

    for (let i = 0; i < lineLength; i++) {

        if (i === lineLength - 1) {
            stringToReturn += lines[i].content
        } else {
            stringToReturn += lines[i].content + "\n"
        }


    }



    console.log('stringToReturn')
    console.log(stringToReturn)
    return stringToReturn
}