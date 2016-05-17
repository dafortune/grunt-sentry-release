'use strict';

var fs = require('fs');
var Promise = require('bluebird');
var Sentry = require('sentry-api').Client;

var releases = exports.releases = {};

/**
  Upsert release

  @param {string} data.apiKey
  @param {string} data.organization
  @param {string} data.project
  @param {string} data.version
  @param {array.<string>} data.files
  @param {function(fileName)} data.resultName
*/
releases.upsert = function upsertRelease(data) {
  var apiKey = data.apiKey;
  var organization = data.organization;
  var project = data.project;
  var version = data.version;
  var files = data.files;
  var resultName = data.resultName;

  var sentry = new Sentry('https://' + apiKey + '@app.getsentry.com');

  return Promise.resolve(sentry.releases.get(organization, project, version))
    .then(function() {
      return sentry.releases.files(organization, project, version);
    })
    .catch(function(err) {
      return sentry.releases.create(organization, project, {
        version: version,
        ref: version,
      })
      .then(function() {
        return [];
      });
    })
    .then(function(existingFiles) {

      var uploads = files.map(function(file) {
        var rName = resultName(file);

        var existingFile = existingFiles.find(function(existingFile) { return existingFile.name === rName; });

        var stream = fs.createReadStream(file);
        var promise;

        if (existingFile) {
          promise = sentry.releases.deleteFile(organization, project, version, existingFile.id);
        } else {
          promise = Promise.resolve();
        }

        return promise.then(function() {
          return sentry.releases.createFile(organization, project, version, { name: rName, file: stream });
        });
      });

      return Promise.all(uploads);
    });
};
