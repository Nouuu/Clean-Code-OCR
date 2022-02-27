import { Parser } from './parser/Parser';
import { DefaultParser } from './parser/DefaultParser';
import { OCR } from './ocr/OCR';
import { DefaultOCR } from './ocr/DefaultOCR';
import { Args } from './cli/Args';

import { CharParser } from './parser/CharParser';
import { DigitParser } from './parser/DigitParser';
import {
    defaultDigitMap,
    OCRArgsDefaultValues,
    OCRSchema,
    splitClassifier,
    unreadableSequence,
} from './utils/resources';
import { Reader } from './io/Reader';
import { FileReader } from './io/FileReader';
import { Writer } from './io/Writer';
import { FileWriter } from './io/FileWriter';
import { Checksum } from './ocr/Checksum';
import { NumberChecksum } from './ocr/NumberChecksum';

const reader: Reader = new FileReader();
const writer: Writer = new FileWriter();
const checkSum: Checksum = new NumberChecksum();
const charParser: CharParser = new DigitParser(
    unreadableSequence,
    defaultDigitMap
);
const parser: Parser = new DefaultParser(3, 4, charParser);

const ocr: OCR = new DefaultOCR(
    reader,
    writer,
    parser,
    checkSum,
    splitClassifier,
    unreadableSequence
);

const executeApplication = (d: boolean, p: number, h: string) => {
    console.log(
        `Application running - detached (${d}), port: (${p}), hero is (${h})`
    );
};

try {
    const args = new Args(OCRSchema, OCRArgsDefaultValues);
    args.parse(`-d -p 42 -h 'Vincent Vega'`);

    const detach = args.getBoolean('d');
    const port = args.getNumber('p');
    const hero = args.getString('h');
    executeApplication(detach, port, hero);
} catch (e: any) {
    console.error(`Parse error: ${e.message}`);
}
