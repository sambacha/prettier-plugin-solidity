const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: {group, indent, join, line, softline},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// This function will add an indentation to the `list` and separate it from the
// rest of the `doc` in most cases by a `softline`.
// the list itself will be printed with a separator that in most cases is a
// comma (,) and a `line`
//
// NOTE: the resulting `doc` is wrapped in a `group` because multiple items
// are usually their own structure.
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = (
  list: any,
  {
    // @ts-expect-error ts-migrate(7022) FIXME: 'firstSeparator' implicitly has type 'any' because... Remove this comment to see the full error message
    firstSeparator = softline,
    separator = [',', line],
    lastSeparator = firstSeparator,
  } = {}
) => group([indent([firstSeparator, join(separator, list)]), lastSeparator]);
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = printSeparatedList;
