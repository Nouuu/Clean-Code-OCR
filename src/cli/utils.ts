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
export type ArgDefaultValues = {
    stringArgDefaultValues: Map<string, string>;
    numberArgDefaultValues: Map<string, number>;
    booleanArgDefaultValues: Map<string, boolean>;
};

export const basicTokens: TokenArg = {
    booleanToken: undefined,
    numberToken: '#',
    stringToken: '*',
};
export const basicDefaultValues: DefaultValues = {
    defaultBoolean: false,
    defaultNumber: 0,
    defaultString: '',
};
