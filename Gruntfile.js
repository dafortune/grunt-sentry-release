"use strict";

var fs = require("fs");

module.exports = function(grunt) {

  grunt.initConfig({
    grunt_sentry_release: {
      test: {
        apiKey: process.env.SENTRY_API_KEY,
        organization: 'fortune',
        project: 'test',
        version: '1.0.0',
        files: { src: ['./test/fixture/release.test'] },
        resultName: function(file) {
          return file;
        }
      }
    }
  });

  grunt.loadTasks('tasks');
};
