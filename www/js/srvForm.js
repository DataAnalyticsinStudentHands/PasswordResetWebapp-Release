/**
 * Created by Carl on 1/15/2015.
 */

var fbService = angular.module('passwordResetServiceModule', []);

fbService.factory('userService', ['Restangular', '$q', '$filter', function(Restangular, $q, $filter) {
    return {
        getRestangular:
            function(){
                return Restangular.withConfig(function(RestangularConfigurer) {
                    RestangularConfigurer.setBaseUrl('http://localhost:8080/RESTFUL-WS');
                    //RestangularConfigurer.setBaseUrl('https://www.housuggest.com:8443/RESTFUL-WS');
                });
            },
        sendTokenRequest:
            function(username) {
                return this.getRestangular().all("users").all(username).get("forgotPassword");
            },
        sendPasswordReset:
            function(token, uid, password){
                var data_encoded = $.param({token: token, password: password});
                return this.getRestangular().all("users").all(uid).one("tokenPasswordReset").customPOST(
                    data_encoded,
                    null, // put your path here
                    null, // params here, e.g. {format: "json"}
                    {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}
                );
            },
        verifyToken:
            function(token, uid) {
                return this.getRestangular().all("users").all(uid).one("tokenValidation").get({token: token});
            }
    }
}]);