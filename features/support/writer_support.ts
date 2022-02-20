import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { FileReader } from '../../src/FileReader';
import { assert, expect } from 'chai';
import { FileError } from '../../src/FileError';
import { Parser } from '../../src/Parser';
import { FileWriter } from '../../src/FileWriter';
import { Writer } from '../../src/Writer';
import * as fs from 'fs';

let writer: Writer;
let filename: string = '';
let thrownError: boolean = false;
let thrownErrorMessage: string = '';

Given(
    /^I want to write some input in the file (.*)$/,
    (givenFilename: string) => {
        filename = `features/test_files/out/${givenFilename}`;
        thrownError = false;
        thrownErrorMessage = '';

        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        }

        writer = new FileWriter(filename);
    }
);

When(/^I write$/, (input: string) => {
    writer.write(input);
});

When(/^I write line$/, (input: string) => {
    writer.writeLine(input);
});

Then(/^my file content should be$/, (expectedContent: string) => {
    let fileContent: string;
    try {
        fileContent = fs.readFileSync(filename).toString();
    } catch (e: any) {
        assert.fail(e.message);
    }
    expect(fileContent.toString()).to.eq(expectedContent);
});
