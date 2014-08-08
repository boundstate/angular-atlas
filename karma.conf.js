// Karma configuration
module.exports = function (config) {
  config.set({

    frameworks: ['jasmine'],

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'angular-atlas.js',
      '*.spec.js'
    ],

    preprocessors: {
      'angular-text.js': ['coverage']
    },

    reporters: ['progress', 'coverage'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ]
  });
};