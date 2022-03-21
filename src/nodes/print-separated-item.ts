const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'indent'.
    builders: {indent, softline},
  },
  // @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');

// This function will add an indentation to the `item` and separate it from the
// rest of the `doc` in most cases by a `softline`.
//
// NOTE: it doesn't `group` the resulting `doc` because single items can also be
// part of a larger structure.
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedItem = (
  item: any,
  // @ts-expect-error ts-migrate(7022) FIXME: 'firstSeparator' implicitly has type 'any' because... Remove this comment to see the full error message
  {firstSeparator = softline, lastSeparator = firstSeparator} = {}
) => [indent([firstSeparator, item]), lastSeparator];

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = printSeparatedItem;
