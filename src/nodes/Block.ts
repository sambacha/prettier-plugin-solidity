const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hardline'.
    builders: { hardline, indent }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printPrese... Remove this comment to see the full error message
const printPreservingEmptyLines = require('./print-preserving-empty-lines');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printComme... Remove this comment to see the full error message
const printComments = require('./print-comments');

const Block = {
  print: ({
    node,
    options,
    path,
    print
  }: any) =>
    // if block is empty, just return the pair of braces
    node.statements.length === 0 && !node.comments
      ? '{}'
      : [
          '{',
          indent([
            hardline,
            printPreservingEmptyLines(path, 'statements', options, print),
            printComments(node, path, options)
          ]),
          hardline,
          '}'
        ]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Block;
