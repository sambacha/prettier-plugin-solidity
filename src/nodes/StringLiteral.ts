const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'join'.
    builders: { join, hardline }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printStrin... Remove this comment to see the full error message
const { printString } = require('../prettier-comments/common/util');

const StringLiteral = {
  print: ({
    node,
    options
  }: any) => {
    const list = node.parts.map(
      (part: any, index: any) =>
        // node.isUnicode is an array of the same length as node.parts
        // that indicates if that string fragment has the unicode prefix
        (node.isUnicode[index] ? 'unicode' : '') + printString(part, options)
    );

    return join(hardline, list);
  }
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = StringLiteral;
