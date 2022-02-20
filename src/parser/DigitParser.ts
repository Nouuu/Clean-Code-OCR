import { CharParser } from './CharParser';

export const defaultDigitMap: Map<string, string> = new Map([
    [' _\n| |\n|_|', '0'],
    ['\n  |\n  |', '1'],
    [' _\n _|\n|_', '2'],
    [' _\n _|\n _|', '3'],
    ['\n|_|\n  |', '4'],
    [' _\n|_\n _|', '5'],
    [' _\n|_\n|_|', '6'],
    [' _\n  |\n  |', '7'],
    [' _\n|_|\n|_|', '8'],
    [' _\n|_|\n _|', '9'],
]);

export class DigitParser implements CharParser {
    private readonly digitMap: Map<string, string>;
    private readonly errorStr: string;

    constructor(errorStr: string, digitMap = defaultDigitMap) {
        this.errorStr = errorStr;
        this.digitMap = digitMap;
    }

    parseChar(input: string): string {
        return this.digitMap.get(input.trimEnd()) ?? this.errorStr;
    }
}
