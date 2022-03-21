const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, line, indent},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  match: (op: any) =>
    [
      '=',
      '|=',
      '^=',
      '&=',
      '<<=',
      '>>=',
      '+=',
      '-=',
      '*=',
      '/=',
      '%=',
    ].includes(op),
  print: (node: any, path: any, print: any) => [
    path.call(print, 'left'),
    ' ',
    node.operator,
    node.right.type === 'BinaryOperation'
      ? group(indent([line, path.call(print, 'right')]))
      : [' ', path.call(print, 'right')],
  ],
};
