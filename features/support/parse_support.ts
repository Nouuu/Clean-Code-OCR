import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Parser } from '../../src/Parser';
import { DigitParser } from '../../src/DigitParser';

let given_string: string;
let given_string_parsed: string;
const parser = new Parser();
const digitParser = new DigitParser('?');

Given(/the following line$/, (line: string) => {
    given_string = line;
});

Given(/the following digit$/, (digit: string) => {
    given_string = digit;
});

When('I parse this line', () => {
    given_string_parsed = parser.parseLine(given_string);
});

When('I parse this digit', () => {
    given_string_parsed = digitParser.parseChar(given_string);
});

Then(/I should get (.+)/, (expected: string) => {
    expect(given_string_parsed).to.equal(expected);
});
