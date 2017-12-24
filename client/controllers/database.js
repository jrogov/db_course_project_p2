var myApp = angular.module('myApp')

myApp.controller('DatabaseController', 
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