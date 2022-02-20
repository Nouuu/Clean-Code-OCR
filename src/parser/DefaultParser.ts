import { CharParser } from './CharParser';
import { DigitParser } from './DigitParser';
import { Parser } from './Parser';

export class DefaultParser implements Parser {
    private readonly charParser: CharParser;
    private readonly charWidth: number;
    private readonly charHeight: number;

    constructor(
        charWidth = 3,
        charHeight = 4,
        charParser: CharParser = new DigitParser('?')
    ) {
        this.charParser = charParser;
        this.charWidth = charWidth;
        this.charHeight = charHeight;
    }

    parseText(text: string, maxLines = 100): string[] {
        const parsedLines = [];
        const splicedLines = text.split('\n');
        if (splicedLines.length < this.charHeight) {
            return [];
        }
        for (
            let lineIndex = 0;
            lineIndex < splicedLines.length;
            lineIndex += this.charHeight
        ) {
            parsedLines.push(
                this.parseLine(
                    splicedLines
                        .slice(lineIndex, lineIndex + this.charHeight)
                        .join('\n')
                )
            );
        }
        return parsedLines.splice(0, maxLines);
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
