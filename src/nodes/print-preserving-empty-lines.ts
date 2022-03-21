const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hardline'.
    builders: { hardline }
  },
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isNextLine... Remove this comment to see the full error message
  util: { isNextLineEmptyAfterIndex }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printPrese... Remove this comment to see the full error message
function printPreservingEmptyLines(path: any, key: any, options: any, print: any) {
  const parts: any = [];
  path.each((childPath: any) => {
    const node = childPath.getValue();
    const nodeType = node.type;

    if (
      // Avoid adding a hardline at the beginning of the document.
      parts.length !== 0 &&
      // LabelDefinition adds a dedented line so we don't have to prepend a
      // hardline.
      nodeType !== 'LabelDefinition'
    ) {
      parts.push(hardline);
    }

    if (childPath.getName() > 0) {
      if (
        ['ContractDefinition', 'FunctionDefinition'].includes(nodeType) &&
        parts[parts.length - 2] !== hardline
      ) {
        parts.push(hardline);
      }
    }

    parts.push(print(childPath));

    if (
      isNextLineEmptyAfterIndex(
        options.originalText,
        options.locEnd(node) + 1
      ) ||
      nodeType === 'FunctionDefinition'
    ) {
      parts.push(hardline);
    }
  }, key);

  if (parts.length > 1 && parts[parts.length - 1] === hardline) {
    parts.pop();
  }

  return parts;
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = printPreservingEmptyLines;
