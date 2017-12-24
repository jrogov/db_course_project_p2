var myApp = angular.module('myApp')

myApp.controller('PurchaseController', 
    [ 
        '$scope', 
        '$http', 
        '$location', 
        '$routeParams', 
    function($scope, $http, $location, $routeParams) {
        console.log('PurchaseController loaded');

        /*logic here*/
    }
]);