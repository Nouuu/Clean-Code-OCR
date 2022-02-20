import { Writer } from './Writer';
import * as fs from 'fs';
import { FileError } from './FileError';

export class FileWriter implements Writer {
    private readonly source: string;

    constructor(source: string) {
        this.source = source;
    }

    write(input: string, filename = this.source): void {
        try {
            fs.writeFileSync(filename, input, {
                encoding: 'utf-8',
                flag: 'a+',
            });
        } catch (e: any) {
            throw new FileError(
                `Error while writing into file '${filename}'\n${e.message}`
            );
        }
    }

    writeLine(input: string, filename = this.source): void {
        this.write(input + '\n', filename);
    }
}
