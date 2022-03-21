// @TODO: add support for assembly language specifier
const InlineAssemblyStatement = {
  print: ({
    path,
    print
  }: any) => ['assembly ', path.call(print, 'body')]
};
// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = InlineAssemblyStatement;
