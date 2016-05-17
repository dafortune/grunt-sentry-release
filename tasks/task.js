'use strict';

var client = require('./client');

module.exports = function gruntSentryRelease(grunt) {

  var gruntSentryReleaseTask = function gruntSentryReleaseTask() {
    var done = this.async();

    client.releases.upsert({
      apiKey: this.data.apiKey,
      organization: this.data.organization,
      project: this.data.project,
      version: this.data.version,
      files: this.filesSrc,
      resultName: this.data.resultName
    })
    .asCallback(done);
  };

  grunt.registerMultiTask('grunt_sentry_release', 'Release to sentry', gruntSentryReleaseTask);
};
