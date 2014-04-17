'use strict';

describe('Provider: OAuth2.OAuth2Api', function () {

    var OAuth2ApiProvider;
    // load the service's module
    beforeEach(module('OAuth2', function(_OAuth2ApiProvider_) {
        OAuth2ApiProvider = _OAuth2ApiProvider_;
    }));

    // instantiate service
    var OAuth2Api, $rootScope, $http, $httpBackend;
    beforeEach(inject(function (_OAuth2Api_, _$http_, _$httpBackend_) {
        OAuth2Api = _OAuth2Api_;
        $http = _$http_;
        $httpBackend = _$httpBackend_;
    }));

    describe('can configure', function() {
        it('.loginPath', function() {
            OAuth2ApiProvider.domain('test.com');
            inject(function($cookieStore) {
                OAuth2Api = new OAuth2ApiProvider.$get($cookieStore);
            });
            expect(OAuth2Api.domain).toEqual('test.com');
        });
    });

    describe('oauth tokens', function() {
        function setCookie(fn) {
            inject(function($cookieStore) {
                fn($cookieStore);
                OAuth2Api = new OAuth2ApiProvider.$get($cookieStore);
            });
        }

        it('pulls accessToken from cookies', function() {
            setCookie(function($cookieStore) {
                $cookieStore.put('accessToken', 'gobbledygook');
            });
            expect(OAuth2Api.accessToken).toEqual('gobbledygook');
        });
    });
});
