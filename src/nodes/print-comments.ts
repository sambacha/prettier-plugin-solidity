const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'join'.
    builders: { join, line }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printComme... Remove this comment to see the full error message
const printComments = (node: any, path: any, options: any, filter = () => true) =>
  node.comments
    ? join(
        line,
        path
          .map((commentPath: any) => {
            const comment = commentPath.getValue();
            if (comment.trailing || comment.leading || comment.printed) {
              return null;
            }
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 1.
            if (!filter(comment)) {
              return null;
            }
            comment.printed = true;
            return options.printer.printComment(commentPath);
          }, 'comments')
          .filter(Boolean)
      )
    : '';

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = printComments;
