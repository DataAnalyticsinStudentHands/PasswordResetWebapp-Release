/**
 * Created by Carl on 1/15/2015.
 */

var fbService = angular.module('passwordResetServiceModule', []);

fbService.factory('userService', ['Restangular', '$q', '$filter', function(Restangular, $q, $filter) {
    return {
        getRestangular:
            function(ws){
                return Restangular.withConfig(function(RestangularConfigurer) {
                    switch(ws){
                        case "local_test":
                            return RestangularConfigurer.setBaseUrl('http://localhost:8080/RESTFUL-WS');
                            break;
                        default:
                            return RestangularConfigurer.setBaseUrl('https://housuggest.org:8443/'+ws);
                            break;
                    }
                });
            },
        sendTokenRequest:
            function(username, ws) {
                return this.getRestangular(ws).all("users").all(username).get("forgotPassword");
            },
        sendPasswordReset:
            function(token, uid, password, ws){
                var data_encoded = $.param({token: token, password: password});
                return this.getRestangular(ws).all("users").all(uid).one("tokenPasswordReset").customPOST(
                    data_encoded,
                    null, // put your path here
                    null, // params here, e.g. {format: "json"}
                    {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"}
                );
            },
        verifyToken:
            function(token, uid, ws) {
                return this.getRestangular(ws).all("users").all(uid).one("tokenValidation").get({token: token});
            },
        activate:
            function(token, uid, ws) {
                return this.getRestangular(ws).all("users").all(uid).one("tokenValidation").get({token: token});
            }
    }
}]);