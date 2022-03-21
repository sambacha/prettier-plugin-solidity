const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'join'.
    builders: {join},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

const AssemblyAssignment = {
  print: ({path, print}: any) =>
    join(' ', [
      join(', ', path.map(print, 'names')),
      ':=',
      path.call(print, 'expression'),
    ]),
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = AssemblyAssignment;
