oauth2.factory('OAuth2Interceptor', function(OAuth2Api) {
    function hasProtocol(url) {
        return url.indexOf('http') === 0;
    }
    function domainRegex(domain) {
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

    return {
        request: function(config) {
            // If this is a request to the API,
            // add our Auth Bearer header
            if (domainRegex(OAuth2Api.domain).test(config.url) && OAuth2Api.accessToken) {
                var headers = config.headers || (config.headers = {});
                headers.Authorization = 'Bearer ' + OAuth2Api.accessToken;
            }
            return config;
        }
    };
}).config(function($httpProvider) {
    $httpProvider.interceptors.push('OAuth2Interceptor');
});
