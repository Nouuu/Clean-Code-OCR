import {LineState} from "../../src/ocr/LineState";
import {Classifier} from "../../src/ocr/Classifier";
import {FileClassifier} from "../../src/ocr/FileClassifier";

const lineStateAssociation: Map<LineState, string> = new Map([
    [LineState.VALID, 'valid'],
    [LineState.ERROR, 'error'],
    [LineState.UNREADABLE, 'invalid'],
]);
const classifier: Classifier = new FileClassifier(lineStateAssociation);

