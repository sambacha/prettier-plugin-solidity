const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: { group, indent, line }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const indexed = (node: any) => node.isIndexed ? ' indexed' : '';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'visibility... Remove this comment to see the full error message
const visibility = (node: any) => node.visibility && node.visibility !== 'default'
  ? [line, node.visibility]
  : '';

const constantKeyword = (node: any) => node.isDeclaredConst ? ' constant' : '';

const storageLocation = (node: any) => node.storageLocation && node.visibility !== 'default'
  ? [line, node.storageLocation]
  : '';

const immutable = (node: any) => node.isImmutable ? ' immutable' : '';

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

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'name'.
const name = (node: any) => node.name ? [' ', node.name] : '';

const VariableDeclaration = {
  print: ({
    node,
    path,
    print
  }: any) =>
    node.typeName
      ? group([
          path.call(print, 'typeName'),
          indent([
            indexed(node),
            visibility(node),
            constantKeyword(node),
            storageLocation(node),
            immutable(node),
            override(node, path, print),
            // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
            name(node)
          ])
        ])
      : node.name
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = VariableDeclaration;
