const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'join'.
    builders: { join, line }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printStrin... Remove this comment to see the full error message
const { printString } = require('../prettier-comments/common/util');

const HexLiteral = {
  print: ({
    node,
    options
  }: any) => {
    const list = node.parts.map((part: any) => `hex${printString(part, options)}`);
    return join(line, list);
  }
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = HexLiteral;
