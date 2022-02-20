import { inputHasUnreadableSequence } from '../utils/line_utils';
import { Checksum } from './Checksum';

export class NumberChecksum implements Checksum {
    check(input: string, mod = 11, unreadableSequence = '?'): boolean {
        if (inputHasUnreadableSequence(input, unreadableSequence)) {
            return false;
        }
        return this.inputCharsSum(input) % mod === 0;
    }

    inputCharsSum(input: string): number {
        return input
            .split('')
            .reverse()
            .reduce(
                (sum, currChar, index) =>
                    (index + 1) * Number.parseInt(currChar) + sum,
                0
            );
    }
}
