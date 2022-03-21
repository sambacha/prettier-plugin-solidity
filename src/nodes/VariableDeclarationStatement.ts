const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: { group, ifBreak, indent }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const embraceVariables = (doc: any, embrace: any) =>
  embrace ? ['(', printSeparatedList(doc), ')'] : doc;

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'initialVal... Remove this comment to see the full error message
const initialValue = (node: any, path: any, print: any) =>
  node.initialValue ? [' = ', path.call(print, 'initialValue')] : '';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'groupIndex... Remove this comment to see the full error message
let groupIndex = 0;
const VariableDeclarationStatement = {
  print: ({
    node,
    path,
    print
  }: any) => {
    const startsWithVar =
      node.variables.filter((x: any) => x && x.typeName).length === 0;

    const declarationDoc = group(
      [
        startsWithVar ? 'var ' : '',
        embraceVariables(
          path.map(print, 'variables'),
          node.variables.length > 1 || startsWithVar
        )
      ],
      { id: `VariableDeclarationStatement.variables-${groupIndex}` }
    );
    groupIndex += 1;
    const initialValueDoc = initialValue(node, path, print);

    return group([
      declarationDoc,
      ifBreak(indent(initialValueDoc), initialValueDoc, {
        groupId: declarationDoc.id
      }),
      node.omitSemicolon ? '' : ';'
    ]);
  }
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = VariableDeclarationStatement;
