export interface Checksum {
    check(input: string): boolean;
}

export class NumberChecksum implements Checksum {
    check(input: string, mod = 11, unreadableSequence = '?'): boolean {
        if (this.inputHasUnreadableSequence(input, unreadableSequence)) {
            return false;
        }
        return this.inputCharsSum(input) % mod === 0;
    }

    inputHasUnreadableSequence(
        input: string,
        unreadableSequence: string
    ): boolean {
        return input.split('').some((char) => char === unreadableSequence);
    }

    inputCharsSum(input: string): number {
        return input
            .split('')
            .reduce(
                (sum, currChar, index) =>
                    (index + 1) * Number.parseInt(currChar) + sum,
                0
            );
    }
}
