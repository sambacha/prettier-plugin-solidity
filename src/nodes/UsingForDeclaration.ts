const UsingForDeclaration = {
  print: ({
    node,
    path,
    print
  }: any) => [
    'using ',
    node.libraryName,
    ' for ',
    node.typeName ? path.call(print, 'typeName') : '*',
    ';'
  ]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = UsingForDeclaration;
