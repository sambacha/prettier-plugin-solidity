const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'line'.
    builders: { line, softline }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const NameValueList = {
  print: ({
    node,
    path,
    print,
    options
  }: any) =>
    printSeparatedList(
      path
        .map(print, 'arguments')
        .map((argument: any, index: any) => [node.names[index], ': ', argument]),
      {
        firstSeparator: options.bracketSpacing ? line : softline
      }
    )
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = NameValueList;
