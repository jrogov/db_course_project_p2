var fiveyApp = angular.module('fiveyApp')

fiveyApp.controller('ShopController', 
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