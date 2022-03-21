const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, hardline, indent, line},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printComme... Remove this comment to see the full error message
const printComments = require('./print-comments');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedItem = require('./print-separated-item');

const printTrueBody = (node: any, path: any, print: any) => {
  if (node.trueBody.type === 'Block') {
    return [' ', path.call(print, 'trueBody')];
  }

  const ifWithinIf = node.trueBody.type === 'IfStatement';
  return group(
    indent([ifWithinIf ? hardline : line, path.call(print, 'trueBody')])
  );
};

const printFalseBody = (node: any, path: any, print: any) =>
  node.falseBody.type === 'Block' || node.falseBody.type === 'IfStatement'
    ? [' ', path.call(print, 'falseBody')]
    : group(indent([line, path.call(print, 'falseBody')]));

const printElse = (
  node: any,
  path: any,
  print: any,
  commentsBetweenIfAndElse: any
) => {
  if (node.falseBody) {
    const elseOnSameLine =
      node.trueBody.type === 'Block' && commentsBetweenIfAndElse.length === 0;
    return [
      elseOnSameLine ? ' ' : hardline,
      'else',
      printFalseBody(node, path, print),
    ];
  }
  return '';
};

const IfStatement = {
  print: ({node, options, path, print}: any) => {
    const comments = node.comments || [];
    const commentsBetweenIfAndElse = comments.filter(
      (comment: any) => !comment.leading && !comment.trailing
    );

    const parts = [];

    parts.push(
      group(['if (', printSeparatedItem(path.call(print, 'condition')), ')'])
    );
    parts.push(printTrueBody(node, path, print));
    if (commentsBetweenIfAndElse.length && node.falseBody) {
      parts.push(hardline);
      parts.push(printComments(node, path, options));
    }
    parts.push(printElse(node, path, print, commentsBetweenIfAndElse));

    return parts;
  },
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = IfStatement;
