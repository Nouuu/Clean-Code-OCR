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
import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import fs from "fs";
import { assert, expect } from "chai";

const reader: Reader = new FileReader();
const writer: Writer = new FileWriter();

const unreadableSequence = '?';

const charParser: CharParser = new DigitParser(
    unreadableSequence,
    defaultDigitMap
);
const parser: Parser = new DefaultParser(3, 4, charParser);
const checkSum: Checksum = new NumberChecksum();

let lineStateAssociation: Map<LineState, string>;

let classifier: Classifier;

let ocr: OCR;


Given(/The default OCR with classifier$/,
  (stateDestinationAssociation: DataTable) => {
      lineStateAssociation = new Map(
          stateDestinationAssociation.raw().map(([lineState, destination]) => {
            const filename = `features/test_files/out/${destination}`;
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
            }
            return [
                  LineState[lineState as 'ERROR' | 'VALID' | 'UNREADABLE'],
                filename,
              ];
          })
      );
      classifier = new FileClassifier(lineStateAssociation);
      ocr = new DefaultOCR(
        reader,
        writer,
        parser,
        checkSum,
        classifier,
        unreadableSequence
      );
  }
);

When(/I run the OCR on the file (.+)$/, (filename: string)=>{
    ocr.run(`features/test_files/${filename}`);
});

Then(/My (.+) file should contain$/, (destination: string, expectedContent: string) => {
    let fileContent: string;
    try {
        fileContent = fs.readFileSync(`features/test_files/out/${destination}`).toString();
    } catch (e: any) {
        assert.fail(e.message);
    }
    expect(fileContent).to.eq(expectedContent);
});
