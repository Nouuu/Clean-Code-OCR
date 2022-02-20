import { Reader } from '../io/Reader';
import { Writer } from '../io/Writer';
import { Checksum } from './Checksum';
import { Classifier } from './Classifier';
import { Parser } from '../parser/Parser';
import { inputHasUnreadableSequence } from '../utils/line_utils';
import { LineState } from './LineState';
import { OCR } from './OCR';

export class DefaultOCR implements OCR {
    private readonly reader: Reader;
    private readonly writer: Writer;
    private readonly parser: Parser;
    private readonly checkSum: Checksum;
    private readonly classifier: Classifier;
    private readonly unreadableSequence: string;

    constructor(
        reader: Reader,
        writer: Writer,
        parser: Parser,
        checkSum: Checksum,
        classifier: Classifier,
        unreadableSequence: string
    ) {
        this.reader = reader;
        this.writer = writer;
        this.parser = parser;
        this.checkSum = checkSum;
        this.classifier = classifier;
        this.unreadableSequence = unreadableSequence;
    }

    run(source: string, maxLines = 100): void {
        this.reader.read(source);
        const sourceContent = this.reader.getContent();

        const parsedLines = this.parser.parseText(sourceContent, maxLines);

        for (let parsedLine of parsedLines) {
            const lineState: LineState = this.getLineState(parsedLine);
            this.writer.writeLine(
                `${parsedLine} ${lineState}`.trim(),
                this.classifier.getDestination(lineState)
            );
        }
    }

    private getLineState(line: string): LineState {
        if (inputHasUnreadableSequence(line, this.unreadableSequence)) {
            return LineState.UNKNOWN;
        }
        return this.checkSum.check(line) ? LineState.VALID : LineState.ERROR;
    }
}
