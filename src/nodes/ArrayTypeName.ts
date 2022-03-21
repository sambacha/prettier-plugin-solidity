const ArrayTypeName = {
  print: ({node, path, print}: any) => [
    path.call(print, 'baseTypeName'),
    '[',
    node.length ? path.call(print, 'length') : '',
    ']',
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = ArrayTypeName;
