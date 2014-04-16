// AngularOAuth2
// -------------------
// v0.0.1
//
// Copyright (c)2014 Justin Ridgewell
// Distributed under MIT license
//
// https://github.com/cloudspace/angular_oauth2

"use strict";!function(a){var b=a.module("OAuth2",["ngCookies"]);b.provider("OAuth2Api",["$httpProvider",function(a){function b(a){return 0===a.indexOf("http")}function c(){var a="";return b(d)||(a="https://"),d.length||(a="$."),new RegExp("^"+a+d)}var d="",e={accessToken:null};this.domain=function(a){return null!=a?(d=a,this):d},this.$get=function(){return e},a.interceptors.push(function(a){return e.accessToken=a.get("accessToken"),e.refreshToken=a.get("refreshToken"),{request:function(a){if(c().test(a.url)&&e.accessToken){var b=a.headers||(a.headers={});b.Authorization="Bearer "+e.accessToken}return a}}})}])}(angular);