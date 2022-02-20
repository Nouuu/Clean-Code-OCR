import { LineState } from './LineState';

export interface Classifier {
    getDestination(lineState: LineState): string;
}
