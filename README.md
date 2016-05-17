Grunt Sentry release
====================

## Getting Started
This plugin requires Grunt `>=1.0.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sentry-release --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sentry-release');
```

## Overview
This Grunt plugin uses [Sentry Release API](https://docs.getsentry.com/hosted/api/releases/) to publish releases from a Grunt task.

## Usage

```
  grunt.initConfig({
    grunt_sentry_release: {
      test: {
        // API Key: required scopes project:read, project:write, project:delete
        apiKey: '{api-key}',

        // Organization slug
        organization: '{organization}',

        // Project slug
        project: '{project}',

        // Version string
        version: '{version}',

        // Array of files to use
        files: { src: [...] },

        // Returns name for file in Sentry
        resultName: function(fileName) {
          ...
        }
      }
    }
  });
```

## Example

```
  grunt.initConfig({
    grunt_sentry_release: {
      test: {
        apiKey: '...',
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
```
## TODO
[  ] Add tests
