export function inputHasUnreadableSequence(
    input: string,
    unreadableSequence: string
): boolean {
    return input.split('').some((char) => char === unreadableSequence);
}
