import {Schema} from "./Schema";
import {CharParser} from "./CharParser";

export class Parser {
    readonly charParser: CharParser;
    readonly charWidth: number;
    readonly charHeight: number;


    constructor(schema: Schema, charWidth: number = 3, charHeight: number = 4) {
        this.charParser = new CharParser(schema, '?');
        this.charWidth = charWidth;
        this.charHeight = charHeight;
    }

    parseLine(line: string, length = 9): string {
        let parsedLine = '';
        const splitLine = line.split('\n');
        for (let i = 0; i < splitLine[1].length / this.charWidth; i++) {
            let char = '';
            for (let j = 0; j < this.charHeight; j++) {
                char += splitLine[j].slice(i * this.charWidth, i * this.charWidth + this.charWidth).trimEnd() + '\n';
            }
            parsedLine += this.charParser.parseChar(char);
        }
        return parsedLine;
    }


}
