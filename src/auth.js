oauth2.provider('OAuth2Api', function OAuthApiProvider() {

    var domain = '';
    this.domain = function(d) {
        if (d != null) {
            domain = d;
            return this;
        }
        return domain;
    };

    this.$get = function($cookieStore) {
        return {
            domain: domain,
            accessToken: $cookieStore.get('accessToken')
        };
    };
});
