import { CharParser } from './CharParser';
import { DigitParser } from './DigitParser';

export class Parser {
    readonly charParser: CharParser;
    readonly charWidth: number;
    readonly charHeight: number;

    constructor(
        charWidth = 3,
        charHeight = 4,
        charParser: CharParser = new DigitParser('?')
    ) {
        this.charParser = charParser;
        this.charWidth = charWidth;
        this.charHeight = charHeight;
    }

    parseLine(line: string, length = 9): string {
        let parsedLine = '';
        const splitLine = line.split('\n');
        for (let charIndex = 0; charIndex < length; charIndex++) {
            parsedLine += this.getChar(charIndex, splitLine);
        }
        return parsedLine;
    }

    private getChar(charIndex: number, splitLine: string[]): string {
        let char = '';
        for (
            let charLineIndex = 0;
            charLineIndex < this.charHeight;
            charLineIndex++
        ) {
            char +=
                splitLine[charLineIndex]
                    .slice(
                        charIndex * this.charWidth,
                        charIndex * this.charWidth + this.charWidth
                    )
                    .trimEnd() + '\n';
        }
        return this.charParser.parseChar(char);
    }
}
