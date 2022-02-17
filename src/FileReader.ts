import { Reader } from './Reader';
import { Parser } from './Parser';
import * as fs from 'fs';

export class FileReader implements Reader {
    readonly parser: Parser;
    content: string;

    constructor(parser: Parser = new Parser()) {
        this.parser = parser;
        this.content = '';
    }

    parseSource(maxLine: number): string[] {
        return this.parser.parseText(this.content);
    }

    read(input: string): string {
        this.content = fs.readFileSync(input, 'utf-8');
        return this.content;
    }
}
