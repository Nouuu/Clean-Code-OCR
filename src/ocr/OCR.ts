export interface OCR {
    run(source: string, maxLines?: number, lineSize?:number): void;
}
