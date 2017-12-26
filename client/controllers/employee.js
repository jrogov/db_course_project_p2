var myApp = angular.module('myApp');

myApp.controller('EmployeeController',
    [
        '$scope',
        '$http',
        '$location',
        '$routeParams',
        '$window',
    function($scope, $http, $location, $routeParams, $window) {
        console.log('EmployeeController loaded');

        $scope.getEmployee = function(id){
            var id = $routeParams.id
            $http.get(apiurl+'/employee/'+id).then(
            response => {
                var employee = response.data;
                console.log(employee);
                employee['fname'] = employee.firstname +' '+ employee.lastname;
                mn = employee.middlename
                employee['ffname'] = employee.firstname + ' '+(mn?mn+' ':'') + employee.lastname;
                $scope.e = employee;
                // Default values for fields
                $scope.u = employee;
            }
            , err => { console.log(err); }
            );
        };

        $scope.getEmployees = function(){
            $http.get(apiurl+'/employee').then(
            response => {
                var employees = response.data;
                $scope.employees = employees;
                console.log(employees);
            }
            , err => { console.log(err); }
            );
        };

        $scope.openEmployeeProfile = function(id){
            $location.url('/employees/'+id);
            console.log(id);
        }

        $scope.deleteEmployee = function(id){
            // TODO Alert window
            $http.delete(apiurl+'/employee/'+id).then(
                a => $location.url('/employees'));
        }

        $scope.updateEmployee = function(){
            /*TODO*/
            console.log("Update!");
            console.log($scope.u);
            $http.put(
                apiurl+'/employee/'+$scope.e._id,
                $scope.u
            ).then(
                a => {
                    $window.location.reload(); }
                );

        }
    }
]
);