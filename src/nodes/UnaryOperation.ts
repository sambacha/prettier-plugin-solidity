const UnaryOperation = {
  print: ({node, path, print}: any) =>
    node.isPrefix
      ? [
          node.operator,
          node.operator === 'delete' ? ' ' : '',
          path.call(print, 'subExpression'),
        ]
      : [path.call(print, 'subExpression'), node.operator],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = UnaryOperation;
