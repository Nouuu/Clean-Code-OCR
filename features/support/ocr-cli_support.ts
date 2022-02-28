import { Given, Then, When } from '@cucumber/cucumber';
import { OcrCLI } from '../../src/cli/ocr-cli';
import { expect } from 'chai';
import {
    splitClassifierStateAssociation,
    unifiedClassifierStateAssociation,
} from '../../src/utils/resources';
import { LineState } from '../../src/ocr/LineState';

const chai = require('chai');
const spies = require('chai-spies');
chai.use(spies);

let given_args: string;

let ocrCli: OcrCLI;

Given(/the following command line/, (args: string) => {
    ocrCli = new OcrCLI();
    given_args = args;
    chai.spy.restore(OcrCLI, 'displayHelp');
    chai.spy.restore(OcrCLI, 'runOcr');
    chai.spy.restore(ocrCli['reader'], 'read');
    chai.spy.restore(splitClassifierStateAssociation, 'get');

    // Spies
    chai.spy.on(OcrCLI, 'displayHelp');
    ocrCli['runOcr'] = chai.spy.on(ocrCli, 'runOcr');
    ocrCli['reader']['read'] = chai.spy.on(ocrCli['reader'], 'read');
    splitClassifierStateAssociation.get = chai.spy.on(
        splitClassifierStateAssociation,
        'get'
    );
});

When(/I run the ocr cli/, () => {
    ocrCli.run(given_args);
});

Then(/it should display helper/, () => {
    expect(OcrCLI['displayHelp']).to.have.been.called();
    expect(ocrCli['runOcr']).to.have.not.been.called();
});

Then(/to have read from/, (filename: string) => {
    expect(ocrCli['reader']['read']).to.have.been.called.with(filename);
});

Then(
    /unifiedClassifierStateAssociation (.+) should be (.+)/,
    (state: 'VALID' | 'ERROR' | 'UNREADABLE', destination: string) => {
        expect(
            unifiedClassifierStateAssociation.get(LineState[state])
        ).to.equal(destination);
    }
);

Then(/splitClassifierStateAssociation should have been used/, () => {
    expect(splitClassifierStateAssociation.get).to.have.been.called();
});
