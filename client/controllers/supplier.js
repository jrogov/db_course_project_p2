var fiveyApp = angular.module('fiveyApp')

fiveyApp.controller('SupplierController', 
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