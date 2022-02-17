export interface Checksum {
    check(input: string): boolean;
}

export class NumberChecksum implements Checksum {
    check(input: string, mod = 11): boolean {
        if (input.split('').some((char) => char === '?')) {
            return false;
        }
        return (
            input
                .split('')
                .reduce(
                    (sum, currChar, index) =>
                        (index + 1) * Number.parseInt(currChar) + sum,
                    0
                ) %
                mod ===
            0
        );
    }
}
