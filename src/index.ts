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
    splitClassifierStateAssociation,
    unifiedClassifierStateAssociation,
    unreadableSequence,
} from './utils/resources';
import { Reader } from './io/Reader';
import { FileReader } from './io/FileReader';
import { Writer } from './io/Writer';
import { FileWriter } from './io/FileWriter';
import { Checksum } from './ocr/Checksum';
import { NumberChecksum } from './ocr/NumberChecksum';
import { FileClassifier } from './ocr/FileClassifier';
import { LineState } from './ocr/LineState';
import { ArgParser } from './cli/ArgParser';

const reader: Reader = new FileReader();
const writer: Writer = new FileWriter();
const checkSum: Checksum = new NumberChecksum();
const charParser: CharParser = new DigitParser(
    unreadableSequence,
    defaultDigitMap
);
const parser: Parser = new DefaultParser(3, 4, charParser);

try {
    const args: ArgParser = new Args(OCRSchema, OCRArgsDefaultValues);
    args.parse(process.argv.join(' '));

    const classifierAssociation = args.getBoolean('s')
        ? splitClassifierStateAssociation
        : unifiedClassifierStateAssociation;

    if (args.getString('v').length > 0) {
        classifierAssociation.set(LineState.VALID, args.getString('v'));
    }
    if (args.getString('e').length > 0) {
        classifierAssociation.set(LineState.ERROR, args.getString('e'));
    }
    if (args.getString('u').length > 0) {
        classifierAssociation.set(LineState.UNREADABLE, args.getString('u'));
    }

    const classifier = new FileClassifier(classifierAssociation);

    const ocr: OCR = new DefaultOCR(
        reader,
        writer,
        parser,
        checkSum,
        classifier,
        unreadableSequence
    );

    ocr.run(args.getString('i'), args.getNumber('m'), args.getNumber('l'));
} catch (e: any) {
    console.error(`Error: ${e.message}`);
}
