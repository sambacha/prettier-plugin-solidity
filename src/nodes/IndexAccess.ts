const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: { group, ifBreak, indent, label, softline }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'groupIndex... Remove this comment to see the full error message
let groupIndex = 0;
const IndexAccess = {
  print: ({
    path,
    print
  }: any) => {
    let baseDoc = path.call(print, 'base');
    let indexDoc = group([
      indent([softline, path.call(print, 'index')]),
      softline,
      ']'
    ]);

    // If we are at the end of a MemberAccessChain we should indent the
    // arguments accordingly.
    if (baseDoc.label === 'MemberAccessChain') {
      baseDoc = group(baseDoc.contents, {
        id: `IndexAccess.base-${groupIndex}`
      });

      groupIndex += 1;

      indexDoc = ifBreak(indent(indexDoc), indexDoc, {
        groupId: baseDoc.id
      });
      // We wrap the expression in a label in case there is an IndexAccess or
      // a FunctionCall following this IndexAccess.
      return label('MemberAccessChain', [baseDoc, '[', indexDoc]);
    }

    return [baseDoc, '[', indexDoc];
  }
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = IndexAccess;
