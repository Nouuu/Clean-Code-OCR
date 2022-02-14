import {Given, Then, When} from '@cucumber/cucumber';
import {expect} from "chai";
import {CharParser} from "../../src/CharParser";
import {digitSchema} from "../../src/Schema";
import {Parser} from "../../src/Parser";

let line_string: string;
let line_parsed: string = '?????????';
const parser = new Parser(digitSchema);

Given(/the following line$/, (line: string) => {
    line_string = line;
});

When('I parse this line', () => {
    line_parsed = parser.parseLine(line_string)
});


Then(/I should get (\w+)/, (expected: string) => {
    expect(line_parsed).to.equal(expected);
});
