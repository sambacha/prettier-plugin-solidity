// eslint-disable-next-line no-unused-vars
function clean(ast: any, newObj: any, parent: any) {
  ['code', 'codeStart', 'loc', 'range', 'raw'].forEach((name) => {
    delete newObj[name]; // eslint-disable-line no-param-reassign
  });
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = clean;
