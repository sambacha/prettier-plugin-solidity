// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printArgum... Remove this comment to see the full error message
const printArguments = (node: any, path: any, print: any) =>
  node.arguments && node.arguments.length
    ? ['(', printSeparatedList(path.map(print, 'arguments')), ')']
    : '';

const InheritanceSpecifier = {
  print: ({node, path, print}: any) => [
    path.call(print, 'baseName'),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 3.
    printArguments(node, path, print),
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = InheritanceSpecifier;
