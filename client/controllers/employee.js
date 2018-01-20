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

        $scope.openAddEmployee = function(){
            $location.url('/employees/add');
        }

//-------------------------------API CALL FUNCTIONS-----------------------------


        $scope.getEmployee = function(id){
            var id = $routeParams.id
            $http.get(apiurl+'/employee/'+id).then(
            response => {
                var employee = response.data;
                // console.log(employee);

                // Add aliases for names
                employee['fname'] = employee.firstname +' '+ employee.lastname;
                mn = employee.middlename
                employee['ffname'] = employee.firstname + ' '+(mn?mn+' ':'') + employee.lastname;

                // Convert dates to readable format
                employee['birthdate'] = $.datepicker.formatDate('dd-mm-yy', new Date(employee['birthdate']));
                employee['hiredate'] = $.datepicker.formatDate('dd-mm-yy', new Date(employee['hiredate']));
                h = employee.hirehistory;
                for( i in employee.hirehistory )
                {
                    h[i]['hiredate'] = $.datepicker.formatDate('dd-mm-yy', new Date(h[i]['hiredate']));
                    h[i]['fireDate'] = $.datepicker.formatDate('dd-mm-yy', new Date(h[i]['fireDate']));
                }
                $scope.e = employee;
            }
            , err => { console.log(err); }
            );
        };

        $scope.searchEmployees = function(){

            /* parse */
            sp = $scope.searchparams;
            param_strings = sp.split(/\s+/);
            params = {};
            for( i in param_strings )
            {
                s = param_strings[i]
                if( s.search(':') )
                {
                    key = s.match(/^(.*):/)[1]
                    value = s.match(/:(.*)$/)[1]
                    params[key] = value;
                }
            }
            console.log(params);
            // $http.get(apiurl+'/employee/search/', params)
            // $http.get(ap)

        }

        $scope.getEmployees = function(){
            $http.get(apiurl+'/employee').then(
            response => {
                var employees = response.data;
                for( i in employees )
                    employees[i]['hiredate'] = $.datepicker.formatDate('dd-mm-yy', new Date(employees[i]['hiredate']))
                $scope.employees = employees;
                console.log(employees);
            }
            , err => { console.log(err); }
            );
        };

        align_center = function(strings){
            var max = 0;
            var result = []
            for( i in strings )
                if( strings[i].length > max) max = strings[i].length;
            for( i in strings )
                result.push( '  '.repeat((max - strings[i].length)/2) + strings[i] )
            return result.join('\n');
        }

        $scope.deleteEmployee = function(id){
            var answer = confirm(
                align_center(['Are you sure you want to DELETE', $scope.e.fname + '?']));
            if (answer) {
                $http.delete(apiurl+'/employee/'+id).then(
                    a => $location.url('/employees'));
            }
        }

        $scope.updateEmployee = function(){
            // console.log("Update!");
            // console.log($scope.e);

            var e = $scope.e;

            var ans = confirm(align_center(['Are you sure you want to UPDATE', $scope.e.fname + "?"]));
            if( !ans) return;

            e['birthdate'] = $.datepicker.parseDate( "dd-mm-yy", e['birthdate']);
            e['hiredate'] = $.datepicker.parseDate( "dd-mm-yy", e['hiredate']);
            e['photo'] = '';

            $http.put(
                apiurl+'/employee/'+$scope.e._id,
                $scope.e
            ).then(
                a => {
                    $window.location.reload(); }
                );

        }

        $scope.addEmployee = function(){

            $scope.e;
            $http.post(
                apiurl+'/employee/',
                $scope.e)
            .then(
                a =>
                {
                    console.log(a);
                    // $location.url();
                } )
            .catch(
                a =>
                {
                    errs = a.data.error.errors;
                    for(i in errs){
                        console.log(errs[i].message);
                        console.log($('#error').val())
                        $scope.error = errs[i].message;
                        // document.getElementById('error').value = errs[i].message;
                        // $('#error').val(errs[i].message);
                        return 0;
                    }
                })

        }
    }
]
);