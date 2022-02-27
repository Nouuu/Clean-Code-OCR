import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { Args } from '../../src/cli/Args';
import { expect } from 'chai';
import { ArgsDefaultValues, ParsingError } from '../../src/cli/utils';

let stringArgDefaultValues: Map<string, string>;
let numberArgDefaultValues: Map<string, number>;
let defaultArgsValues: ArgsDefaultValues;
let argsParser: Args;
let thrownError: boolean;
let thrownErrorMessage: string;

Given(/^the schema '(.*)'$/, (schema: string) => {
    argsParser = new Args(schema);
});

Given(/the schema '(.*)' with default values$/, (schema: string) => {
    defaultArgsValues = {
        stringArgDefaultValues,
        numberArgDefaultValues,
    };
    console.log(defaultArgsValues);
    argsParser = new Args(schema, defaultArgsValues);
});

Given(
    /^the following string default values$/,
    (argsDefaultValues: DataTable) => {
        stringArgDefaultValues = new Map<string, string>();
        argsDefaultValues
            .raw()
            .forEach((argValue) =>
                stringArgDefaultValues.set(argValue[0], argValue[1])
            );
    }
);

Given(
    /^the following number default values$/,
    (argsDefaultValues: DataTable) => {
        numberArgDefaultValues = new Map<string, number>();
        argsDefaultValues
            .raw()
            .forEach((argValue) =>
                numberArgDefaultValues.set(
                    argValue[0],
                    Number.parseInt(argValue[1])
                )
            );
    }
);

When(/^parsing arguments$/, (args: string) => {
    try {
        argsParser.parse(args);
    } catch (e: any) {
        if (!(e instanceof ParsingError)) {
            throw new Error(e.message);
        }
        thrownError = true;
        thrownErrorMessage = e.message;
    }
});

Then(
    /^the string argument (.*) should be$/,
    (argName: string, argExpectedValue: string) => {
        expect(argsParser.getString(argName)).to.equal(argExpectedValue);
    }
);

Then(
    /^the number argument (.*) should be (.*)$/,
    (argName: string, argExpectedValue: string) => {
        expect(argsParser.getNumber(argName)).to.equal(
            Number.parseInt(argExpectedValue)
        );
    }
);

Then(
    /^the boolean argument (.*) should be (.*)$/,
    (argName: string, argExpectedValue: string) => {
        expect(argsParser.getBoolean(argName)).to.equal(
            JSON.parse(argExpectedValue)
        );
    }
);

Then(/^I should have a ParsingError with message$/, (errorMessage: string) => {
    expect(thrownError).to.be.true;
    expect(thrownErrorMessage).to.eq(errorMessage);
});
