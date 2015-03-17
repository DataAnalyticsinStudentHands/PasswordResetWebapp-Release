'use strict';

/* App Module */

var passwordResetModule = angular.module('databaseModule', [
    'passwordResetControllerModule',
    'passwordResetServiceModule',
    'databaseServicesModule',
    'restangular',
    'ui.router',
    'ngSanitize',
    'ngNotify'
]);

passwordResetModule.config(
    function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/requestReset/");
        $stateProvider.
            state('requestReset', {
                url: "/requestReset/:ws",
                views: {
                    "app": { templateUrl: "partials/requestReset.html", controller: "requestResetCtrl"}
                },
                authenticate: false
            }).
            state('message', {
                url: "/message/:message",
                views: {
                    "app": { templateUrl: "partials/message.html", controller: "messageCtrl"}
                },
                authenticate: false
            }).
            state('resetPassword', {
                url: "/resetPassword/uid/:uid/token/:token/uin/:uin/ws/:ws",
                views: {
                    "app": { templateUrl: "partials/resetPassword.html", controller: "resetPasswordCtrl"}
                },
                resolve: {
                    validity: function(userService, $stateParams, $state){
                        return userService.verifyToken($stateParams.token, $stateParams.uid, $stateParams.ws).then(function(success){
                            return success;
                        }, function(){
                            $state.go('message', {message: "Invalid URL"});
                        });
                    }
                },
                authenticate: false
            });
    });

passwordResetModule.run(['Restangular', '$rootScope', 'Auth',
    function(Restangular, $rootScope, Auth) {
        Auth.setCredentials("Visitor", "test");

        $rootScope.$on("$stateChangeStart", function(event, toState){
            $('body').removeClass('loaded');
            Auth.setCredentials("Visitor", "test");
        });

        $rootScope.$on("$stateChangeSuccess", function(){
            $('body').addClass('loaded');
        });

        $rootScope.$on("$stateChangeError", function(){
            $('body').addClass('loaded');
        });
    }]);
