import { CLI } from './cli/CLI';
import { OcrCLI } from './cli/ocr-cli';
import {
    splitClassifierStateAssociation,
    unifiedClassifierStateAssociation,
} from './utils/resources';

const cli: CLI = new OcrCLI();
cli.run(
    process.argv.join(' '),
    splitClassifierStateAssociation,
    unifiedClassifierStateAssociation
);
