import { LineState } from '../../src/ocr/LineState';
import { Classifier } from '../../src/ocr/Classifier';
import { FileClassifier } from '../../src/ocr/FileClassifier';
import { DataTable, Given, Then, When } from '@cucumber/cucumber';
import { expect } from 'chai';
import { ClassifierError } from '../../src/ocr/ClassifierError';

let lineStateAssociation: Map<LineState, string>;
let classifier: Classifier;

let given_destination: string;
let thrownError = false;
let thrownErrorMessage: string;
Given(
    /The following state to destination association$/,
    (stateDestinationAssociation: DataTable) => {
        lineStateAssociation = new Map(
            stateDestinationAssociation
                .raw()
                .map(([lineState, destination]) => [
                    LineState[lineState as 'ERROR' | 'VALID' | 'UNREADABLE'],
                    destination,
                ])
        );
        classifier = new FileClassifier(lineStateAssociation);
    }
);

When(
    /State of the line is (\w+)$/,
    (state: 'ERROR' | 'VALID' | 'UNREADABLE') => {
        try {
            const lineState: LineState = LineState[state];
            given_destination = classifier.getDestination(lineState);
        } catch (e: any) {
            if (!(e instanceof ClassifierError)) {
                throw new Error(e.message);
            }
            thrownError = true;
            thrownErrorMessage = e.message;
        }
    }
);

Then(/The destination should be (\w+)/, (destination: string) => {
    expect(given_destination).to.equal(destination);
});

Then(
    /The classifier should throw a ClassifierError with message$/,
    (errorMessage: string) => {
        expect(thrownError).to.be.true;
        expect(thrownErrorMessage).to.eq(errorMessage);
    }
);
