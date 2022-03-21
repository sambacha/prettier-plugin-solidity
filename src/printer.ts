import prettier from 'prettier';
import semver from 'semver';
import nodes from './nodes';
import {hasNodeIgnoreComment} from './prettier-comments/common/util';
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'ignoreComm... Remove this comment to see the full error message
import ignoreComments from './comments/ignore';

let checked = false;

function prettierVersionCheck() {
  if (checked) return;
  if (!semver.satisfies(prettier.version, '>=2.3.0')) {
    throw new Error(
      'The version of prettier in your node-modules does not satisfy the required ">=2.3.0" constraint. Please update the version of Prettier.'
    );
  }
  checked = true;
}

function genericPrint(path: any, options: any, print: any) {
  prettierVersionCheck();

  const node = path.getValue();
  if (node === null) {
    return '';
  }

  if (!(node.type in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
  }

  if (hasNodeIgnoreComment(node)) {
    ignoreComments(path);

    return options.originalText.slice(
      options.locStart(node),
      options.locEnd(node) + 1
    );
  }

  return nodes[node.type].print({node, options, path, print});
}

// @ts-expect-error ts-migrate(2580) FIXME: Cannot find name 'module'. Do you need to install ... Remove this comment to see the full error message
module.exports = genericPrint;
