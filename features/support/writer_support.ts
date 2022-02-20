import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { FileReader } from '../../src/FileReader';
import { expect } from 'chai';
import { FileError } from '../../src/FileError';
import { Parser } from '../../src/Parser';
import { FileWriter } from '../../src/FileWriter';
import { Writer } from '../../src/Writer';

let writer: Writer;
let filename: string = '';
let thrownError: boolean = false;
let thrownErrorMessage: string = '';

Given(
    /^I want to write some input in the file (.*)$/,
    (givenFilename: string) => {
        thrownError = false;
        thrownErrorMessage = '';
        filename = `features/test_files/${givenFilename}`;
    }
);

When(/^I write$/, (input: string) => {});
Then(/^my file appended content should be$/, () => {});
