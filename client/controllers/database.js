var fiveyApp = angular.module('fiveyApp')

fiveyApp.controller('DatabaseController', 
    [ 
        '$scope', 
        '$http', 
        '$location', 
        '$routeParams', 
    function($scope, $http, $location, $routeParams) {
        console.log('DatabaseController loaded');

        /*logic here*/
    }
]);