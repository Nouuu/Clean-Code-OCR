import { CLI } from './CLI';
import { Reader } from '../io/Reader';
import { FileReader } from '../io/FileReader';
import { Writer } from '../io/Writer';
import { FileWriter } from '../io/FileWriter';
import { Checksum } from '../ocr/Checksum';
import { NumberChecksum } from '../ocr/NumberChecksum';
import { DigitParser } from '../parser/DigitParser';
import {
    defaultDigitMap,
    OCRArgsDefaultValues,
    OCRSchema,
    splitClassifierStateAssociation,
    unifiedClassifierStateAssociation,
    unreadableSequence,
} from '../utils/resources';
import { Parser } from '../parser/Parser';
import { DefaultParser } from '../parser/DefaultParser';
import { ArgParser } from './ArgParser';
import { Args } from './Args';
import { LineState } from '../ocr/LineState';
import { FileClassifier } from '../ocr/FileClassifier';
import { OCR } from '../ocr/OCR';
import { DefaultOCR } from '../ocr/DefaultOCR';

export class OcrCLI implements CLI {
    private readonly reader: Reader;
    private readonly writer: Writer;
    private readonly checkSum: Checksum;
    private readonly parser: Parser;

    constructor(
        reader: Reader = new FileReader(),
        writer: Writer = new FileWriter(),
        checkSum: Checksum = new NumberChecksum(),
        parser: Parser = new DefaultParser(
            3,
            4,
            new DigitParser(unreadableSequence, defaultDigitMap)
        )
    ) {
        this.reader = reader;
        this.writer = writer;
        this.checkSum = checkSum;
        this.parser = parser;
    }

    run(args: string): void {
        try {
            const argsParser: ArgParser = new Args(
                OCRSchema,
                OCRArgsDefaultValues
            );
            argsParser.parse(args);

            if (argsParser.getBoolean('h')) {
                OcrCLI.displayHelp();
            } else {
                this.runOcr(argsParser);
            }
        } catch (e: any) {
            console.error(`Error: ${e.message}`);
        }
    }

    private static displayHelp(): void {
        console.log(
            '\th (optional): boolean => display help\n' +
                '\ts (optional, default=false): boolean => split classifier into multiple files\n' +
                '\tm (optional, default=100): number => set the max number of lines to process\n' +
                '\tl (optional, default=9): number => number of digits per lines\n' +
                "\ti (optional, default='input.txt'): string => input filename\n" +
                '\tv (optional): string => valid output filename\n' +
                '\te (optional): string => error output filename\n' +
                '\tu (optional): string => unreadable output filename\n'
        );
    }

    private runOcr(argsParser: ArgParser): void {
        const classifierAssociation =
            OcrCLI.getClassifierAssociation(argsParser);
        this.defineClassifiers(argsParser, classifierAssociation);

        const classifier = new FileClassifier(classifierAssociation);

        const ocr: OCR = new DefaultOCR(
            this.reader,
            this.writer,
            this.parser,
            this.checkSum,
            classifier,
            unreadableSequence
        );

        ocr.run(
            argsParser.getString('i'),
            argsParser.getNumber('m'),
            argsParser.getNumber('l')
        );
    }

    private static getClassifierAssociation(argsParser: ArgParser) {
        return new Map<LineState, string>(
            argsParser.getBoolean('s')
                ? splitClassifierStateAssociation
                : unifiedClassifierStateAssociation
        );
    }

    private defineClassifiers(
        argsParser: ArgParser,
        classifierAssociation: Map<LineState, string>
    ) {
        this.defineClassifier(
            argsParser,
            classifierAssociation,
            'v',
            LineState.VALID
        );
        this.defineClassifier(
            argsParser,
            classifierAssociation,
            'e',
            LineState.ERROR
        );
        this.defineClassifier(
            argsParser,
            classifierAssociation,
            'u',
            LineState.UNREADABLE
        );
    }

    defineClassifier(
        argsParser: ArgParser,
        classifierMap: Map<LineState, string>,
        key: string,
        state: LineState
    ): void {
        if (argsParser.getString(key).length > 0) {
            classifierMap.set(state, argsParser.getString(key));
        }
    }
}
