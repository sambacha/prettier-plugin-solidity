const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, line},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedItem = require('./print-separated-item');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const AssemblyFunctionDefinition = {
  print: ({node, path, print}: any) => [
    'function ',
    node.name,
    '(',
    printSeparatedList(path.map(print, 'arguments')),
    ')',
    node.returnArguments.length === 0
      ? ' '
      : group(
          printSeparatedItem(
            [
              '->',
              printSeparatedList(path.map(print, 'returnArguments'), {
                firstSeparator: line,
                lastSeparator: '',
              }),
            ],
            {firstSeparator: line}
          )
        ),
    path.call(print, 'body'),
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = AssemblyFunctionDefinition;
