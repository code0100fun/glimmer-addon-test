/*jshint node:true*/

const merge = require('broccoli-merge-trees');
const funnel = require('broccoli-funnel');
const { typescript } = require('broccoli-typescript-compiler');

const buildAddon = require('./build/broccoli/build-addon.js');
const mergeDefinitionFiles = require('./build/broccoli/merge-definition-files');
const GlimmerTemplatePrecompiler = require('ember-build-utilities').GlimmerTemplatePrecompiler;

const PRODUCTION = process.env.EMBER_ENV === 'production';

module.exports = function(_options) {
  let tsTree = funnel('src/', {
    destDir: 'src/',
    exclude: ['**/node_modules/**']
  });

  let jsTree = typescript(tsTree);

  jsTree = mergeDefinitionFiles(tsTree, jsTree);

  let templates = funnel(tsTree, {
    srcDir: 'src/',
    include: ['**/*.hbs']
  });

  let compiledTemplates = new GlimmerTemplatePrecompiler(templates, {
    rootName: '-application'
  });
  compiledTemplates.targetExtension = 'js';

  jsTree = merge([compiledTemplates, jsTree]);

  let packagesTree = buildAddon(jsTree);

  return merge([packagesTree]);
}
