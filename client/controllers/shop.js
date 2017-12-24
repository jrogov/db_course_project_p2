var myApp = angular.module('myApp')

myApp.controller('ShopController', 
    [ 
        '$scope', 
        '$http', 
        '$location', 
        '$routeParams', 
    function($scope, $http, $location, $routeParams) {
        console.log('ShopController loaded');

        /*logic here*/
    }
]);