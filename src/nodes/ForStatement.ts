const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, indent, line},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const initExpression = (node: any, path: any, print: any) =>
  node.initExpression ? path.call(print, 'initExpression') : '';

const conditionExpression = (node: any, path: any, print: any) =>
  node.conditionExpression ? path.call(print, 'conditionExpression') : '';

const loopExpression = (node: any, path: any, print: any) =>
  node.loopExpression.expression ? path.call(print, 'loopExpression') : '';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printBody'... Remove this comment to see the full error message
const printBody = (node: any, path: any, print: any) =>
  node.body.type === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

const ForStatement = {
  print: ({node, path, print}: any) => [
    'for (',
    printSeparatedList(
      [
        initExpression(node, path, print),
        conditionExpression(node, path, print),
        loopExpression(node, path, print),
      ],
      {
        separator:
          node.initExpression ||
          node.conditionExpression ||
          node.loopExpression.expression
            ? [';', line]
            : ';',
      }
    ),
    ')',
    printBody(node, path, print),
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = ForStatement;
