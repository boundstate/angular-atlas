angular.module('boundstate.atlas', [])

.provider('atlas', function AtlasProvider () {
  var _baseUrl = 'https://atlas.boundstatesoftware.com';
  var _appId;

  this.setBaseUrl = function (baseUrl) {
    _baseUrl = baseUrl;
  };

  this.setAppId = function (appId) {
    _appId = appId;
  };

  this.$get = ['$window', '$http', '$document', function ($window, $http, $document) {

    var submitForm = function (url, params) {
      var form = $document[0].createElement('form');
      form.style.display = 'none';
      $document[0].body.appendChild(form);
      form.setAttribute('method', 'POST');
      if (url !== '') {
        form.setAttribute('action', url);
      }
      var inputs = [];
      angular.forEach(params, function(value, name) {
        var input = $document[0].createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", name);
        input.setAttribute("value", value);
        form.appendChild(input);
        inputs.push(input);
      });
      form.submit();
      angular.forEach(inputs, function(input) {
        form.removeChild(input);
      });
    };

    return {
      embedFeedbackForm: function () {
        var f = $window.document.createElement('script');
        f.type = 'text/javascript';
        f.async = true;
        f.src = _baseUrl + '/feedback/widget?app_id=' + _appId;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(f, s);
      },
      recordMetric: function (data) {
        data.app_id = _appId;
        $http.post(_baseUrl + '/metrics', data);
      },
      generatePdf: function (options) {
        submitForm(_baseUrl + '/html-converter/pdf', options);
      }
    };
  }];
})

;