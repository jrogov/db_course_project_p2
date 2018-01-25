var myApp = angular.module('myApp')

myApp.controller('SupplierController',
    [
        '$scope',
        '$http',
        '$location',
        '$window',
        '$routeParams',
    function($scope, $http, $location, $window, $routeParams) {
        console.log('SupplierController loaded');

//-------------------------------ROUTE FUNCTIONS--------------------------------

        $scope.openSupplierProfile = function(id){
            $location.url('/suppliers/'+id);
            console.log(id);
        }

        $scope.openAddSupplier = function(){
            $location.url('/suppliers/add')
        }

//-------------------------------EXTERNAL ROUTES------------------------------

        $scope.callPhone = function(phone){
            $window.open('tel:'+phone)
        }

        $scope.openEmail = function(email){
            $window.open('mailto:'+email)
        }

//-------------------------------API CALL FUNCTIONS-----------------------------



        $scope.getSuppliers = function(){
            $http.get(apiurl+'/supplier').then(
            response => {
                console.log(response.data)
                $scope.suppliers = response.data;
            }
            , err => { console.log(err); }
            );
        };

        $scope.getSupplier = function(id){
            var id = $routeParams.id
            $http.get(apiurl+'/supplier/'+id).then(
            response => {
                supplier = response.data;
                $scope.s = supplier;
                $scope.sm = $.extend(true, {}, supplier);
            }
            , err => {
                console.log(err);
                $location.url('/suppliers/');
                }
            );
        };

        $scope.deleteSupplier = function(id){
            var answer = confirm(
                align_center(['Are you sure you want to DELETE', $scope.s.name + '?']));
            if (answer) {
                $http.delete(apiurl+'/supplier/'+id).then(
                    a => $location.url('/suppliers'));
            }
        }

        $scope.addSupplier = function(){
            var s = $scope.s;

            $http.post(
                api('/supplier'),
                s
            ).then(
                a => {
                    if( a.data.hasOwnProperty('_id') )
                        $location.url('/suppliers/'+a.data._id)
                    else
                        $location.url('/suppliers/');
                },
                err => $scope.error = parse_error(err)
            )
        }

        $scope.updateSupplier = function(){
            var ans = confirm(align_center(['Are you sure you want to UPDATE', $scope.s.name + "?"]));
            if( !ans) return;

            var s = $scope.sm;

            $http.put(
                apiurl+'/supplier/'+s._id,
                s
            ).then(
                a => $window.location.reload(),
                err => $scope.error = parse_error(err)
            );
        }
    }
]);