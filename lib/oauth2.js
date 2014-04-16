'use strict';
(function (angular) {
  var oauth2 = angular.module('OAuth2', ['ngCookies']);
  oauth2.provider('OAuth2Api', [
    '$httpProvider',
    function OAuthApiProvider($httpProvider) {
      var domain = '';
      var service = { accessToken: null };
      function hasProtocol(url) {
        return url.indexOf('http') === 0;
      }
      function domainRegex() {
        // If domain starts with "http",
        // assume dev put the protocol in.
        var prefix = '';
        if (!hasProtocol(domain)) {
          prefix = 'https://';
        }
        // If domain is blank,
        // create a regex which will NEVER match
        if (!domain.length) {
          prefix = '$.';
        }
        return new RegExp('^' + prefix + domain);
      }
      this.domain = function (d) {
        if (d != null) {
          domain = d;
          return this;
        }
        return domain;
      };
      this.$get = function () {
        return service;
      };
      $httpProvider.interceptors.push(function ($cookieStore) {
        service.accessToken = $cookieStore.get('accessToken');
        service.refreshToken = $cookieStore.get('refreshToken');
        return {
          request: function (config) {
            // If this is a request to the API,
            // add our Auth Bearer header
            if (domainRegex().test(config.url) && service.accessToken) {
              var headers = config.headers || (config.headers = {});
              headers.Authorization = 'Bearer ' + service.accessToken;
            }
            return config;
          }
        };
      });
    }
  ]);
}(angular));