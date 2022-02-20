export interface Reader {
    read(input: string): void;

    getContent(): string;
}
