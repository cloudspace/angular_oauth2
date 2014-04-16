oauth2.provider('OAuthApi', function OAuthApiProvider($httpProvider) {

    var domain = '';
    var accessToken;

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

    this.domain = function(d) {
        if (d != null) {
            domain = d;
            return this;
        }
        return domain;
    };

    $httpProvider.interceptors.push(function() {
        return {
            request: function(config) {
                // If this is a request to the API,
                // add our Auth Bearer header
                if (domainRegex().test(config.url) && accessToken) {
                    var headers = config.headers || (config.headers = {});
                    headers.Authorization = 'Bearer ' + accessToken;
                }
                return config;
            }
        };
    });
});
