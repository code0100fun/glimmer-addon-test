'use strict';

const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');
const writePackageJSON = require('./write-package-json');
const writeLicense = require('./write-license');

module.exports = function buildAddon(jsTree) {
  // Filter out test files
  jsTree = funnel(jsTree, {
    exclude: ['**/test/**']
  });

  let srcFiles = build({ name: 'glimmer-addon-test', srcDir: '.' });

  return merge(srcFiles, { overwrite: true });

  function build(pkg) {
    return [
      writePackageJSON(),
      writeLicense('LICENSE'),
      copyESModules(pkg, 'es2017', jsTree),
      copyTypes(pkg, jsTree),
    ];
  }
}

function copyESModules(pkg, target, source) {
  return funnel(source, {
    srcDir: pkg.srcDir,
    destDir: `modules/${target}/`,
    exclude: ['**/*.d.ts']
  });
}

function copyTypes(pkg, source) {
  return funnel(source, {
    srcDir: pkg.srcDir,
    include: ['**/*.d.ts'],
    destDir: `types`
  });
}
