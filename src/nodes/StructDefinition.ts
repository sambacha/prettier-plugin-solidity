const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hardline'.
    builders: {hardline},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const StructDefinition = {
  print: ({node, path, print}: any) => [
    'struct ',
    node.name,
    ' {',
    printSeparatedList(path.map(print, 'members'), {
      firstSeparator: hardline,
      separator: [';', hardline],
      lastSeparator: [';', hardline],
    }),
    '}',
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = StructDefinition;
