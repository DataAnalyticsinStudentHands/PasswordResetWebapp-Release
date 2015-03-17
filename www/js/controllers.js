'use strict';
/* Controllers */
var formBuilderController = angular.module('passwordResetControllerModule', []);

formBuilderController.controller('requestResetCtrl', ['$scope', 'userService', 'ngNotify',
    function($scope, userService, ngNotify) {
        $scope.submit = function() {
            $('body').removeClass('loaded');
            userService.sendTokenRequest($scope.userName).then(function(data){
                ngNotify.set(data, "success");
                $('body').addClass('loaded');
            }, function(error){
                ngNotify.set(error, "error");
                $('body').addClass('loaded');
            }, function(done){
                $('body').addClass('loaded');
            });
        }
    }]);

formBuilderController.controller('resetPasswordCtrl', ['$scope', '$state', 'Auth', 'ngNotify', '$stateParams', 'validity', 'userService',
    function($scope, $state, Auth, ngNotify, $stateParams, validity, userService) {
        $scope.submit = function() {
            if($scope.pw1 !== $scope.pw2){
                ngNotify.set("Passwords must match!", "error");
            } else {
                $('body').removeClass('loaded');
                var salt = "nfp89gpe";
                var pw = String(CryptoJS.SHA512($scope.pw1 + $stateParams.uin + salt));
                userService.sendPasswordReset($stateParams.token, $stateParams.uid, pw).then(function(success){
                    ngNotify.set(success, "success");
                    $('body').addClass('loaded');
                    $state.go('message', {message: "Password successfully changed!"});
                }, function(fail){
                    ngNotify.set(fail, "error");
                    $state.go('requestReset');
                    $('body').addClass('loaded');
                });
            }
        }
    }]);

formBuilderController.controller('messageCtrl', ['$scope', '$state', 'Auth', 'ngNotify', '$stateParams',
    function($scope, $state, Auth, ngNotify, $stateParams) {
        $scope.message = $stateParams.message;
    }]);