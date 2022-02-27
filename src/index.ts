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
import { Args } from './cli/Args';

const reader: Reader = new FileReader();
const writer: Writer = new FileWriter();

const unreadableSequence = '?';

const charParser: CharParser = new DigitParser(
    unreadableSequence,
    defaultDigitMap
);
const parser: Parser = new DefaultParser(3, 4, charParser);
const checkSum: Checksum = new NumberChecksum();

const splitClassifierStateAssociation: Map<LineState, string> = new Map([
    [LineState.VALID, 'authorized.txt'],
    [LineState.ERROR, 'errored.txt'],
    [LineState.UNREADABLE, 'unknown.txt'],
]);
const classifier: Classifier = new FileClassifier(splitClassifierStateAssociation);

const ocr: OCR = new DefaultOCR(
    reader,
    writer,
    parser,
    checkSum,
    classifier,
    unreadableSequence
);

const schema = 'd,p#,h*';

const executeApplication = (d: boolean, p: number, h: string) => {
    console.log(
        `Application running - detached (${d}), port: (${p}), hero is (${h})`
    );
};

try {
    const args = new Args(schema);
    args.parse(`-d -p 42 -h 'Vincent Vega'`);

    const detach = args.getBoolean('d');
    const port = args.getNumber('p');
    const hero = args.getString('h');
    executeApplication(detach, port, hero);
} catch (e: any) {
    console.error(`Parse error: ${e.message}`);
}
