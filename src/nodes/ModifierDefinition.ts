const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: { group, hardline, indent, line }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const modifierParameters = (node: any, path: any, print: any) => {
  if (node.parameters && node.parameters.length > 0) {
    return [
      '(',
      printSeparatedList(path.map(print, 'parameters'), {
        separator: [
          ',',
          // To keep consistency any list of parameters will split if it's longer than 2.
          // For more information see:
          // https://github.com/prettier-solidity/prettier-plugin-solidity/issues/256
          node.parameters.length > 2 ? hardline : line
        ]
      }),
      ')'
    ];
  }

  return '()';
};

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'virtual'.
const virtual = (node: any) => node.isVirtual ? [line, 'virtual'] : '';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'override'.
const override = (node: any, path: any, print: any) => {
  if (!node.override) return '';
  if (node.override.length === 0) return [line, 'override'];
  return [
    line,
    'override(',
    printSeparatedList(path.map(print, 'override')),
    ')'
  ];
};

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'body'.
const body = (node: any, path: any, print: any) =>
  node.isVirtual ? group(path.call(print, 'body')) : path.call(print, 'body');

const ModifierDefinition = {
  print: ({
    node,
    path,
    print
  }: any) => [
    'modifier ',
    node.name,
    modifierParameters(node, path, print),
    group(indent([virtual(node), override(node, path, print)])),
    ' ',
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    body(node, path, print)
  ]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = ModifierDefinition;
