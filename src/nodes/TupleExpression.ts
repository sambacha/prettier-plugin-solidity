const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const contents = (node: any, path: any, print: any) =>
  node.components &&
  node.components.length === 1 &&
  node.components[0].type === 'BinaryOperation'
    ? path.map(print, 'components')
    : [printSeparatedList(path.map(print, 'components'))];

const TupleExpression = {
  print: ({node, path, print}: any) =>
    group([
      node.isArray ? '[' : '(',
      ...contents(node, path, print),
      node.isArray ? ']' : ')',
    ]),
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = TupleExpression;
