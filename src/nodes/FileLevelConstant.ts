const FileLevelConstant = {
  print: ({node, path, print}: any) => [
    path.call(print, 'typeName'),
    ' constant ',
    node.name,
    ' = ',
    path.call(print, 'initialValue'),
    ';',
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = FileLevelConstant;
