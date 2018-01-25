var myApp = angular.module('myApp')

myApp.controller('ShopController',
    [
        '$scope',
        '$http',
        '$location',
        '$window',
        '$routeParams',
    function($scope, $http, $location, $window, $routeParams) {
        console.log('ShopController loaded');

//-------------------------------ROUTE FUNCTIONS--------------------------------

        $scope.openShopProfile = function(id){
            $location.url('/shops/'+id);
            console.log(id);
        }

        $scope.openAddShop = function(id){
            $location.url('/shops/add')
        }

//-------------------------------EXTERNAL ROUTES------------------------------

        $scope.callPhone = function(phone){
            $window.open('tel:'+phone)
        }

        $scope.openEmail = function(email){
            $window.open('mailto:'+email)
        }

//-------------------------------API CALL FUNCTIONS-----------------------------


        $scope.getShops = function(){
            $http.get(api('/shop')).then(
            response => {
                console.log(response.data)
                $scope.shops = response.data;
            }
            , err => { console.log(err); }
            );
        };

        $scope.getShop = function(id){
            var id = $routeParams.id
            $http.get(api('/shop/'+id)).then(
            response => {
                var shop = response.data;

                // convert to days

                // [ 'days', 'months', 'years', 'centuries' ]
                shop['shelfLife'] = shop['shelfLife'] / (1000*60*60*24);
                $scope.s = shop;
                $scope.sm = $.extend(true, {}, shop);
            }
            , err => {
                console.log(err);
                $location.url('/shops/');
                }
            );
        };

        $scope.addShop = function(id){
            var s = $scope.s;
            $http.post(
                api('/shop'),
                s).
            then(
                a => {
                    if( a.data.hasOwnProperty('_id') )
                        $location.url('/shops/'+a.data._id)
                    else
                        $location.url('/shops/');
                },
                err => $scope.error = parse_error(err)
            );
        }

        $scope.deleteShop = function(id){
            var answer = confirm(
                align_center(['Are you sure you want to DELETE', $scope.s.name + '?']));
            if (answer) {
                $http.delete(api('/shop/'+id)).then(
                    a => $location.url('/shops'));
            }
        }

        $scope.updateShop = function(){
            var ans = confirm(
                align_center(
                    [
                        'Are you sure you want to UPDATE',
                            $scope.s.name + "?"
                    ]));
            if( !ans) return;

            $http.put(
                apiurl+'/shop/'+$scope.s._id,
                $scope.sm
            ).then(
                a => $window.location.reload(),
                err => $scope.error = parse_error(err)
            )

        }
    }
]);