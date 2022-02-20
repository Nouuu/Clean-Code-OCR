import { Reader } from './io/Reader';
import { FileReader } from './io/FileReader';
import { Writer } from './io/Writer';
import { FileWriter } from './io/FileWriter';
import { CharParser } from './parser/CharParser';
import { defaultDigitMap, DigitParser } from './parser/DigitParser';
import { Parser } from './parser/Parser';
import { DefaultParser } from './parser/DefaultParser';
import { Checksum } from './ocr/Checksum';
import { NumberChecksum } from './ocr/NumberChecksum';
import { LineState } from './ocr/LineState';
import { Classifier } from './ocr/Classifier';
import { FileClassifier } from './ocr/FileClassifier';
import { OCR } from './ocr/OCR';
import { DefaultOCR } from './ocr/DefaultOCR';

const reader: Reader = new FileReader();
const writer: Writer = new FileWriter();

const unreadableSequence = '?';

const charParser: CharParser = new DigitParser(
    unreadableSequence,
    defaultDigitMap
);
const parser: Parser = new DefaultParser(3, 4, charParser);
const checkSum: Checksum = new NumberChecksum();

const lineStateAssociation: Map<LineState, string> = new Map([
    [LineState.VALID, 'valid_lines.txt'],
    [LineState.ERROR, 'error_lines.txt'],
    [LineState.UNREADABLE, 'unreadable_lines.txt'],
]);
const classifier: Classifier = new FileClassifier(lineStateAssociation);

const ocr: OCR = new DefaultOCR(
    reader,
    writer,
    parser,
    checkSum,
    classifier,
    unreadableSequence
);

ocr.run('input.txt');
