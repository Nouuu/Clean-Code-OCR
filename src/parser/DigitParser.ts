import { CharParser } from './CharParser';
import { defaultDigitMap } from '../utils/resources';

export class DigitParser implements CharParser {
    private readonly digitMap: Map<string, string>;
    private readonly errorStr: string;

    constructor(
        errorStr: string,
        digitMap= defaultDigitMap
    ) {
        this.errorStr = errorStr;
        this.digitMap = digitMap;
    }

    parseChar(input: string): string {
        return this.digitMap.get(input.trimEnd()) ?? this.errorStr;
    }
}
