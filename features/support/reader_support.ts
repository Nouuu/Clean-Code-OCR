import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { FileReader } from '../../src/io/FileReader';
import { expect } from 'chai';
import { FileError } from '../../src/io/FileError';
import { DefaultParser } from '../../src/parser/DefaultParser';

const fileReader = new FileReader();
const parser = new DefaultParser();
let filename = '';
let fileContent = '';
let thrownError = false;
let thrownErrorMessage = '';
let parsedContent: string[] = [];

Given(/^the file (.*)$/, (givenFilename: string) => {
    thrownError = false;
    thrownErrorMessage = '';
    filename = `features/test_files/${givenFilename}`;
});

When(/^I read this file$/, () => {
    try {
        fileReader.read(filename);
        fileContent = fileReader.getContent();
    } catch (e: any) {
        if (!(e instanceof FileError)) {
            throw new Error(e.message);
        }
        thrownError = true;
        thrownErrorMessage = e.message;
    }
});

When(/^I parse its content$/, () => {
    parsedContent = parser.parseText(fileReader.getContent());
});

Then(/^The file content should be$/, (expectedString: string) => {
    expect(fileContent).to.equal(expectedString);
});

Then(
    /^I should have a FileError thrown with message$/,
    (errorMessage: string) => {
        expect(thrownError).to.be.true;
        expect(thrownErrorMessage).to.eq(errorMessage);
    }
);

Then(/^The parsed content should be$/, (lines: DataTable) => {
    expect(parsedContent).to.eql(lines.raw()[0]);
});
