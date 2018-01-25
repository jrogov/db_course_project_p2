var myApp = angular.module('myApp')

myApp.controller('StockchangeController',
    [
        '$scope',
        '$http',
        '$location',
        '$window',
        '$routeParams',
    function($scope, $http, $location, $window, $routeParams) {
        console.log('StockChangeController loaded');

//-------------------------------ROUTE FUNCTIONS--------------------------------

        $scope.openShopProfile = function(id){
            $location.url('/shops/'+id);
        }

        $scope.openProductProfile = function(id){
            $location.url('/products/'+id)
        }

        $scope.openCassierProfile = function(id){
            $location.url('/employees/'+id);
        }

        $scope.openAddStockChange = function(){
            $location.url('/stockchanges/add');
        }

        $scope.openStockChangeProfile = function(id){
            $location.url('/stockchanges/'+id);
            console.log(id);
        }

        $scope.openSupplierProfile = function(id){
            $location.url('/suppliers/'+id);
            console.log(id);
        }

//-------------------------------API CALL FUNCTIONS-----------------------------

        $scope.getStockChanges = function(){
            $http.get(apiurl+'/stockchange').then(
            response => {
                console.log(response.data)
                p = response.data;
                for( i in p ){
                    p[i]['arrivaldate'] = formatDateStr(p[i]['arrivaldate'])
                }
                $scope.stockchanges = p;
            }
            , err => { console.log(err); }
            );
        };

        $scope.getStockChange = function(id){
            var id = $routeParams.id
            $http.get(apiurl+'/stockchange/'+id).then(
            response => {
                var stockchange = response.data;

                console.log(stockchange);
                stockchange['arrivaldate'] = formatDateStr(stockchange['arrivaldate']);

                $scope.sc = stockchange;
                $scope.scm = clone(stockchange);
            }
            , err => {
                console.log(err);
                $location.url('/stockchanges/');
                }
            );
        };

        // $scope.deleteStockChange = function(id){
        //     var answer = confirm(
        //         align_center(['Are you sure you want to DELETE', 'StockChange #' + $scope.p._id + '?']));
        //     if (answer) {
        //         $http.delete(apiurl+'/stockchange/'+id).then(
        //             a => $location.url('/stockchanges'));
        //     }
        // }

    }
]);