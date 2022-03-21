/* eslint-disable consistent-return */
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printers'.
const printers = require('../binary-operator-printers');

const BinaryOperation = {
  print: ({
    node,
    path,
    print,
    options
  }: any) => {
    const printerKeys = Object.keys(printers);
    for (let i = 0, len = printerKeys.length; i < len; i += 1) {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (printers[printerKeys[i]].match(node.operator))
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        return printers[printerKeys[i]].print(node, path, print, options);
    }
  }
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = BinaryOperation;
