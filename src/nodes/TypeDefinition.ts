const TypeDefinition = {
  print: ({node}: any) => [
    'type ',
    node.name,
    ' is ',
    node.definition.name,
    ';',
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = TypeDefinition;
