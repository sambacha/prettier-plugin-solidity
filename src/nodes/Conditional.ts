const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, indent, line},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

const Conditional = {
  print: ({path, print}: any) =>
    group([
      path.call(print, 'condition'),
      indent([
        line,
        '? ',
        path.call(print, 'trueExpression'),
        line,
        ': ',
        path.call(print, 'falseExpression'),
      ]),
    ]),
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Conditional;
