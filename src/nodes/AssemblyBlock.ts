const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hardline'.
    builders: {hardline},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedItem = require('./print-separated-item');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printComme... Remove this comment to see the full error message
const printComments = require('./print-comments');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printPrese... Remove this comment to see the full error message
const printPreservingEmptyLines = require('./print-preserving-empty-lines');

const AssemblyBlock = {
  print: ({node, options, path, print}: any) => [
    '{',
    printSeparatedItem(
      [
        printPreservingEmptyLines(path, 'operations', options, print),
        printComments(node, path, options),
      ],
      {firstSeparator: hardline}
    ),
    '}',
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = AssemblyBlock;
