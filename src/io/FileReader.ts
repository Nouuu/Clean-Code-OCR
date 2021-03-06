import { Reader } from './Reader';
import * as fs from 'fs';
import { FileError } from './FileError';

export class FileReader implements Reader {
    private content = '';

    read(input: string): void {
        try {
            this.content = fs.readFileSync(input, 'utf-8');
        } catch (e: any) {
            throw new FileError(
                `Error while reading file '${input}'\n${e.message}`
            );
        }
    }

    getContent(): string {
        return this.content;
    }
}
