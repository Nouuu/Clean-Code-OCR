import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { DefaultParser } from '../../src/parser/DefaultParser';
import { DigitParser } from '../../src/parser/DigitParser';

let given_string: string;
let given_string_parsed: string;
let given_text_parsed: string[];

let parser = new DefaultParser();
let digitParser = new DigitParser('?');

Given(/the following line$/, (line: string) => {
    parser = new DefaultParser();
    given_string = line;
});

Given(
    /the following line of digits with (\d+) height and (\d+) width per digits$/,
    (height: number, width: number, line: string) => {
        parser = new DefaultParser(width, height);
        given_string = line;
    }
);

Given(/the following digit$/, (digit: string) => {
    digitParser = new DigitParser('?');
    given_string = digit;
});

Given(/the following text$/, (text: string) => {
    given_string = text;
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

When('I parse this text', () => {
    given_text_parsed = parser.parseText(given_string);
});

When(/I parse this text of (\d+) line$/, (maxLine: number) => {
    given_text_parsed = parser.parseText(given_string, maxLine);
});

Then(/I should get (.+)/, (expected: string) => {
    expect(given_string_parsed).to.equal(expected);
});

Then(/I should not get anything/, () => {
    expect(given_string_parsed).to.equal('');
});

Then(/^I should get$/, (lines: DataTable) => {
    expect(given_text_parsed).to.eql(lines.raw()[0]);
});

Then('I should have an empty list', () => {
    expect(given_text_parsed).to.be.empty;
});
