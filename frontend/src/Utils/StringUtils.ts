/**
 * Truncate the given text to the given length. Can optionally truncate text with out elipsis, but by default elipsis are used.
 * @param text - the text to truncate
 * @param maxLength - the maximum length of text to return
 * @param useElipsis - whether to use elipses or not
 * @returns the truncated text
 */
export const truncateText = (text: string, maxLength: number, useElipsis: boolean = true) => {
    if (text.length <= maxLength) {
        return text;
    }
    const truncatedText = text.substring(0, maxLength - (useElipsis ? 3 : 0));
    return useElipsis ? `${truncatedText}...` : truncatedText;
}

/**
 * Capitalizes the given text and removes any leading and trailing whitespace.
 * @param text - the text to capitalize
 * @returns return the capitalized text with no leading or trailing whitespace.
 */
export const capitalize = (text: string) => {
    if (!text.trim()) {
        return text;
    }
    const trimmedText = text.trim();
    const firstLetter = trimmedText.charAt(0).toUpperCase();
    const restOfText = trimmedText.slice(1).toLowerCase()
    return firstLetter + restOfText;
}