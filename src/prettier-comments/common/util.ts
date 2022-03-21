"use strict";

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const stringWidth = require("string-width");
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const emojiRegex = require("emoji-regex")();
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'require'. Do you need to install... Remove this comment to see the full error message
const escapeStringRegexp = require("escape-string-regexp");

// eslint-disable-next-line no-control-regex
const notAsciiRegex = /[^\x20-\x7F]/;

function isExportDeclaration(node: any) {
  if (node) {
    switch (node.type) {
      case "ExportDefaultDeclaration":
      case "ExportDefaultSpecifier":
      case "DeclareExportDeclaration":
      case "ExportNamedDeclaration":
      case "ExportAllDeclaration":
        return true;
    }
  }

  return false;
}

function getParentExportDeclaration(path: any) {
  const parentNode = path.getParentNode();
  if (path.getName() === "declaration" && isExportDeclaration(parentNode)) {
    return parentNode;
  }

  return null;
}

function getPenultimate(arr: any) {
  if (arr.length > 1) {
    return arr[arr.length - 2];
  }
  return null;
}

function getLast(arr: any) {
  if (arr.length > 0) {
    return arr[arr.length - 1];
  }
  return null;
}

function skip(chars: any) {
  return (text: any, index: any, opts: any) => {
    const backwards = opts && opts.backwards;

    // Allow `skip` functions to be threaded together without having
    // to check for failures (did someone say monads?).
    if (index === false) {
      return false;
    }

    const length = text.length;
    let cursor = index;
    while (cursor >= 0 && cursor < length) {
      const c = text.charAt(cursor);
      if (chars instanceof RegExp) {
        if (!chars.test(c)) {
          return cursor;
        }
      } else if (chars.indexOf(c) === -1) {
        return cursor;
      }

      backwards ? cursor-- : cursor++;
    }

    if (cursor === -1 || cursor === length) {
      // If we reached the beginning or end of the file, return the
      // out-of-bounds cursor. It's up to the caller to handle this
      // correctly. We don't want to indicate `false` though if it
      // actually skipped valid characters.
      return cursor;
    }
    return false;
  };
}

const skipWhitespace = skip(/\s/);
const skipSpaces = skip(" \t");
const skipToLineEnd = skip(",; \t");
const skipEverythingButNewLine = skip(/[^\r\n]/);

function skipInlineComment(text: any, index: any) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "*") {
    for (let i = index + 2; i < text.length; ++i) {
      if (text.charAt(i) === "*" && text.charAt(i + 1) === "/") {
        return i + 2;
      }
    }
  }
  return index;
}

function skipTrailingComment(text: any, index: any) {
  if (index === false) {
    return false;
  }

  if (text.charAt(index) === "/" && text.charAt(index + 1) === "/") {
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    return skipEverythingButNewLine(text, index);
  }
  return index;
}

