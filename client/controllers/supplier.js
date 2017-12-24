var myApp = angular.module('myApp')

myApp.controller('SupplierController', 
    [ 
        '$scope', 
        '$http', 
        '$location', 
        '$routeParams', 
    function($scope, $http, $location, $routeParams) {
        console.log('SupplierController loaded');

        /*logic here*/
    }
]);