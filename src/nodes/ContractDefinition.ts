const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, line, hardline},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedItem = require('./print-separated-item');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printPrese... Remove this comment to see the full error message
const printPreservingEmptyLines = require('./print-preserving-empty-lines');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printComme... Remove this comment to see the full error message
const printComments = require('./print-comments');

const inheritance = (node: any, path: any, print: any) =>
  node.baseContracts.length > 0
    ? [
        ' is',
        printSeparatedList(path.map(print, 'baseContracts'), {
          firstSeparator: line,
        }),
      ]
    : line;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'body'.
const body = (node: any, path: any, options: any, print: any) =>
  node.subNodes.length > 0 || node.comments
    ? printSeparatedItem(
        [
          printPreservingEmptyLines(path, 'subNodes', options, print),
          printComments(node, path, options),
        ],
        {firstSeparator: hardline}
      )
    : '';

const ContractDefinition = {
  print: ({node, options, path, print}: any) => [
    group([
      node.kind === 'abstract' ? 'abstract contract' : node.kind,
      ' ',
      node.name,
      inheritance(node, path, print),
      '{',
    ]),
    body(node, path, options, print),
    '}',
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = ContractDefinition;
