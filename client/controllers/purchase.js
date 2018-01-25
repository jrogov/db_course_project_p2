var myApp = angular.module('myApp')

myApp.controller('PurchaseController',
    [
        '$scope',
        '$http',
        '$location',
        '$window',
        '$routeParams',
    function($scope, $http, $location, $window, $routeParams) {
        console.log('PurchaseController loaded');

//-------------------------------ROUTE FUNCTIONS--------------------------------

        $scope.openShopProfile = function(id){
            $location.url('/shops/'+id);
        }

        $scope.openProductProfile = function(id){
            $location.url('/products/'+id);
        }

        $scope.openCassierProfile = function(id){
            $location.url('/employees/'+id);
        }

        $scope.openAddPurchase = function(){
            $location.url('/purchases/add');
        }

        $scope.openPurchaseProfile = function(id){
            $location.url('/purchases/'+id);
            console.log(id);
        }

        $scope.openSupplierProfile = function(id){
            $location.url('/suppliers/'+id);
            console.log(id);
        }

//-------------------------------API CALL FUNCTIONS-----------------------------

        $scope.getPurchases = function(){
            $http.get(api('/purchase/')).then(
            response => {
                console.log(response.data)
                p = response.data;
                for( i in p ){
                    p[i]['purchasedate'] = formatDateStr(p[i]['purchasedate'])
                }
                $scope.purchases = p;
            }
            , err => $scope.error = parse_error(err)
            );
        };

        $scope.getPurchase = function(id){
            var id = $routeParams.id
            $http.get(api('/purchase/'+id)).then(
            response => {
                var purchase = response.data;

                console.log(purchase);
                if( purchase.hasOwnProperty('purchasedate') )
                    purchase['purchasedate'] = formatDateStr(purchase['purchasedate']);

                $scope.p = purchase;
                $scope.pm = clone(purchase);
            }
            , err => $scope.error = parse_error(err)
            );
        };

        // $scope.deletePurchase = function(id){
        //     var answer = confirm(
        //         align_center(['Are you sure you want to DELETE', 'Purchase #' + $scope.p._id + '?']));
        //     if (answer) {
        //         $http.delete(apiurl+'/purchase/'+id).then(
        //             a => $location.url('/purchases'));
        //     }
        // }

    }
]);