import { ArgParser } from './ArgParser';
import {
    ArgDefaultValues,
    basicDefaultValues,
    basicTokens,
    DefaultValues,
    ParsingError,
    TokenArg,
} from './utils';

export class Args implements ArgParser {
    readonly defaultValues: DefaultValues;

    readonly stringDelimiter: string;

    readonly stringKeys: Map<string, string> = new Map<string, string>();
    readonly numberKeys: Map<string, number> = new Map<string, number>();
    readonly booleanKeys: Map<string, boolean> = new Map<string, boolean>();

    constructor(
        schema: string,
        stringDelimiter = "'",
        tokenArgs: TokenArg = basicTokens,
        defaultValues: DefaultValues = basicDefaultValues,
        argsDefaultValues?: ArgDefaultValues
    ) {
        this.defaultValues = defaultValues;
        this.stringDelimiter = stringDelimiter;
        this.analyseSchema(schema, tokenArgs);
    }

    private analyseSchema(schema: string, tokenArgs: TokenArg) {
        schema.split(',').forEach((keyArg) => {
            switch (keyArg.trim()[1]) {
                case tokenArgs.booleanToken:
                    this.booleanKeys.set(
                        keyArg,
                        this.defaultValues.defaultBoolean
                    );
                    break;
                case tokenArgs.numberToken:
                    this.numberKeys.set(
                        keyArg.trim()[0],
                        this.defaultValues.defaultNumber
                    );
                    break;
                case tokenArgs.stringToken:
                    this.stringKeys.set(
                        keyArg.trim()[0],
                        this.defaultValues.defaultString
                    );
                    break;
                default:
                    break;
            }
        });
    }

    getBoolean(key: string): boolean {
        return this.booleanKeys.get(key) ?? this.defaultValues.defaultBoolean;
    }

    getNumber(key: string): number {
        return this.numberKeys.get(key) ?? this.defaultValues.defaultNumber;
    }

    getString(key: string): string {
        return this.stringKeys.get(key) ?? this.defaultValues.defaultString;
    }

    parse(input: string): void {
        input.split(/-| -/).forEach((arg) => {
            const key = arg[0];
            const value = arg.slice(1).trim();

            if (this.numberKeys.has(key)) {
                this.parseNumber(value, key);
            } else if (this.booleanKeys.has(key)) {
                this.parseBoolean(key);
            } else if (this.stringKeys.has(key)) {
                this.parseString(value, key);
            }
        });
    }

    private parseString(value: string, key: string) {
        if (
            value.startsWith(this.stringDelimiter) &&
            value.endsWith(this.stringDelimiter)
        ) {
            this.stringKeys.set(key, value.slice(1, -1));
        } else {
            throw new ParsingError(
                `Cannot parse string (${value}) on key ${key}`
            );
        }
    }

    private parseBoolean(key: string) {
        this.booleanKeys.set(key, true);
    }

    private parseNumber(value: string, key: string) {
        const number = Number.parseInt(value, 10);
        if (isNaN(number)) {
            throw new ParsingError(
                `Cannot parse number (${value}) on key ${key}`
            );
        }
        this.numberKeys.set(key, number);
    }
}
