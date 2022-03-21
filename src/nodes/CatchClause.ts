// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parameters... Remove this comment to see the full error message
const parameters = (node: any, path: any, print: any) =>
  node.parameters
    ? [
        node.kind || '',
        '(',
        printSeparatedList(path.map(print, 'parameters')),
        ') ',
      ]
    : '';

const CatchClause = {
  print: ({node, path, print}: any) => [
    'catch ',
    parameters(node, path, print),
    path.call(print, 'body'),
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = CatchClause;
