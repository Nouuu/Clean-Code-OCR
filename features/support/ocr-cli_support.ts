import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { OcrCLI } from '../../src/cli/ocr-cli';
import { expect } from 'chai';
import fs from 'fs';
import { FileWriter } from '../../src/io/FileWriter';
import { FileReader } from '../../src/io/FileReader';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

let given_args: string;
let writeDestinations: string[];
let readFiles: string[];
let source: string;

let ocrCli: OcrCLI;

Given(/the following command line/, (args: string) => {
    ocrCli = new OcrCLI();
    given_args = args;
    writeDestinations = [];
    readFiles = [];
    source = '';

    chai.spy.restore(OcrCLI, 'displayHelp');
    chai.spy.restore(OcrCLI, 'runOcr');
    chai.spy.restore(FileWriter, 'writer');
    chai.spy.restore(FileReader, 'reader');

    // Spies
    chai.spy.on(OcrCLI, 'displayHelp');
    ocrCli['runOcr'] = chai.spy.on(ocrCli, 'runOcr');

    // Mocks
    ocrCli['writer']['write'] = chai.spy.on(
        ocrCli['writer'],
        'write',
        (a: string, dest: string) => {
            if (writeDestinations.indexOf(dest) === -1) {
                writeDestinations.push(dest);
            }
        }
    );
    ocrCli['reader']['read'] = chai.spy.on(
        ocrCli['reader'],
        'read',
        (input: string) => {
            source = input;
            if (readFiles.indexOf(input) === -1) {
                readFiles.push(input);
            }
        }
    );
    ocrCli['reader']['getContent'] = chai.spy.on(
        ocrCli['reader'],
        'getContent',
        () => {
            return fs.readFileSync(source).toString();
        }
    );
});

When(/I run the ocr cli/, () => {
    ocrCli.run(given_args);
});

Then(/it should display helper/, () => {
    expect(OcrCLI['displayHelp']).to.have.been.called();
    expect(ocrCli['runOcr']).to.have.not.been.called();
});

Then(/to have read from/, (filenames: DataTable) => {
    expect(readFiles).to.have.members(filenames.raw()[0]);
});

Then(/to have written on/, (filenames: DataTable) => {
    expect(writeDestinations).to.have.members(filenames.raw()[0]);
});
