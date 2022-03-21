// eslint-disable-next-line no-unused-vars
function clean(ast: any, newObj: any, parent: any) {
  ['code', 'codeStart', 'loc', 'range', 'raw'].forEach(name => {
    delete newObj[name]; // eslint-disable-line no-param-reassign
  });
}

export default clean;