// This one doesn't use the above helper function because it wants to
// test \r\n in order and `skip` doesn't support ordering and we only
// want to skip one newline. It's simple to implement.
function skipNewline(text: any, index: any, opts: any) {
  const backwards = opts && opts.backwards;
  if (index === false) {
    return false;
  }

  const atIndex = text.charAt(index);
  if (backwards) {
    if (text.charAt(index - 1) === "\r" && atIndex === "\n") {
      return index - 2;
    }
    if (
      atIndex === "\n" ||
      atIndex === "\r" ||
      atIndex === "\u2028" ||
      atIndex === "\u2029"
    ) {
      return index - 1;
    }
  } else {
    if (atIndex === "\r" && text.charAt(index + 1) === "\n") {
      return index + 2;
    }
    if (
      atIndex === "\n" ||
      atIndex === "\r" ||
      atIndex === "\u2028" ||
      atIndex === "\u2029"
    ) {
      return index + 1;
    }
  }

  return index;
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hasNewline... Remove this comment to see the full error message
function hasNewline(text: any, index: any, opts: any) {
  opts = opts || {};
  const idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  const idx2 = skipNewline(text, idx, opts);
  return idx !== idx2;
}

function hasNewlineInRange(text: any, start: any, end: any) {
  for (let i = start; i < end; ++i) {
    if (text.charAt(i) === "\n") {
      return true;
    }
  }
  return false;
}

// Note: this function doesn't ignore leading comments unlike isNextLineEmpty
function isPreviousLineEmpty(text: any, node: any, locStart: any) {
  let idx = locStart(node) - 1;
  idx = skipSpaces(text, idx, { backwards: true });
  idx = skipNewline(text, idx, { backwards: true });
  idx = skipSpaces(text, idx, { backwards: true });
  const idx2 = skipNewline(text, idx, { backwards: true });
  return idx !== idx2;
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'isNextLine... Remove this comment to see the full error message
function isNextLineEmptyAfterIndex(text: any, index: any) {
  let oldIdx = null;
  let idx = index;
  while (idx !== oldIdx) {
    // We need to skip all the potential trailing inline comments
    oldIdx = idx;
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    idx = skipToLineEnd(text, idx);
    idx = skipInlineComment(text, idx);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    idx = skipSpaces(text, idx);
  }
  idx = skipTrailingComment(text, idx);
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  idx = skipNewline(text, idx);
  return hasNewline(text, idx);
}

function isNextLineEmpty(text: any, node: any, locEnd: any) {
  return isNextLineEmptyAfterIndex(text, locEnd(node));
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getNextNon... Remove this comment to see the full error message
function getNextNonSpaceNonCommentCharacterIndex(text: any, node: any, locEnd: any) {
  let oldIdx = null;
  let idx = locEnd(node);
  while (idx !== oldIdx) {
    oldIdx = idx;
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    idx = skipSpaces(text, idx);
    idx = skipInlineComment(text, idx);
    idx = skipTrailingComment(text, idx);
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
    idx = skipNewline(text, idx);
  }
  return idx;
}

function getNextNonSpaceNonCommentCharacter(text: any, node: any, locEnd: any) {
  return text.charAt(
    getNextNonSpaceNonCommentCharacterIndex(text, node, locEnd)
  );
}

function hasSpaces(text: any, index: any, opts: any) {
  opts = opts || {};
  const idx = skipSpaces(text, opts.backwards ? index - 1 : index, opts);
  return idx !== index;
}

function setLocStart(node: any, index: any) {
  if (node.range) {
    node.range[0] = index;
  } else {
    node.start = index;
  }
}

function setLocEnd(node: any, index: any) {
  if (node.range) {
    node.range[1] = index;
  } else {
    node.end = index;
  }
}

const PRECEDENCE = {};
[
  ["|>"],
  ["||", "??"],
  ["&&"],
  ["|"],
  ["^"],
  ["&"],
  ["==", "===", "!=", "!=="],
  ["<", ">", "<=", ">=", "in", "instanceof"],
  [">>", "<<", ">>>"],
  ["+", "-"],
  ["*", "/", "%"],
  ["**"]
].forEach((tier, i) => {
  tier.forEach(op => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    PRECEDENCE[op] = i;
  });
});

function getPrecedence(op: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return PRECEDENCE[op];
}

const equalityOperators = {
  "==": true,
  "!=": true,
  "===": true,
  "!==": true
};
const multiplicativeOperators = {
  "*": true,
  "/": true,
  "%": true
};
const bitshiftOperators = {
  ">>": true,
  ">>>": true,
  "<<": true
};

function shouldFlatten(parentOp: any, nodeOp: any) {
  if (getPrecedence(nodeOp) !== getPrecedence(parentOp)) {
    return false;
  }

  // ** is right-associative
  // x ** y ** z --> x ** (y ** z)
  if (parentOp === "**") {
    return false;
  }

  // x == y == z --> (x == y) == z
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (equalityOperators[parentOp] && equalityOperators[nodeOp]) {
    return false;
  }

  // x * y % z --> (x * y) % z
  if (
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    (nodeOp === "%" && multiplicativeOperators[parentOp]) ||
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    (parentOp === "%" && multiplicativeOperators[nodeOp])
  ) {
    return false;
  }

  // x * y / z --> (x * y) / z
  // x / y * z --> (x / y) * z
  if (
    nodeOp !== parentOp &&
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    multiplicativeOperators[nodeOp] &&
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    multiplicativeOperators[parentOp]
  ) {
    return false;
  }

  // x << y << z --> (x << y) << z
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (bitshiftOperators[parentOp] && bitshiftOperators[nodeOp]) {
    return false;
  }

  return true;
}

function isBitwiseOperator(operator: any) {
  return (
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    !!bitshiftOperators[operator] ||
    operator === "|" ||
    operator === "^" ||
    operator === "&"
  );
}

// Tests if an expression starts with `{`, or (if forbidFunctionClassAndDoExpr
// holds) `function`, `class`, or `do {}`. Will be overzealous if there's
// already necessary grouping parentheses.
// @ts-expect-error ts-migrate(7023) FIXME: 'startsWithNoLookaheadToken' implicitly has return... Remove this comment to see the full error message
function startsWithNoLookaheadToken(node: any, forbidFunctionClassAndDoExpr: any) {
  node = getLeftMost(node);
  switch (node.type) {
    case "FunctionExpression":
    case "ClassExpression":
    case "DoExpression":
      return forbidFunctionClassAndDoExpr;
    case "ObjectExpression":
      return true;
    case "MemberExpression":
      return startsWithNoLookaheadToken(
        node.object,
        forbidFunctionClassAndDoExpr
      );
    case "TaggedTemplateExpression":
      if (node.tag.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }
      return startsWithNoLookaheadToken(node.tag, forbidFunctionClassAndDoExpr);
    case "CallExpression":
      if (node.callee.type === "FunctionExpression") {
        // IIFEs are always already parenthesized
        return false;
      }
      return startsWithNoLookaheadToken(
        node.callee,
        forbidFunctionClassAndDoExpr
      );
    case "ConditionalExpression":
      return startsWithNoLookaheadToken(
        node.test,
        forbidFunctionClassAndDoExpr
      );
    case "UpdateExpression":
      return (
        !node.prefix &&
        startsWithNoLookaheadToken(node.argument, forbidFunctionClassAndDoExpr)
      );
    case "BindExpression":
      return (
        node.object &&
        startsWithNoLookaheadToken(node.object, forbidFunctionClassAndDoExpr)
      );
    case "SequenceExpression":
      return startsWithNoLookaheadToken(
        node.expressions[0],
        forbidFunctionClassAndDoExpr
      );
    case "TSAsExpression":
      return startsWithNoLookaheadToken(
        node.expression,
        forbidFunctionClassAndDoExpr
      );
    default:
      return false;
  }
}

// @ts-expect-error ts-migrate(7023) FIXME: 'getLeftMost' implicitly has return type 'any' bec... Remove this comment to see the full error message
function getLeftMost(node: any) {
  if (node.left) {
    return getLeftMost(node.left);
  }
  return node;
}

function getAlignmentSize(value: any, tabWidth: any, startIndex: any) {
  startIndex = startIndex || 0;

  let size = 0;
  for (let i = startIndex; i < value.length; ++i) {
    if (value[i] === "\t") {
      // Tabs behave in a way that they are aligned to the nearest
      // multiple of tabWidth:
      // 0 -> 4, 1 -> 4, 2 -> 4, 3 -> 4
      // 4 -> 8, 5 -> 8, 6 -> 8, 7 -> 8 ...
      size = size + tabWidth - (size % tabWidth);
    } else {
      size++;
    }
  }

  return size;
}

function getIndentSize(value: any, tabWidth: any) {
  const lastNewlineIndex = value.lastIndexOf("\n");
  if (lastNewlineIndex === -1) {
    return 0;
  }

  // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
  return getAlignmentSize(
    // All the leading whitespaces
    value.slice(lastNewlineIndex + 1).match(/^[ \t]*/)[0],
    tabWidth
  );
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'printStrin... Remove this comment to see the full error message
function printString(rawContent: any, options: any) {
  const double = { quote: '"', regex: /"/g };
  const single = { quote: "'", regex: /'/g };

  const preferred = options.singleQuote ? single : double;
  const alternate = preferred === single ? double : single;

  let shouldUseAlternateQuote = false;
  let canChangeDirectiveQuotes = false;

  // If `rawContent` contains at least one of the quote preferred for enclosing
  // the string, we might want to enclose with the alternate quote instead, to
  // minimize the number of escaped quotes.
  // Also check for the alternate quote, to determine if we're allowed to swap
  // the quotes on a DirectiveLiteral.
  if (
    rawContent.includes(preferred.quote) ||
    rawContent.includes(alternate.quote)
  ) {
    const numPreferredQuotes = (rawContent.match(preferred.regex) || []).length;
    const numAlternateQuotes = (rawContent.match(alternate.regex) || []).length;

    shouldUseAlternateQuote = numPreferredQuotes > numAlternateQuotes;
  } else {
    canChangeDirectiveQuotes = true;
  }

  const enclosingQuote =
    options.parser === "json"
      ? double.quote
      : shouldUseAlternateQuote
        ? alternate.quote
        : preferred.quote;

  // It might sound unnecessary to use `makeString` even if the string already
  // is enclosed with `enclosingQuote`, but it isn't. The string could contain
  // unnecessary escapes (such as in `"\'"`). Always using `makeString` makes
  // sure that we consistently output the minimum amount of escaped quotes.
  return makeString(
    rawContent,
    enclosingQuote,
    !(
      options.parser === "css" ||
      options.parser === "less" ||
      options.parser === "scss"
    )
  );
}

function makeString(rawContent: any, enclosingQuote: any, unescapeUnnecessaryEscapes: any) {
  const otherQuote = enclosingQuote === '"' ? "'" : '"';

  // Matches _any_ escape and unescaped quotes (both single and double).
  const regex = /\\([\s\S])|(['"])/g;

  // Escape and unescape single and double quotes as needed to be able to
  // enclose `rawContent` with `enclosingQuote`.
  const newContent = rawContent.replace(regex, (match: any, escaped: any, quote: any) => {
    // If we matched an escape, and the escaped character is a quote of the
    // other type than we intend to enclose the string with, there's no need for
    // it to be escaped, so return it _without_ the backslash.
    if (escaped === otherQuote) {
      return escaped;
    }

    // If we matched an unescaped quote and it is of the _same_ type as we
    // intend to enclose the string with, it must be escaped, so return it with
    // a backslash.
    if (quote === enclosingQuote) {
      return "\\" + quote;
    }

    if (quote) {
      return quote;
    }

    // Unescape any unnecessarily escaped character.
    // Adapted from https://github.com/eslint/eslint/blob/de0b4ad7bd820ade41b1f606008bea68683dc11a/lib/rules/no-useless-escape.js#L27
    return unescapeUnnecessaryEscapes &&
      /^[^\\nrvtbfux\r\n\u2028\u2029"'0-7]$/.test(escaped)
      ? escaped
      : "\\" + escaped;
  });

  return enclosingQuote + newContent + enclosingQuote;
}

function printNumber(rawNumber: any) {
  return rawNumber
    .toLowerCase()
    // Remove unnecessary plus and zeroes from scientific notation.
    .replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(\d)/, "$1$2$3")
    // Remove unnecessary scientific notation (1e0).
    .replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1")
    // Make sure numbers always start with a digit.
    .replace(/^([+-])?\./, "$10.")
    // Remove extraneous trailing decimal zeroes.
    .replace(/(\.\d+?)0+(?=e|$)/, "$1")
    // Remove trailing dot.
    .replace(/\.(?=e|$)/, "");
}

function getMaxContinuousCount(str: any, target: any) {
  const results = str.match(
    new RegExp(`(${escapeStringRegexp(target)})+`, "g")
  );

  if (results === null) {
    return 0;
  }

  return results.reduce(
    (maxCount: any, result: any) => Math.max(maxCount, result.length / target.length),
    0
  );
}

function getStringWidth(text: any) {
  if (!text) {
    return 0;
  }

  // shortcut to avoid needless string `RegExp`s, replacements, and allocations within `string-width`
  if (!notAsciiRegex.test(text)) {
    return text.length;
  }

  // emojis are considered 2-char width for consistency
  // see https://github.com/sindresorhus/string-width/issues/11
  // for the reason why not implemented in `string-width`
  return stringWidth(text.replace(emojiRegex, "  "));
}

function hasIgnoreComment(path: any) {
  const node = path.getValue();
  return hasNodeIgnoreComment(node);
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'hasNodeIgn... Remove this comment to see the full error message
function hasNodeIgnoreComment(node: any) {
  return node &&
  node.comments &&
  node.comments.length > 0 &&
  node.comments.some((comment: any) => comment.value.trim() === "prettier-ignore");
}

function matchAncestorTypes(path: any, types: any, index: any) {
  index = index || 0;
  types = types.slice();
  while (types.length) {
    const parent = path.getParentNode(index);
    const type = types.shift();
    if (!parent || parent.type !== type) {
      return false;
    }
    index++;
  }
  return true;
}

function addCommentHelper(node: any, comment: any) {
  const comments = node.comments || (node.comments = []);
  comments.push(comment);
  comment.printed = false;

  // For some reason, TypeScript parses `// x` inside of JSXText as a comment
  // We already "print" it via the raw text, we don't need to re-print it as a
  // comment
  if (node.type === "JSXText") {
    comment.printed = true;
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'addLeading... Remove this comment to see the full error message
function addLeadingComment(node: any, comment: any) {
  comment.leading = true;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'addDanglin... Remove this comment to see the full error message
function addDanglingComment(node: any, comment: any) {
  comment.leading = false;
  comment.trailing = false;
  addCommentHelper(node, comment);
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'addTrailin... Remove this comment to see the full error message
function addTrailingComment(node: any, comment: any) {
  comment.leading = false;
  comment.trailing = true;
  addCommentHelper(node, comment);
}

function isWithinParentArrayProperty(path: any, propertyName: any) {
  const node = path.getValue();
  const parent = path.getParentNode();

  if (parent == null) {
    return false;
  }

  if (!Array.isArray(parent[propertyName])) {
    return false;
  }

  const key = path.getName();
  return parent[propertyName][key] === node;
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  getStringWidth,
  getMaxContinuousCount,
  getPrecedence,
  shouldFlatten,
  isBitwiseOperator,
  isExportDeclaration,
  getParentExportDeclaration,
  getPenultimate,
  getLast,
  getNextNonSpaceNonCommentCharacterIndex,
  getNextNonSpaceNonCommentCharacter,
  skip,
  skipWhitespace,
  skipSpaces,
  skipToLineEnd,
  skipEverythingButNewLine,
  skipInlineComment,
  skipTrailingComment,
  skipNewline,
  isNextLineEmptyAfterIndex,
  isNextLineEmpty,
  isPreviousLineEmpty,
  hasNewline,
  hasNewlineInRange,
  hasSpaces,
  setLocStart,
  setLocEnd,
  startsWithNoLookaheadToken,
  getAlignmentSize,
  getIndentSize,
  printString,
  printNumber,
  hasIgnoreComment,
  hasNodeIgnoreComment,
  makeString,
  matchAncestorTypes,
  addLeadingComment,
  addDanglingComment,
  addTrailingComment,
  isWithinParentArrayProperty
};
