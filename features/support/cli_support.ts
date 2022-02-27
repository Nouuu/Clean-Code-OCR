import { Given, Then, When } from '@cucumber/cucumber';
import { Args } from '../../src/cli/Args';
import { expect } from 'chai';

let argsParser: Args;

Given(/^the schema (.*)$/, (schema: string) => {
    argsParser = new Args(schema);
});

When(/^parsing arguments$/, (args: string) => {
    argsParser.parse(args);
});

Then(
    /^the string argument (.*) should be (.*)$/,
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
