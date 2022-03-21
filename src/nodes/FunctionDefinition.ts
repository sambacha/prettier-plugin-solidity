const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'dedent'.
    builders: { dedent, group, hardline, indent, join, line }
  },
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getNextNon... Remove this comment to see the full error message
  util: { getNextNonSpaceNonCommentCharacterIndex }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedItem = require('./print-separated-item');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printComme... Remove this comment to see the full error message
const printComments = require('./print-comments');

const functionName = (node: any, options: any) => {
  if (node.isConstructor && !node.name) return 'constructor';
  if (node.name) return `function ${node.name}`;
  if (node.isReceiveEther) return 'receive';
  // The parser doesn't give us any information about the keyword used for the
  // fallback.
  // Using the originalText is the next best option.
  // A neat idea would be to rely on the pragma and enforce it but for the
  // moment this will do.
  const names = { fallback: 'fallback', function: 'function' };
  const name = options.originalText.slice(
    options.locStart(node),
    options.locStart(node) + 8
  );
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return names[name];
};

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'parameters... Remove this comment to see the full error message
const parameters = (parametersType: any, node: any, path: any, print: any, options: any) => {
  if (node[parametersType] && node[parametersType].length > 0) {
    return printSeparatedList(path.map(print, parametersType), {
      separator: [
        ',',
        // To keep consistency any list of parameters will split if it's longer than 2.
        // For more information see:
        // https://github.com/prettier-solidity/prettier-plugin-solidity/issues/256
        node[parametersType].length > 2 ? hardline : line
      ]
    });
  }
  if (node.comments && node.comments.length > 0) {
    // we add a check to see if the comment is inside the parentheses
    const parameterComments = printComments(
      node,
      path,
      options,
      (comment: any) => options.originalText.charAt(
        getNextNonSpaceNonCommentCharacterIndex(
          options.originalText,
          comment,
          options.locEnd
        )
      ) === ')'
    );
    return parameterComments.parts.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
  return '';
};

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'visibility... Remove this comment to see the full error message
const visibility = (node: any) => node.visibility && node.visibility !== 'default'
  ? [line, node.visibility]
  : '';

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

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'stateMutab... Remove this comment to see the full error message
const stateMutability = (node: any) => node.stateMutability && node.stateMutability !== 'default'
  ? [line, node.stateMutability]
  : '';

const modifiers = (node: any, path: any, print: any) =>
  node.modifiers.length > 0
    ? [line, join(line, path.map(print, 'modifiers'))]
    : '';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'returnPara... Remove this comment to see the full error message
const returnParameters = (node: any, path: any, print: any, options: any) =>
  node.returnParameters
    ? [
        line,
        'returns (',
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 5.
        parameters('returnParameters', node, path, print, options),
        ')'
      ]
    : '';

const signatureEnd = (node: any) => node.body ? dedent(line) : ';';

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'body'.
const body = (node: any, path: any, print: any) => (node.body ? path.call(print, 'body') : '');

const FunctionDefinition = {
  print: ({
    node,
    path,
    print,
    options
  }: any) => [
    functionName(node, options),
    '(',
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 5.
    parameters('parameters', node, path, print, options),
    ')',
    indent(
      group([
        // TODO: sort comments for modifiers and return parameters
        printComments(node, path, options),
        visibility(node),
        stateMutability(node),
        virtual(node),
        override(node, path, print),
        modifiers(node, path, print),
        returnParameters(node, path, print, options),
        signatureEnd(node)
      ])
    ),
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
    body(node, path, print)
  ]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = FunctionDefinition;
