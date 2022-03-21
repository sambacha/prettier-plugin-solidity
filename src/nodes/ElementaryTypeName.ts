// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'stateMutab... Remove this comment to see the full error message
const stateMutability = (node: any) => node.stateMutability && node.stateMutability.length > 0
  ? [' ', node.stateMutability]
  : '';

const ElementaryTypeName = {
  print: ({
    node
  }: any) => [node.name, stateMutability(node)]
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = ElementaryTypeName;
