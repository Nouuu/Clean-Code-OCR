import { Given, Then, When } from '@cucumber/cucumber';
import { assert, expect } from 'chai';
import { FileError } from '../../src/io/FileError';
import { FileWriter } from '../../src/io/FileWriter';
import * as fs from 'fs';
import { Writer } from '../../src/io/Writer';

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

        writer = new FileWriter();
    }
);

When(/^I write$/, (input: string) => {
    try {
        writer.write(input, filename);
    } catch (e: any) {
        if (!(e instanceof FileError)) {
            throw new Error(e.message);
        }
        thrownError = true;
        thrownErrorMessage = e.message;
    }
});

When(/^I write line$/, (input: string) => {
    try {
        writer.writeLine(input, filename);
    } catch (e: any) {
        if (!(e instanceof FileError)) {
            throw new Error(e.message);
        }
        thrownError = true;
        thrownErrorMessage = e.message;
    }
});

Then(/^my file content should be$/, (expectedContent: string) => {
    let fileContent: string;
    try {
        fileContent = fs.readFileSync(filename).toString();
    } catch (e: any) {
        assert.fail(e.message);
    }
    expect(fileContent).to.eq(expectedContent);
});

Then(
    /^I should have a write FileError thrown with message$/,
    (errorMessage: string) => {
        expect(thrownError).to.be.true;
        expect(thrownErrorMessage).to.eq(errorMessage);
    }
);
