// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'arithmetic... Remove this comment to see the full error message
const arithmetic = require('./arithmetic');

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  match: (op: any) => ['<<', '>>'].includes(op),
  print: arithmetic.print
};
