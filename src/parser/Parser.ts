export interface Parser {
    parseText(text: string, maxLines: number, lineSize: number): string[];

    parseLine(line: string, length: number): string;
}
