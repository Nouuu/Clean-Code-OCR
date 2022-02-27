export interface Writer {
    write(input: string, dest: string): void;

    writeLine(input: string, dest: string): void;
}
