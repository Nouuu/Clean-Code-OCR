import {Given, Then, When} from '@cucumber/cucumber';
import {expect} from "chai";

let line_string: string;
let line_parsed: string = '?????????';

Given(/the following line$/, (line: string) => {
    line_string = line;
    console.log('line\n', line_string);
});

When('I parse this line', () => {
});


Then(/I should get (\w{1,9})/, (expected: string) => {
    expect(line_parsed).to.equal(expected);
});
