import { LineState } from './LineState';
import { Classifier } from './Classifier';
import { ClassifierError } from './ClassifierError';

export class FileClassifier implements Classifier {
    private readonly lineStateAssociation: Map<LineState, string>;

    constructor(lineStateAssociation: Map<LineState, string>) {
        this.lineStateAssociation = lineStateAssociation;
    }

    getDestination(lineState: LineState): string {
        const response = this.lineStateAssociation.get(lineState);
        if (!response) {
            throw new ClassifierError(`No destination for line state`);
        }
        return response;
    }
}
