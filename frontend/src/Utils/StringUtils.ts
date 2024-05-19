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
    return useElipsis ? `${truncateText}...` : truncatedText;
}