import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Parser } from '../../src/Parser';
import { DigitParser } from '../../src/DigitParser';

let given_string: string;
let given_string_parsed: string;

let parser = new Parser();
let digitParser = new DigitParser('?');

Given(/the following line$/, (line: string) => {
    parser = new Parser();
    given_string = line;
});

Given(
    /the following line of digits with (\d+) height and (\d+) width per digits$/,
    (height: number, width: number, line: string) => {
        parser = new Parser(width, height);
        given_string = line;
    }
);

Given(/the following digit$/, (digit: string) => {
    digitParser = new DigitParser('?');
    given_string = digit;
});

When('I parse this line', () => {
    given_string_parsed = parser.parseLine(given_string);
});

When(/I parse this line of (\d+) digits$/, (digits: number) => {
    given_string_parsed = parser.parseLine(given_string, digits);
});

When('I parse this digit', () => {
    given_string_parsed = digitParser.parseChar(given_string);
});

Then(/I should get (.+)/, (expected: string) => {
    expect(given_string_parsed).to.equal(expected);
});

Then(/I should not get anything/, () => {
    expect(given_string_parsed).to.equal('');
});
