var myApp = angular.module('myApp')

myApp.controller('StockchangeController', 
    [ 
        '$scope', 
        '$http', 
        '$location', 
        '$routeParams', 
    function($scope, $http, $location, $routeParams) {
        console.log('StockchangeController loaded');

        /*logic here*/
    }
]);