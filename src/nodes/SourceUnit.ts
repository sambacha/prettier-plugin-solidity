const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'line'.
    builders: { line }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printPrese... Remove this comment to see the full error message
const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const SourceUnit = {
  print: ({
    options,
    path,
    print
  }: any) => [
    printPreservingEmptyLines(path, 'children', options, print),
    line
  ]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = SourceUnit;
