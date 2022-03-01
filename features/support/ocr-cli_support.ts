import { Given, Then, When } from '@cucumber/cucumber';
import { OcrCLI } from '../../src/cli/ocr-cli';
import { expect, spy, use } from 'chai';
import { LineState } from '../../src/ocr/LineState';
import spies from 'chai-spies';

use(spies);

let given_args: string;

let ocrCli: OcrCLI;

Given(/the following command line/, (args: string) => {
    ocrCli = new OcrCLI();
    given_args = args;
    spy.restore(OcrCLI, 'displayHelp');
    spy.restore(OcrCLI, 'runOcr');
    spy.restore(ocrCli['reader'], 'read');
    spy.restore(splitClassifierStateAssociation, 'get');

    // Spies
    spy.on(OcrCLI, 'displayHelp');
    ocrCli['runOcr'] = spy.on(ocrCli, 'runOcr');
    ocrCli['reader']['read'] = spy.on(ocrCli['reader'], 'read');
    splitClassifierStateAssociation.get = spy.on(
        splitClassifierStateAssociation,
        'get'
    );
});

When(/I run the ocr cli/, () => {
    ocrCli.run(
        given_args,
        splitClassifierStateAssociation,
        unifiedClassifierStateAssociation
    );
});

Then(/it should display helper/, () => {
    expect(OcrCLI['displayHelp']).to.have.been.called();
    expect(ocrCli['runOcr']).to.have.not.been.called();
});

Then(/it should have read from/, (filename: string) => {
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

const splitClassifierStateAssociation: Map<LineState, string> = new Map([
    [LineState.VALID, 'features/out/authorized.txt'],
    [LineState.ERROR, 'features/out/errored.txt'],
    [LineState.UNREADABLE, 'features/out/unknown.txt'],
]);
const unifiedClassifierStateAssociation: Map<LineState, string> = new Map([
    [LineState.VALID, 'features/out/output.txt'],
    [LineState.ERROR, 'features/out/output.txt'],
    [LineState.UNREADABLE, 'features/out/output.txt'],
]);
