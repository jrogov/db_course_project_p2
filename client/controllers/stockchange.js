var fiveyApp = angular.module('fiveyApp')

fiveyApp.controller('StockchangeController', 
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