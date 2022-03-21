// see: https://github.com/prettier/prettier/blob/main/src/language-js/loc.js

function getRange(index: any, node: any) {
  if (node.range) {
    return node.range[index];
  }
  if (node.expression && node.expression.range) {
    return node.expression.range[index];
  }
  return null;
}

module.exports = {
  locEnd: (node: any) => getRange(1, node),
  locStart: (node: any) => getRange(0, node),
};
