const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, indent, line},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedItem = require('./print-separated-item');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printBody'... Remove this comment to see the full error message
const printBody = (node: any, path: any, print: any) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body'), ' ']
    : group([indent([line, path.call(print, 'body')]), line]);

const DoWhileStatement = {
  print: ({node, path, print}: any) => [
    'do',
    printBody(node, path, print),
    group(['while (', printSeparatedItem(path.call(print, 'condition')), ');']),
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = DoWhileStatement;
