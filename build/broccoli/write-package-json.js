'use strict';

const path = require('path');
const Filter = require('broccoli-persistent-filter');
const funnel = require('broccoli-funnel');

const PACKAGE_JSON_FIELDS = {
  "module": "modules/es2017/index.js",
  "typings": "types/index.d.ts",
};

class PackageJSONWriter extends Filter {
  canProcessFile(relativePath) {
    return path.basename(relativePath) === 'package.json';
  }

  processString(string) {
    let pkg = JSON.parse(string);
    Object.assign(pkg, PACKAGE_JSON_FIELDS);
    return JSON.stringify(pkg, null, 2);
  }
}

module.exports = function rewritePackageJSON() {
  let tree = funnel('.', {
    include: ['package.json']
  });

  return new PackageJSONWriter(tree);
}
