import { ArgsDefaultValues, DefaultValues, TokenArg } from '../cli/utils';
import { LineState } from '../ocr/LineState';
import { Classifier } from '../ocr/Classifier';
import { FileClassifier } from '../ocr/FileClassifier';
import { Reader } from '../io/Reader';
import { FileReader } from '../io/FileReader';
import { Writer } from '../io/Writer';
import { FileWriter } from '../io/FileWriter';
import { CharParser } from '../parser/CharParser';
import { DigitParser } from '../parser/DigitParser';
import {Checksum} from "../ocr/Checksum";
import {NumberChecksum} from "../ocr/NumberChecksum";

// CLI

export const basicTokens: TokenArg = {
    booleanToken: undefined,
    numberToken: '#',
    stringToken: '*',
};
export const basicDefaultValues: DefaultValues = {
    defaultBoolean: false,
    defaultNumber: 0,
    defaultString: '',
};

export const OCRArgsDefaultValues: ArgsDefaultValues = {
    stringArgDefaultValues: new Map([['i', 'input.txt']]),
    numberArgDefaultValues: new Map([
        ['m', 100],
        ['l', 9],
    ]),
};
export const OCRSchema = 's,m#,l#,i*,v*,e*,u*';
// s: boolean => splitClassifier
// m: number => maxLines
// l: number => line size
// i: string => input file
// v: string => valid output filename
// e: string => error output filename
// u: string => unreadable output filename

// OCR

export const defaultDigitMap: Map<string, string> = new Map([
    [' _\n| |\n|_|', '0'],
    ['\n  |\n  |', '1'],
    [' _\n _|\n|_', '2'],
    [' _\n _|\n _|', '3'],
    ['\n|_|\n  |', '4'],
    [' _\n|_\n _|', '5'],
    [' _\n|_\n|_|', '6'],
    [' _\n  |\n  |', '7'],
    [' _\n|_|\n|_|', '8'],
    [' _\n|_|\n _|', '9'],
]);

const splitClassifierStateAssociation: Map<LineState, string> = new Map([
    [LineState.VALID, 'authorized.txt'],
    [LineState.ERROR, 'errored.txt'],
    [LineState.UNREADABLE, 'unknown.txt'],
]);
const unifiedClassifierStateAssociation: Map<LineState, string> = new Map([
    [LineState.VALID, 'output.txt'],
    [LineState.ERROR, 'output.txt'],
    [LineState.UNREADABLE, 'output.txt'],
]);

export const splitClassifier: Classifier = new FileClassifier(
    splitClassifierStateAssociation
);

export const unifiedClassifier: Classifier = new FileClassifier(
    unifiedClassifierStateAssociation
);

export const unreadableSequence = '?';


