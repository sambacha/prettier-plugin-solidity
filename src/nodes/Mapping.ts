const Mapping = {
  print: ({
    path,
    print
  }: any) => [
    'mapping(',
    path.call(print, 'keyType'),
    ' => ',
    path.call(print, 'valueType'),
    ')'
  ]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = Mapping;
