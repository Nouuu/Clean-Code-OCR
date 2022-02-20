import { Given, When, Then } from "@cucumber/cucumber";
import { Checksum} from "../../src/ocr/Checksum";
import { expect } from "chai";
import {NumberChecksum} from "../../src/ocr/NumberChecksum";

let given_sequence: string;
let given_sequence_validity: boolean;

let checksum: Checksum = new NumberChecksum();

Given(/The following sequence (.+)$/, (sequence: string) => {
  given_sequence = sequence;
});

When('I check the sequence\'s checksum', () => {
  // console.log(given_sequence);
  given_sequence_validity = checksum.check(given_sequence);
});

Then(/It should be (\w+)$/, (isValid: string) => {
  expect(given_sequence_validity).to.equal(JSON.parse(isValid));
});
