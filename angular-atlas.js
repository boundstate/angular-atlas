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
      var f = $document[0].createElement('form');
      f.style.display = 'none';
      $document.append(f);
      f.method = 'POST';
      if (url !== '') {
        f.action = url;
      }
      var inputs = [];
      angular.forEach(params, function(value, name) {
        var input = $document[0].createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", name);
        input.setAttribute("value", value);
        f.appendChild(input);
        inputs.push(input);
      });
      f.submit();
      angular.forEach(inputs, function(input) {
        f.removeChild(input);
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