# Angular Atlas

An AngularJS wrapper for the Atlas feedback, metric, and PDF services.

## Installation

Include `angular-atlas.js` in your HTML:

    <script src="angular-atlas.js">
    
Then load the module in your application by adding it as a dependent module:

    angular.module('app', ['boundstate.atlas']);
    
## Usage

Configure your app id (and the Atlas service base URL if necessary):

    .config(function (atlasProvider) {
      atlasProvider.setBaseUrl('https://atlas.boundstatesoftware.com');
      atlasProvider.setAppId('my-app');
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