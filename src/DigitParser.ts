import { CharParser } from './CharParser';

export class DigitParser implements CharParser {
    readonly digitMap: Map<string, string> = new Map([
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
    readonly errorStr: string;

    constructor(errorStr: string) {
        this.errorStr = errorStr;
    }

    parseChar(input: string): string {
        return this.digitMap.get(input.trimEnd()) ?? this.errorStr;
    }
}
