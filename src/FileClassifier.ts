import { LineState } from './LineState';
import { Classifier } from './Classifier';
import { ClassifierError } from './ClassifierError';

class FileClassifier implements Classifier {
    readonly lineStateAssociation: Map<LineState, string>;

    constructor(lineStateAssociation: Map<LineState, string>) {
        this.lineStateAssociation = lineStateAssociation;
    }

    getDestination(lineState: LineState): string {
        if (!this.lineStateAssociation.has(lineState)) {
            throw new ClassifierError(
                `No destination for line state '${lineState}'`
            );
        }
        // @ts-ignore
        return this.lineStateAssociation.get(lineState);
    }
}
