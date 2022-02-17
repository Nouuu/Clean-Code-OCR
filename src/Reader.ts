export interface Reader {
    read(input: string): string;

    parseSource(maxLine: number): string[];
}
