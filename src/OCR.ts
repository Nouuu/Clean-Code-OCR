import { Reader } from './Reader';
import { Writer } from './Writer';
import { Checksum } from './Checksum';
import { Classifier } from './Classifier';
import { Parser } from './Parser';

class OCR {
    readonly reader: Reader;
    readonly writer: Writer;
    readonly parser: Parser;
    readonly checkSum: Checksum;
    readonly classifier: Classifier;
    readonly unreadableSequence: string;

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
}
