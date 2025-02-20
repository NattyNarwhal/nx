import {
  joinPathFragments,
  offsetFromRoot,
  Tree,
  updateJson,
} from '@nrwl/devkit';
import { NormalizedSchema } from './normalized-schema';

export function updateNgPackage(
  host: Tree,
  options: NormalizedSchema['libraryOptions']
) {
  if (!(options.publishable || options.buildable)) {
    return;
  }

  const dest = joinPathFragments(
    offsetFromRoot(options.projectRoot),
    'dist',
    options.projectRoot
  );

  updateJson(host, `${options.projectRoot}/ng-package.json`, (json) => {
    let $schema = json.$schema;
    if (json.$schema && json.$schema.indexOf('node_modules') >= 0) {
      $schema = `${offsetFromRoot(options.projectRoot)}${json.$schema.substring(
        json.$schema.indexOf('node_modules'),
        json.$schema.length
      )}`;
    }
    return {
      ...json,
      dest,
      $schema,
    };
  });
}
