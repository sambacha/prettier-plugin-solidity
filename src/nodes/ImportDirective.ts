const {
  doc: {
    // @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'group'.
    builders: { group, line, softline }
  }
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
} = require('prettier');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'semver'.
const semver = require('semver');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printSepar... Remove this comment to see the full error message
const printSeparatedList = require('./print-separated-list');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printStrin... Remove this comment to see the full error message
const { printString } = require('../prettier-comments/common/util');

const ImportDirective = {
  print: ({
    node,
    options
  }: any) => {
    const importPath = printString(node.path, options);
    let doc;

    if (node.unitAlias) {
      // import "./Foo.sol" as Foo;
      doc = [importPath, ' as ', node.unitAlias];
    } else if (node.symbolAliases) {
      // import { Foo, Bar as Qux } from "./Foo.sol";
      const compiler = semver.coerce(options.compiler);
      // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'a' implicitly has an 'any' type.
      const symbolAliases = node.symbolAliases.map(([a, b]) =>
        b ? `${a} as ${b}` : a
      );
      let firstSeparator;
      let separator;

      if (compiler && semver.satisfies(compiler, '>=0.7.4')) {
        // if the compiler exists and is greater than or equal to 0.7.4 we will
        // split the ImportDirective.
        firstSeparator = options.bracketSpacing ? line : softline;
        separator = [',', line];
      } else {
        // if the compiler is not given or is lower than 0.7.4 we will not
        // split the ImportDirective.
        firstSeparator = options.bracketSpacing ? ' ' : '';
        separator = ', ';
      }

      doc = [
        '{',
        printSeparatedList(symbolAliases, { firstSeparator, separator }),
        '} from ',
        importPath
      ];
    } else {
      // import "./Foo.sol";
      doc = importPath;
    }
    return group(['import ', doc, ';']);
  }
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = ImportDirective;
