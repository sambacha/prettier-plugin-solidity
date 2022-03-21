const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hardline'.
    builders: { hardline, join }
  },
  // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hasNewline... Remove this comment to see the full error message
  util: { hasNewline }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

function isIndentableBlockComment(comment: any) {
  // If the comment has multiple lines and every line starts with a star
  // we can fix the indentation of each line. The stars in the `/*` and
  // `*/` delimiters are not included in the comment value, so add them
  // back first.
  const lines = `*${comment.raw}*`.split('\n');
  return lines.length > 1 && lines.every((line) => line.trim()[0] === '*');
}

function printIndentableBlockComment(comment: any) {
  const lines = comment.raw.split('\n');

  return [
    '/*',
    join(
      hardline,
      lines.map((line: any, index: any) =>
        index === 0
          ? line.trimRight()
          : ` ${index < lines.length - 1 ? line.trim() : line.trimLeft()}`
      )
    ),
    '*/'
  ];
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printComme... Remove this comment to see the full error message
function printComment(commentPath: any, options: any) {
  const comment = commentPath.getValue();

  switch (comment.type) {
    case 'BlockComment': {
      if (isIndentableBlockComment(comment)) {
        const printed = printIndentableBlockComment(comment);
        // We need to prevent an edge case of a previous trailing comment
        // printed as a `lineSuffix` which causes the comments to be
        // interleaved. See https://github.com/prettier/prettier/issues/4412
        if (
          comment.trailing &&
          !hasNewline(options.originalText, options.locStart(comment), {
            backwards: true
          })
        ) {
          return [hardline, printed];
        }
        return printed;
      }

      return `/*${comment.raw}*/`;
    }
    case 'LineComment':
      return `//${comment.raw.trimRight()}`;
    default:
      throw new Error(`Not a comment: ${JSON.stringify(comment)}`);
  }
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = printComment;
