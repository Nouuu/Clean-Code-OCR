import { Reader } from '../../src/io/Reader';
import { FileReader } from '../../src/io/FileReader';
import { FileWriter } from '../../src/io/FileWriter';
import { Writer } from '../../src/io/Writer';
import { Parser } from '../../src/parser/Parser';
import { DefaultParser } from '../../src/parser/DefaultParser';
import { CharParser } from '../../src/parser/CharParser';
import { defaultDigitMap, DigitParser } from '../../src/parser/DigitParser';
import { Checksum } from '../../src/ocr/Checksum';
import { NumberChecksum } from '../../src/ocr/NumberChecksum';
import { Classifier } from '../../src/ocr/Classifier';
import { FileClassifier } from '../../src/ocr/FileClassifier';
import { LineState } from '../../src/ocr/LineState';
import { OCR } from '../../src/ocr/OCR';
import { DefaultOCR } from '../../src/ocr/DefaultOCR';

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
    [LineState.VALID, ''],
    [LineState.ERROR, ''],
    [LineState.UNREADABLE, ''],
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
