export interface Checksum {
    check(input: string): boolean;
}

export class NumberChecksum implements Checksum {
    check(input: string, mod = 11): boolean {
        if (this.inputHasUnreadableSequence(input)) {
            return false;
        }
        return this.inputCharsSum(input) % mod === 0;
    }

    inputHasUnreadableSequence(input: string): boolean {
        return input.split('').some((char) => char === '?');
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
