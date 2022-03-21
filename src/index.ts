import {handleComments, printComment} from './comments';
import massageAstNode from './clean';
import loc from './loc';

import options from './options';
import parse from './parser';
import print from './printer';

// https://prettier.io/docs/en/plugins.html#languages
// https://github.com/ikatyang/linguist-languages/blob/master/data/Solidity.json
const languages = [
  {
    linguistLanguageId: 237469032,
    name: 'Solidity',
    type: 'programming',
    color: '#AA6746',
    aceMode: 'text',
    tmScope: 'source.solidity',
    extensions: ['.sol'],
    parsers: ['solidity-parse'],
    vscodeLanguageIds: ['solidity'],
  },
];

// https://prettier.io/docs/en/plugins.html#parsers

const parser = {astFormat: 'solidity-ast', parse, ...loc};
const parsers = {
  'solidity-parse': parser,
};

const canAttachComment = (node: any) =>
  node.type && node.type !== 'BlockComment' && node.type !== 'LineComment';

// https://prettier.io/docs/en/plugins.html#printers

const printers = {
  'solidity-ast': {
    canAttachComment,
    handleComments: {
      ownLine: handleComments.handleOwnLineComment,
      endOfLine: handleComments.handleEndOfLineComment,
      remaining: handleComments.handleRemainingComment,
    },
    isBlockComment: handleComments.isBlockComment,
    massageAstNode,
    print,
    printComment,
  },
};

// https://prettier.io/docs/en/plugins.html#defaultoptions
const defaultOptions = {
  bracketSpacing: false,
  tabWidth: 4,
};

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = {
  languages,
  parsers,
  printers,
  options,
  defaultOptions,
};
