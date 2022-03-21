'use strict';

const {
  util: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'addLeading... Remove this comment to see the full error message
    addLeadingComment,
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'addTrailin... Remove this comment to see the full error message
    addTrailingComment,
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'addDanglin... Remove this comment to see the full error message
    addDanglingComment,
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getNextNon... Remove this comment to see the full error message
    getNextNonSpaceNonCommentCharacterIndex,
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const privateUtil = require('../common/util');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handleOwnL... Remove this comment to see the full error message
function handleOwnLineComment(
  comment: any,
  text: any,
  options: any,
  ast: any,
  isLastComment: any
) {
  const {precedingNode, enclosingNode, followingNode} = comment;
  if (
    handleLastFunctionArgComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleMemberExpressionComments(enclosingNode, followingNode, comment) ||
    handleIfStatementComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleWhileComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleTryStatementComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleClassComments(enclosingNode, precedingNode, followingNode, comment) ||
    handleImportSpecifierComments(enclosingNode, comment) ||
    handleForComments(enclosingNode, precedingNode, comment) ||
    handleUnionTypeComments(
      precedingNode,
      enclosingNode,
      followingNode,
      comment
    ) ||
    handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
    handleImportDeclarationComments(
      text,
      enclosingNode,
      precedingNode,
      comment,
      options
    ) ||
    handleAssignmentPatternComments(enclosingNode, comment) ||
    handleMethodNameComments(
      text,
      enclosingNode,
      precedingNode,
      comment,
      options
    )
  ) {
    return true;
  }
  return false;
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handleEndO... Remove this comment to see the full error message
function handleEndOfLineComment(
  comment: any,
  text: any,
  options: any,
  ast: any,
  isLastComment: any
) {
  const {precedingNode, enclosingNode, followingNode} = comment;
  if (
    handleLastFunctionArgComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleConditionalExpressionComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment,
      text,
      options
    ) ||
    handleImportSpecifierComments(enclosingNode, comment) ||
    handleIfStatementComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleWhileComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleTryStatementComments(
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleClassComments(enclosingNode, precedingNode, followingNode, comment) ||
    handleLabeledStatementComments(enclosingNode, comment) ||
    handleCallExpressionComments(precedingNode, enclosingNode, comment) ||
    handlePropertyComments(enclosingNode, comment) ||
    handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
    handleTypeAliasComments(enclosingNode, followingNode, comment) ||
    handleVariableDeclaratorComments(enclosingNode, followingNode, comment)
  ) {
    return true;
  }
  return false;
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handleRema... Remove this comment to see the full error message
function handleRemainingComment(
  comment: any,
  text: any,
  options: any,
  ast: any,
  isLastComment: any
) {
  const {precedingNode, enclosingNode, followingNode} = comment;

  if (
    handleIfStatementComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleWhileComments(
      text,
      precedingNode,
      enclosingNode,
      followingNode,
      comment,
      options
    ) ||
    handleObjectPropertyAssignment(enclosingNode, precedingNode, comment) ||
    handleCommentInEmptyParens(text, enclosingNode, comment, options) ||
    handleMethodNameComments(
      text,
      enclosingNode,
      precedingNode,
      comment,
      options
    ) ||
    handleOnlyComments(enclosingNode, ast, comment, isLastComment) ||
    handleCommentAfterArrowParams(text, enclosingNode, comment, options) ||
    handleFunctionNameComments(
      text,
      enclosingNode,
      precedingNode,
      comment,
      options
    ) ||
    handleTSMappedTypeComments(
      text,
      enclosingNode,
      precedingNode,
      followingNode,
      comment
    ) ||
    handleBreakAndContinueStatementComments(enclosingNode, comment)
  ) {
    return true;
  }
  return false;
}

function addBlockStatementFirstComment(node: any, comment: any) {
  if (!node.body) {
    addDanglingComment(node, comment);
    return;
  }

  const body = node.body.filter((n: any) => n.type !== 'EmptyStatement');
  if (body.length === 0) {
    addDanglingComment(node, comment);
  } else {
    addLeadingComment(body[0], comment);
  }
}

function addBlockOrNotComment(node: any, comment: any) {
  if (node.type === 'BlockStatement') {
    addBlockStatementFirstComment(node, comment);
  } else {
    addLeadingComment(node, comment);
  }
}

// There are often comments before the else clause of if statements like
//
//   if (1) { ... }
//   // comment
//   else { ... }
//
// They are being attached as leading comments of the BlockExpression which
// is not well printed. What we want is to instead move the comment inside
// of the block and make it leadingComment of the first element of the block
// or dangling comment of the block if there is nothing inside
//
//   if (1) { ... }
//   else {
//     // comment
//     ...
//   }
function handleIfStatementComments(
  text: any,
  precedingNode: any,
  enclosingNode: any,
  followingNode: any,
  comment: any,
  options: any
) {
  if (
    !enclosingNode ||
    enclosingNode.type !== 'IfStatement' ||
    !followingNode
  ) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   if (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = privateUtil.getNextNonSpaceNonCommentCharacter(
    text,
    comment,
    options.locEnd
  );
  if (nextCharacter === ')') {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Comments before `else`:
  // - treat as trailing comments of the trueBody, if it's a ExpressionStatement
  // - treat as a dangling comment otherwise
  if (
    precedingNode === enclosingNode.trueBody &&
    followingNode === enclosingNode.falseBody
  ) {
    if (precedingNode.type === 'ExpressionStatement') {
      addTrailingComment(precedingNode, comment);
    } else {
      addDanglingComment(enclosingNode, comment);
    }
    return true;
  }

  if (followingNode.type === 'ExpressionStatement') {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  if (followingNode.type === 'IfStatement') {
    addBlockOrNotComment(followingNode.trueBody, comment);
    return true;
  }

  // For comments positioned after the condition parenthesis in an if statement
  // before the trueBody without brackets on, such as
  // if (a) /* comment */ true,
  // we look at the next character to see if the following node
  // is the trueBody for the if statement
  if (enclosingNode.trueBody === followingNode) {
    addLeadingComment(followingNode, comment);
    return true;
  }

  return false;
}

function handleWhileComments(
  text: any,
  precedingNode: any,
  enclosingNode: any,
  followingNode: any,
  comment: any,
  options: any
) {
  if (
    !enclosingNode ||
    enclosingNode.type !== 'WhileStatement' ||
    !followingNode
  ) {
    return false;
  }

  // We unfortunately have no way using the AST or location of nodes to know
  // if the comment is positioned before the condition parenthesis:
  //   while (a /* comment */) {}
  // The only workaround I found is to look at the next character to see if
  // it is a ).
  const nextCharacter = privateUtil.getNextNonSpaceNonCommentCharacter(
    text,
    comment,
    options.locEnd
  );
  if (nextCharacter === ')') {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (followingNode.type === 'BlockStatement') {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  return false;
}

// Same as IfStatement but for TryStatement
function handleTryStatementComments(
  enclosingNode: any,
  precedingNode: any,
  followingNode: any,
  comment: any
) {
  if (
    !enclosingNode ||
    (enclosingNode.type !== 'TryStatement' &&
      enclosingNode.type !== 'CatchClause') ||
    !followingNode
  ) {
    return false;
  }

  if (enclosingNode.type === 'CatchClause' && precedingNode) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  if (followingNode.type === 'BlockStatement') {
    addBlockStatementFirstComment(followingNode, comment);
    return true;
  }

  if (followingNode.type === 'TryStatement') {
    addBlockOrNotComment(followingNode.finalizer, comment);
    return true;
  }

  if (followingNode.type === 'CatchClause') {
    addBlockOrNotComment(followingNode.body, comment);
    return true;
  }

  return false;
}

function handleMemberExpressionComments(
  enclosingNode: any,
  followingNode: any,
  comment: any
) {
  if (
    enclosingNode &&
    enclosingNode.type === 'MemberExpression' &&
    followingNode &&
    followingNode.type === 'Identifier'
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleConditionalExpressionComments(
  enclosingNode: any,
  precedingNode: any,
  followingNode: any,
  comment: any,
  text: any,
  options: any
) {
  const isSameLineAsPrecedingNode =
    precedingNode &&
    !privateUtil.hasNewlineInRange(
      text,
      options.locEnd(precedingNode),
      options.locStart(comment)
    );

  if (
    (!precedingNode || !isSameLineAsPrecedingNode) &&
    enclosingNode &&
    enclosingNode.type === 'ConditionalExpression' &&
    followingNode
  ) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}

function handleObjectPropertyAssignment(
  enclosingNode: any,
  precedingNode: any,
  comment: any
) {
  if (
    enclosingNode &&
    (enclosingNode.type === 'ObjectProperty' ||
      enclosingNode.type === 'Property') &&
    enclosingNode.shorthand &&
    enclosingNode.key === precedingNode &&
    enclosingNode.value.type === 'AssignmentPattern'
  ) {
    addTrailingComment(enclosingNode.value.left, comment);
    return true;
  }
  return false;
}

function handleClassComments(
  enclosingNode: any,
  precedingNode: any,
  followingNode: any,
  comment: any
) {
  if (
    enclosingNode &&
    (enclosingNode.type === 'ClassDeclaration' ||
      enclosingNode.type === 'ClassExpression') &&
    enclosingNode.decorators &&
    enclosingNode.decorators.length > 0 &&
    !(followingNode && followingNode.type === 'Decorator')
  ) {
    if (!enclosingNode.decorators || enclosingNode.decorators.length === 0) {
      addLeadingComment(enclosingNode, comment);
    } else {
      addTrailingComment(
        enclosingNode.decorators[enclosingNode.decorators.length - 1],
        comment
      );
    }
    return true;
  }
  return false;
}

function handleMethodNameComments(
  text: any,
  enclosingNode: any,
  precedingNode: any,
  comment: any,
  options: any
) {
  // This is only needed for estree parsers (flow, typescript) to attach
  // after a method name:
  // obj = { fn /*comment*/() {} };
  if (
    enclosingNode &&
    precedingNode &&
    (enclosingNode.type === 'Property' ||
      enclosingNode.type === 'MethodDefinition') &&
    precedingNode.type === 'Identifier' &&
    enclosingNode.key === precedingNode &&
    // special Property case: { key: /*comment*/(value) };
    // comment should be attached to value instead of key
    privateUtil.getNextNonSpaceNonCommentCharacter(
      text,
      precedingNode,
      options.locEnd
    ) !== ':'
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Print comments between decorators and class methods as a trailing comment
  // on the decorator node instead of the method node
  if (
    precedingNode &&
    enclosingNode &&
    precedingNode.type === 'Decorator' &&
    (enclosingNode.type === 'ClassMethod' ||
      enclosingNode.type === 'ClassProperty' ||
      enclosingNode.type === 'TSAbstractClassProperty' ||
      enclosingNode.type === 'TSAbstractMethodDefinition' ||
      enclosingNode.type === 'MethodDefinition')
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  return false;
}

function handleFunctionNameComments(
  text: any,
  enclosingNode: any,
  precedingNode: any,
  comment: any,
  options: any
) {
  if (
    privateUtil.getNextNonSpaceNonCommentCharacter(
      text,
      comment,
      options.locEnd
    ) !== '('
  ) {
    return false;
  }

  if (
    precedingNode &&
    enclosingNode &&
    (enclosingNode.type === 'FunctionDeclaration' ||
      enclosingNode.type === 'FunctionExpression' ||
      enclosingNode.type === 'ClassMethod' ||
      enclosingNode.type === 'MethodDefinition' ||
      enclosingNode.type === 'ObjectMethod')
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handleCommentAfterArrowParams(
  text: any,
  enclosingNode: any,
  comment: any,
  options: any
) {
  if (!(enclosingNode && enclosingNode.type === 'ArrowFunctionExpression')) {
    return false;
  }

  const index = getNextNonSpaceNonCommentCharacterIndex(text, comment, options);
  if (text.substr(index, 2) === '=>') {
    addDanglingComment(enclosingNode, comment);
    return true;
  }

  return false;
}

function handleCommentInEmptyParens(
  text: any,
  enclosingNode: any,
  comment: any,
  options: any
) {
  if (
    privateUtil.getNextNonSpaceNonCommentCharacter(
      text,
      comment,
      options.locEnd
    ) !== ')'
  ) {
    return false;
  }

  // Only add dangling comments to fix the case when no params are present,
  // i.e. a function without any argument.
  if (
    enclosingNode &&
    (((enclosingNode.type === 'FunctionDeclaration' ||
      enclosingNode.type === 'FunctionExpression' ||
      (enclosingNode.type === 'ArrowFunctionExpression' &&
        (enclosingNode.body.type !== 'CallExpression' ||
          enclosingNode.body.arguments.length === 0)) ||
      enclosingNode.type === 'ClassMethod' ||
      enclosingNode.type === 'ObjectMethod') &&
      enclosingNode.params.length === 0) ||
      ((enclosingNode.type === 'CallExpression' ||
        enclosingNode.type === 'NewExpression') &&
        enclosingNode.arguments.length === 0))
  ) {
    addDanglingComment(enclosingNode, comment);
    return true;
  }
  if (
    enclosingNode &&
    enclosingNode.type === 'MethodDefinition' &&
    enclosingNode.value.params.length === 0
  ) {
    addDanglingComment(enclosingNode.value, comment);
    return true;
  }
  return false;
}

function handleLastFunctionArgComments(
  text: any,
  precedingNode: any,
  enclosingNode: any,
  followingNode: any,
  comment: any,
  options: any
) {
  // Type definitions functions
  if (
    precedingNode &&
    precedingNode.type === 'FunctionTypeParam' &&
    enclosingNode &&
    enclosingNode.type === 'FunctionTypeAnnotation' &&
    followingNode &&
    followingNode.type !== 'FunctionTypeParam'
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }

  // Real functions
  if (
    precedingNode &&
    (precedingNode.type === 'Identifier' ||
      precedingNode.type === 'AssignmentPattern') &&
    enclosingNode &&
    (enclosingNode.type === 'ArrowFunctionExpression' ||
      enclosingNode.type === 'FunctionExpression' ||
      enclosingNode.type === 'FunctionDeclaration' ||
      enclosingNode.type === 'ObjectMethod' ||
      enclosingNode.type === 'ClassMethod') &&
    privateUtil.getNextNonSpaceNonCommentCharacter(
      text,
      comment,
      options.locEnd
    ) === ')'
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handleImportSpecifierComments(enclosingNode: any, comment: any) {
  if (enclosingNode && enclosingNode.type === 'ImportSpecifier') {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleLabeledStatementComments(enclosingNode: any, comment: any) {
  if (enclosingNode && enclosingNode.type === 'LabeledStatement') {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleBreakAndContinueStatementComments(
  enclosingNode: any,
  comment: any
) {
  if (
    enclosingNode &&
    (enclosingNode.type === 'ContinueStatement' ||
      enclosingNode.type === 'BreakStatement') &&
    !enclosingNode.label
  ) {
    addTrailingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleCallExpressionComments(
  precedingNode: any,
  enclosingNode: any,
  comment: any
) {
  if (
    enclosingNode &&
    enclosingNode.type === 'CallExpression' &&
    precedingNode &&
    enclosingNode.callee === precedingNode &&
    enclosingNode.arguments.length > 0
  ) {
    addLeadingComment(enclosingNode.arguments[0], comment);
    return true;
  }
  return false;
}

function handleUnionTypeComments(
  precedingNode: any,
  enclosingNode: any,
  followingNode: any,
  comment: any
) {
  if (
    enclosingNode &&
    (enclosingNode.type === 'UnionTypeAnnotation' ||
      enclosingNode.type === 'TSUnionType')
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handlePropertyComments(enclosingNode: any, comment: any) {
  if (
    enclosingNode &&
    (enclosingNode.type === 'Property' ||
      enclosingNode.type === 'ObjectProperty')
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleOnlyComments(
  enclosingNode: any,
  ast: any,
  comment: any,
  isLastComment: any
) {
  // With Flow the enclosingNode is undefined so use the AST instead.
  if (ast && ast.body && ast.body.length === 0) {
    if (isLastComment) {
      addDanglingComment(ast, comment);
    } else {
      addLeadingComment(ast, comment);
    }
    return true;
  } else if (
    enclosingNode &&
    enclosingNode.type === 'Program' &&
    enclosingNode.body.length === 0 &&
    enclosingNode.directives &&
    enclosingNode.directives.length === 0
  ) {
    if (isLastComment) {
      addDanglingComment(enclosingNode, comment);
    } else {
      addLeadingComment(enclosingNode, comment);
    }
    return true;
  }
  return false;
}

function handleForComments(
  enclosingNode: any,
  precedingNode: any,
  comment: any
) {
  if (
    enclosingNode &&
    (enclosingNode.type === 'ForInStatement' ||
      enclosingNode.type === 'ForOfStatement')
  ) {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleImportDeclarationComments(
  text: any,
  enclosingNode: any,
  precedingNode: any,
  comment: any,
  options: any
) {
  if (
    precedingNode &&
    precedingNode.type === 'ImportSpecifier' &&
    enclosingNode &&
    enclosingNode.type === 'ImportDeclaration' &&
    privateUtil.hasNewline(text, options.locEnd(comment))
  ) {
    addTrailingComment(precedingNode, comment);
    return true;
  }
  return false;
}

function handleAssignmentPatternComments(enclosingNode: any, comment: any) {
  if (enclosingNode && enclosingNode.type === 'AssignmentPattern') {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleTypeAliasComments(
  enclosingNode: any,
  followingNode: any,
  comment: any
) {
  if (enclosingNode && enclosingNode.type === 'TypeAlias') {
    addLeadingComment(enclosingNode, comment);
    return true;
  }
  return false;
}

function handleVariableDeclaratorComments(
  enclosingNode: any,
  followingNode: any,
  comment: any
) {
  if (
    enclosingNode &&
    (enclosingNode.type === 'VariableDeclarator' ||
      enclosingNode.type === 'AssignmentExpression') &&
    followingNode &&
    (followingNode.type === 'ObjectExpression' ||
      followingNode.type === 'ArrayExpression' ||
      followingNode.type === 'TemplateLiteral' ||
      followingNode.type === 'TaggedTemplateExpression')
  ) {
    addLeadingComment(followingNode, comment);
    return true;
  }
  return false;
}

function handleTSMappedTypeComments(
  text: any,
  enclosingNode: any,
  precedingNode: any,
  followingNode: any,
  comment: any
) {
  if (!enclosingNode || enclosingNode.type !== 'TSMappedType') {
    return false;
  }

  if (
    followingNode &&
    followingNode.type === 'TSTypeParameter' &&
    followingNode.name
  ) {
    addLeadingComment(followingNode.name, comment);
    return true;
  }

  if (
    precedingNode &&
    precedingNode.type === 'TSTypeParameter' &&
    precedingNode.constraint
  ) {
    addTrailingComment(precedingNode.constraint, comment);
    return true;
  }

  return false;
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isBlockCom... Remove this comment to see the full error message
function isBlockComment(comment: any) {
  return comment.type === 'Block' || comment.type === 'CommentBlock';
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  handleOwnLineComment,
  handleEndOfLineComment,
  handleRemainingComment,
  isBlockComment,
};
