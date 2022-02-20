export interface Parser {
    parseText(text: string, maxLines: number): string[];

    parseLine(line: string, length: number): string;
}
