import { Schema } from './Schema';

export class CharParser {
    readonly schema: Schema;
    readonly errorStr: string;

    constructor(schema: Schema, errorStr: string) {
        this.schema = schema;
        this.errorStr = errorStr;
    }

    parseChar(input: string): string {
        return this.schema.get(input.trimEnd()) ?? this.errorStr;
    }
}
