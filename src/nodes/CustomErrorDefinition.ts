// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parameters... Remove this comment to see the full error message
const parameters = (node: any, path: any, print: any) =>
  node.parameters && node.parameters.length > 0
    ? printSeparatedList(path.map(print, 'parameters'))
    : '';

const CustomErrorDefinition = {
  print: ({
    node,
    path,
    print
  }: any) => [
    'error ',
    node.name,
    '(',
    parameters(node, path, print),
    ');'
  ]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = CustomErrorDefinition;
