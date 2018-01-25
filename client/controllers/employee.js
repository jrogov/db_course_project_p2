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

//-------------------------------ROUTE FUNCTIONS--------------------------------

        $scope.openEmployeeProfile = function(id){
            $location.url('/employees/'+id);
            console.log(id);
        }

        $scope.openShopProfile = function(id){
            $location.url('/shops/'+id)
        }

        $scope.openAddEmployee = function(){
            $location.url('/employees/add');
        }

//-------------------------------EXTERNAL ROUTES------------------------------

        $scope.callPhone = function(phone){
            $window.open('tel:'+phone)
        }

        $scope.openEmail = function(email){
            $window.open('mailto:'+email)
        }

//-------------------------------API CALL FUNCTIONS-----------------------------

        $scope.getEmployee = function(id){
            var id = $routeParams.id
            $http.get(api('/employee/'+id)).then(
            response => {
                var employee = response.data;
                console.log(employee);

                if( employee === null )
                {
                    console.log('Null!')
                    $scope.error = 'No employee found. Opening Employees list'
                    $location.url('/employees/');
                    return;
                }

                // Add aliases for names
                employee['fname'] = employee.firstname +' '+ employee.lastname;
                mn = employee.middlename
                employee['ffname'] = employee.firstname + ' '+(mn?mn+' ':'') + employee.lastname;

                // Convert dates to readable format
                employee['birthdate'] = formatDateStr(employee['birthdate']);
                employee['hiredate'] = formatDateStr(employee['hiredate']);
                h = employee.hirehistory;
                for( i in employee.hirehistory )
                {
                    console.log(h[i]);
                    h[i]['hiredate'] = formatDateStr(h[i]['hiredate']);
                    h[i]['fireDate'] = formatDateStr(h[i]['fireDate']);
                }
                $scope.e = employee;
                $scope.em = clone(employee);
            }
            , err => $scope.error = parse_error(err)
            );
        };

        $scope.getEmployees = function(){
            $http.get(apiurl+'/employee').then(
            response => {
                var employees = response.data;
                for( i in employees )
                    employees[i]['hiredate'] = formatDateStr(employees[i]['hiredate']);
                $scope.employees = employees;
                console.log(employees);
            }
            , err => $scope.error = parse_error(err)
            );
        };

        $scope.deleteEmployee = function(id){
            var answer = confirm(
                align_center(['Are you sure you want to DELETE', $scope.e.fname + '?']));
            if (answer) {
                $http.delete(apiurl+'/employee/'+id)
                .then(
                    a => $location.url('/employees'),
                    err => $scope.error = parse_error(err))
            }
        }

        $scope.updateEmployee = function(){

            var e = clone($scope.em);

            try{
                e['birthdate'] = parseDate(e['birthdate']);
                e['hiredate'] = parseDate(e['hiredate']);
            }
            catch(err){
                console.log(err);
            }
            // delete e['photo'];

            var ans = confirm(align_center(['Are you sure you want to UPDATE', $scope.e.fname + "?"]));
            if( !ans) return;

            $http.put(
                apiurl+'/employee/'+e._id,
                e
            ).then(
                a => $window.location.reload()
               , err => $scope.error = parse_error(err)
                )

        }

        $scope.addEmployee = function(){

            $scope.e;

            var e = clone($scope.e);

            if(e['hiredate']) e['hiredate'] = parseDate(e['hiredate'])
            if(e['birthdate']) e['birthdate'] = parseDate(e['birthdate'])

            $http.post(
                api('/employee/'),
                e)
            .then(
                a =>
                {
                    if( a.data.hasOwnProperty('_id') )
                        $location.url('/employees/'+a.data._id)
                    else
                        $location.url('/employees/');
                } )
            .catch(
                err => $scope.error = parse_error(err)
                )

        }
    }
]
);