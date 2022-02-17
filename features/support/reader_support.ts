import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { FileReader } from '../../src/FileReader';
import { expect } from 'chai';
import { FileError } from '../../src/FileError';

const fileReader = new FileReader();
let filename: string = '';
let fileContent: string = '';
let thrownError: boolean = false;
let thrownErrorMessage: string = '';
let parsedContent: string[] = [];

Given(/the file (.*)$/, (givenFilename: string) => {
    thrownError = false;
    thrownErrorMessage = '';
    filename = `features/test_files/${givenFilename}`;
});

When(/I read this file$/, () => {
    try {
        fileContent = fileReader.read(filename);
    } catch (e: any) {
        if (!(e instanceof FileError)) {
            throw new Error(e.message);
        }
        thrownError = true;
        thrownErrorMessage = e.message;
    }
});

When(/I parse its content$/, () => {
    parsedContent = fileReader.parseSource();
});

Then(/The file content should be$/, (expectedString: string) => {
    expect(fileContent).to.equal(expectedString);
});

Then(
    /I should have a FileError throwed with message (.*)$/,
    (errorMessage: string) => {
        expect(thrownError).to.be.true;
        expect(thrownErrorMessage).to.eq(errorMessage);
    }
);

Then(/The parsed content should be$/, (lines: DataTable) => {
    expect(parsedContent).to.eql(lines.raw()[0]);
});
