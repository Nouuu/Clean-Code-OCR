import { LineState } from '../ocr/LineState';

export interface CLI {
    run(
        args: string,
        splitClassifier: Map<LineState, string>,
        unifiedClassifier: Map<LineState, string>
    ): void;
}
