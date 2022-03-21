const AssemblyCase = {
  print: ({node, path, print}: any) => [
    node.default ? 'default' : ['case ', path.call(print, 'value')],
    ' ',
    path.call(print, 'block'),
  ],
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = AssemblyCase;
