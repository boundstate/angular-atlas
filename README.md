# Angular Atlas

An AngularJS wrapper for the Atlas feedback, metric, and PDF services.

[![Build Status](https://travis-ci.org/boundstate/angular-atlas.svg)](https://travis-ci.org/boundstate/angular-atlas)

## Installation

Include `angular-atlas.js` (and `stacktrace.js` if you want to log errors with stack traces) in your HTML:

    <script src="stacktrace.js"></script>
    <script src="angular-atlas.js"></script>

Then load the module in your application by adding it as a dependent module:

    angular.module('app', ['boundstate.atlas']);
    
## Usage

Configure your app id (and the Atlas service base URL if necessary) and log exceptions:

    .config(function ($provide, atlasProvider) {
      atlasProvider.setBaseUrl('https://atlas.boundstatesoftware.com');
      atlasProvider.setAppId('my-app');
      
      // Log exceptions to Atlas (optional)
      $provide.decorator('$exceptionHandler', ['$delegate', 'atlas', function($delegate, atlas) {
        return function(exception, cause) {
          $delegate(exception, cause);
          atlas.logException(exception, cause);
        };
      }]);
    })
    
Embed the feedback form:
 
    .run(function (atlas) {
      atlas.embedFeedbackForm();
    })
    
Record metrics:

    atlas.recordMetric({
      category: 'assessment',
      action: 'download',
      value: '1',
      dimensions: {
        foo: 'bar'
      }
    })
    
Generate a PDF:

    atlas.generatePdf({
      filename: 'foo.pdf',
      html: $document[0].body.innerHTML,
      base_url: window.location.href.split('#')[0],
      stylesheets: 'http://example.com/stylesheet.css',
      footer_text: 'bar'
    })
