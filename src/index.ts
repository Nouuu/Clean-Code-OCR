import { CLI } from './cli/CLI';
import { OcrCLI } from './cli/ocr-cli';

const cli: CLI = new OcrCLI();
cli.run(process.argv.join(' '));
