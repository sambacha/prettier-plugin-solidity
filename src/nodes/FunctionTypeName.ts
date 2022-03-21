const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: { group, indent, line }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const returnTypes = (node: any, path: any, print: any) =>
  node.returnTypes.length > 0
    ? [
        line,
        'returns (',
        printSeparatedList(path.map(print, 'returnTypes')),
        ')'
      ]
    : '';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'visibility... Remove this comment to see the full error message
const visibility = (node: any) => node.visibility && node.visibility !== 'default'
  ? [line, node.visibility]
  : '';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'stateMutab... Remove this comment to see the full error message
const stateMutability = (node: any) => node.stateMutability && node.stateMutability !== 'default'
  ? [line, node.stateMutability]
  : '';

const FunctionTypeName = {
  print: ({
    node,
    path,
    print
  }: any) => [
    'function(',
    printSeparatedList(path.map(print, 'parameterTypes')),
    ')',
    indent(
      group([
        visibility(node),
        stateMutability(node),
        returnTypes(node, path, print)
      ])
    )
  ]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = FunctionTypeName;
