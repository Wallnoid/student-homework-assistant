
export function isDarkColor(color: string | undefined | null): boolean {


    if (!color) {
        return false;
    }

    const rgb = color.replace('#', '').match(/.{1,2}/g);
    if (!rgb) {
        return false;
    }
    const r = parseInt(rgb[0], 16);
    const g = parseInt(rgb[1], 16);
    const b = parseInt(rgb[2], 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;

}



