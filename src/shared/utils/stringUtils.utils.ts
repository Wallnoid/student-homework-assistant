import { Line } from "../models/note.model";

export function getFirstLetter(word: string) {
    return word.charAt(0).toUpperCase()
}

export function capitalizedFormat(word: string) {
    return getFirstLetter(word) + word.slice(1).toLowerCase();
}


export function truncateText(text: string, maxLength: number) {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
}


export function formatTextWithLineBreaks(text: string) {
    return text.split('\n').join('<br />');
}


// // Converts an array of Line objects to a single string, preserving line breaks
// // and ensuring the last line does not end with a newline character.

export function stringToLines(text: string) {
    if (!text) {
        return []
    }
    const lines = text.split('\n').map((lineContent) => {
        return { content: lineContent }
    })
    console.log('lines')
    console.log(lines)
    return lines
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