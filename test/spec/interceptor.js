'use strict';

describe('Service: OAuth2.Interceptor', function () {

    // load the service's module
    beforeEach(module('OAuth2'));

    var OAuth2Api, $http, $httpBackend;
    beforeEach(inject(function(_$http_, _$httpBackend_, _OAuth2Api_) {
        $http = _$http_;
        $httpBackend = _$httpBackend_;
        OAuth2Api = _OAuth2Api_;
    }));

    describe('request', function() {
        var accessToken = 'gobbledygook';
        var api_headers = {};
        var test_headers = {};
        beforeEach(function() {
            api_headers = test_headers = {};
            OAuth2Api.domain = 'api.com';
        });

        describe('when accessToken is present', function() {
            beforeEach(function() {
                OAuth2Api.accessToken = accessToken;
            });

            it('can set other api protocol', function() {
                OAuth2Api.domain = 'http://api.com';
                $httpBackend.expect('GET', 'http://api.com/', undefined, function(headers) {
                    return headers.Authorization = 'Bearer ' + accessToken;
                }).respond(200);

                $http.get('http://api.com/');
                $httpBackend.flush();
            });

            describe('when requesting the api domain', function() {
                beforeEach(function() {
                    $httpBackend.expect('GET', 'https://api.com/', undefined, function(headers) {
                        api_headers = headers;
                        return true;
                    }).respond(200);
                });

                it('defaults to https protocol', function() {
                    $http.get('https://api.com/');
                    $httpBackend.flush();

                    expect(api_headers.Authorization).not.toBe(undefined);
                });

                it('sets Auth Bearer header', function() {
                    $http.get('https://api.com/');
                    $httpBackend.flush();

                    expect(api_headers.Authorization).toEqual('Bearer ' + accessToken);
                });
            });

            describe('when not requesting the api domain', function() {
                beforeEach(function() {
                    $httpBackend.expect('GET', 'https://test.com/', undefined, function(headers) {
                        test_headers = headers;
                        return true;
                    }).respond(200);
                });

                it('does not set Auth Bearer header', function() {
                    $http.get('https://test.com/');
                    $httpBackend.flush();

                    expect(test_headers.Authorization).toBe(undefined);
                });
            });
        });

        describe('when accessToken is not present', function() {
            beforeEach(function() {
                OAuth2Api.accessToken = null;
                $httpBackend.expect('GET', 'https://api.com/', undefined, function(headers) {
                    api_headers = headers;
                    return true;
                }).respond(200);
            });

            it('does not set Auth Bearer header', function() {
                $http.get('https://api.com/');
                $httpBackend.flush();

                expect(api_headers.Authorization).toBe(undefined);
            });
        });
    });
});
