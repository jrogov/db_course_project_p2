var myApp = angular.module('myApp')

myApp.controller('ProductController', 
    [ 
        '$scope', 
        '$http', 
        '$location', 
        '$routeParams', 
    function($scope, $http, $location, $routeParams) {
        console.log('ProductController loaded');

        /*logic here*/
    }
]);