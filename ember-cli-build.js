'use strict';

// const GlimmerApp = require('@glimmer/application-pipeline').GlimmerApp;
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    // Add options here
  });

  return app.toTree();
};
