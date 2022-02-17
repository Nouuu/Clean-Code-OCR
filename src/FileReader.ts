import { Reader } from './Reader';
import { Parser } from './Parser';
import * as fs from 'fs';
import { FileError } from './FileError';

export class FileReader implements Reader {
    readonly parser: Parser;
    content: string;

    constructor(parser: Parser = new Parser()) {
        this.parser = parser;
        this.content = '';
    }

    parseSource(maxLine = 100): string[] {
        return this.parser.parseText(this.content);
    }

    read(input: string): string {
        try {
            this.content = fs.readFileSync(input, 'utf-8');
        } catch (e: unknown) {
            throw new FileError(`Error while reading file '${input}'`);
        }
        return this.content;
    }
}
