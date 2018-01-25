var myApp = angular.module('myApp')

myApp.controller('ProductController',
    [
        '$scope',
        '$http',
        '$location',
        '$window',
        '$routeParams',
    function($scope, $http, $location, $window, $routeParams) {
        console.log('ProductController loaded');

//-------------------------------ROUTE FUNCTIONS--------------------------------

        $scope.openAddProduct = function(){
            $location.url('/products/add');
        }

        $scope.openProductProfile = function(id){
            $location.url('/products/'+id);
        }

        $scope.openSupplierProfile = function(id){
            $location.url('/suppliers/'+id);
        }

//-------------------------------API CALL FUNCTIONS-----------------------------

        $scope.getProducts = function(){
            $http.get(apiurl+'/product').then(
            response => {
                console.log(response.data)
                $scope.products = response.data;
            }
            , err => $scope.error = parse_error(err)
            );
        };

        $scope.getProduct = function(id){
            var id = $routeParams.id
            $http.get(apiurl+'/product/'+id).then(
            response => {
                var product = response.data;
                console.log(product);

                product['shelfLife'] = product['shelfLife'] / (1000*60*60*24);
                $scope.p = product;
                $scope.pm = clone(product);
            }
            , err => $scope.error = parse_error(err)
            );
        };

        $scope.deleteProduct = function(id){
            var answer = confirm(
                align_center(['Are you sure you want to DELETE', $scope.p.name + '?']));
            if (answer) {
                $http.delete(apiurl+'/product/'+id).then(
                    a => $location.url('/products'));
            }
        }

        $scope.addProduct = function(){
            // console.log("Update!");

            console.log($scope);

            var p = clone($scope.p)

            if( p.hasOwnProperty('shelfLife') )
                p['shelfLife'] = p['shelfLife'] * (1000*60*60*24)

            $http.post(
                apiurl+'/product/',
                p
            ).then(
                a => {
                    if( a.data.hasOwnProperty('_id') )
                        $location.url('/products/'+a.data._id)
                    else
                        $location.url('/products/');
                },
                err => $scope.error = parse_error(err)
            );

        }

        $scope.updateProduct = function(){
            // console.log("Update!");

            var ans = confirm(align_center(['Are you sure you want to UPDATE', $scope.p.name + "?"]));
            if( !ans) return;

            var p = clone($scope.pm)

            if( p.hasOwnProperty('shelfLife') )
                p['shelfLife'] = p['shelfLife'] * (1000*60*60*24)

            $http.put(
                apiurl+'/product/'+p._id,
                p
            ).then(
                a => $window.location.reload(),
                err => $scope.error = parse_error(err)
            );

        }

    }
]);


