const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: { group, ifBreak, indent, label, line, softline }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');

const printObject = (node: any, path: any, print: any, options: any) => [
  '{',
  printSeparatedList(
    path
      .map(print, 'arguments')
      .map((arg: any, index: any) => [node.names[index], ': ', arg]),
    {
      firstSeparator: options.bracketSpacing ? line : softline,
      lastSeparator: [options.bracketSpacing ? line : softline, '})']
    }
  )
];

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printArgum... Remove this comment to see the full error message
const printArguments = (path: any, print: any) =>
  printSeparatedList(path.map(print, 'arguments'), {
    lastSeparator: [softline, ')']
  });

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'groupIndex... Remove this comment to see the full error message
let groupIndex = 0;
const FunctionCall = {
  print: ({
    node,
    path,
    print,
    options
  }: any) => {
    let expressionDoc = path.call(print, 'expression');
    let argumentsDoc = ')';

    if (node.arguments && node.arguments.length > 0) {
      if (node.names && node.names.length > 0) {
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any[]' is not assignable to type 'string'.
        argumentsDoc = printObject(node, path, print, options);
      } else {
        argumentsDoc = printArguments(path, print);
      }
    }

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (expressionDoc.label === 'MemberAccessChain') {
      expressionDoc = group(expressionDoc.contents, {
        id: `FunctionCall.expression-${groupIndex}`
      });

      groupIndex += 1;

      argumentsDoc = ifBreak(indent(argumentsDoc), argumentsDoc, {
        groupId: expressionDoc.id
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [expressionDoc, '(', argumentsDoc]);
    }

    return [expressionDoc, '(', argumentsDoc];
  }
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = FunctionCall;
