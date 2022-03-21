const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, indent, line},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'initialVal... Remove this comment to see the full error message
const initialValue = (node: any, path: any, print: any) => {
  if (!node.initialValue) {
    return '';
  }

  if (node.initialValue.type === 'TupleExpression') {
    return [' = ', path.call(print, 'initialValue')];
  }

  return group([' =', indent([line, path.call(print, 'initialValue')])]);
};

const StateVariableDeclaration = {
  print: ({node, path, print}: any) => [
    ...path.map(print, 'variables'),
    initialValue(node, path, print),
    ';',
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = StateVariableDeclaration;
