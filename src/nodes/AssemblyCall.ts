// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const AssemblyCall = {
  print: ({node, path, print, options}: any) =>
    node.arguments.length === 0 &&
    options.originalText.charAt(options.locEnd(node)) !== ')'
      ? node.functionName
      : [
          node.functionName,
          '(',
          printSeparatedList(path.map(print, 'arguments')),
          ')',
        ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = AssemblyCall;
