const {
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handleOwnL... Remove this comment to see the full error message
  handleOwnLineComment,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handleEndO... Remove this comment to see the full error message
  handleEndOfLineComment,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handleRema... Remove this comment to see the full error message
  handleRemainingComment,
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isBlockCom... Remove this comment to see the full error message
  isBlockComment
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('../prettier-comments/language-js/comments');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handleCont... Remove this comment to see the full error message
const handleContractDefinitionComments = require('./handlers/ContractDefinition');

function solidityHandleOwnLineComment(
  comment: any,
  text: any,
  options: any,
  ast: any,
  isLastComment: any
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = [
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  ];

  if (
    handleContractDefinitionComments(...handlerArguments) ||
    handleOwnLineComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

function solidityHandleEndOfLineComment(
  comment: any,
  text: any,
  options: any,
  ast: any,
  isLastComment: any
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = [
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  ];

  if (
    handleContractDefinitionComments(...handlerArguments) ||
    handleEndOfLineComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

function solidityHandleRemainingComment(
  comment: any,
  text: any,
  options: any,
  ast: any,
  isLastComment: any
) {
  const { precedingNode, enclosingNode, followingNode } = comment;
  const handlerArguments = [
    text,
    precedingNode,
    enclosingNode,
    followingNode,
    comment,
    options
  ];

  if (
    handleContractDefinitionComments(...handlerArguments) ||
    handleRemainingComment(comment, text, options, ast, isLastComment)
  ) {
    return true;
  }
  return false;
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  handleOwnLineComment: solidityHandleOwnLineComment,
  handleEndOfLineComment: solidityHandleEndOfLineComment,
  handleRemainingComment: solidityHandleRemainingComment,
  isBlockComment
};
