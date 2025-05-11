
export function getFirstLetter(word: string) {
    return word.charAt(0).toUpperCase()
}

export function capitalizedFormat(word: string) {
    return getFirstLetter(word) + word.slice(1);
}


export function truncateText(text: string, maxLength: number) {
    return text.length <= maxLength ? text : text.slice(0, maxLength) + '...';
}
