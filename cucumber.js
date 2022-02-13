let common = [
    'features/**/*.feature',
    '--require-module ts-node/register',
    '--require features/support/**/*.ts',
    '--format @cucumber/pretty-formatter',
    '--format-options {"theme":{"datatable border":["green"],"datatable content":["green","italic"],"docstring content":["green","italic"],"docstring delimiter":["green"],"feature description":["green"],"feature keyword":["bold","green"],"rule keyword":["yellow"],"scenario keyword":["greenBright"],"scenario name":["green","underline"],"step keyword":["bgGreen","black","italic"],"step text":["greenBright","italic"],"tag":["green"]}}',
    '--format html:cucumber_report.html',
    '--publish-quiet',
].join(' ');

module.exports = {
    default: common,
};
