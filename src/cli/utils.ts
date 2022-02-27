export class ParsingError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export type TokenArg = {
    booleanToken?: string;
    numberToken?: string;
    stringToken?: string;
};
export type DefaultValues = {
    defaultBoolean: boolean;
    defaultNumber: number;
    defaultString: string;
};
export type ArgsDefaultValues = {
    stringArgDefaultValues: Map<string, string>;
    numberArgDefaultValues: Map<string, number>;
};
