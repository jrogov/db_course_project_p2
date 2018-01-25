var myApp = angular.module('myApp', ['ngRoute']);

var apiurl = 'http://localhost:3228/api'

parse_error = function(a){
    console.log(a)
    if( a.status == -1 ){
        return 'No connection with server'
    }

    else if( a.status == 400 && a.data.error.code == 11000 )
        return a.data.error.errmsg

    else if( a.status == 400 && a.data.error.hasOwnProperty('message'))
        return a.data.error.message

    else if (a.data.error.hasOwnProperty('errors')){
        errs = a.data.error.errors;
        for(i in errs)
            return errs[i].message;
    }
    else
        return "Unexpected error. We're done";
}

api = function(url){
    return apiurl + url;
}

formatDate = function(date){
    return $.datepicker.formatDate('dd-mm-yy', date)
}

formatDateStr = function(datestr){
    return $.datepicker.formatDate('dd-mm-yy', new Date(datestr))
}


parseDate = function(str){
    return $.datepicker.parseDate( "dd-mm-yy", str)
}

clone = function(obj){
    return $.extend(true, {}, obj);
}

sleep = function(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

myApp.config(
    ['$routeProvider',
    function($routeProvider) {
    console.log('Routing config loaded ('+new Date()+')');

    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html'
        })

        .when('/home', {
            templateUrl: 'views/home.html'
        })

//-------------------------------EMPLOYEES--------------------------------------

        .when('/employees', {
            controller: 'EmployeeController',
            templateUrl: 'views/employees.html'
        })

        .when('/employees/add', {
            controller: 'EmployeeController',
            templateUrl: 'views/employee_add.html'
        })

        .when('/employees/:id', {
            controller: 'EmployeeController',
            templateUrl: 'views/employee_profile.html'
        })

//-------------------------------PRODUCTS---------------------------------------

        .when('/products', {
            controller: 'ProductController',
            templateUrl: 'views/products.html'
        })

        .when('/products/add', {
            controller: 'ProductController',
            templateUrl: 'views/product_add.html'
        })

        .when('/products/:id', {
            controller: 'ProductController',
            templateUrl: 'views/product_profile.html'
        })

//-------------------------------PURCHASES--------------------------------------

        .when('/purchases', {
            controller: 'PurchaseController',
            templateUrl: 'views/purchases.html'
        })

        .when('/purchases/add', {
            controller: 'PurchaseController',
            templateUrl: 'views/purchase_add.html'
        })

        .when('/purchases/:id', {
            controller: 'PurchaseController',
            templateUrl: 'views/purchase_profile.html'
        })

//-------------------------------SHOP-------------------------------------------

        .when('/shops', {
            controller: 'ShopController',
            templateUrl: 'views/shops.html'
        })

        .when('/shops/add', {
            controller: 'ShopController',
            templateUrl: 'views/shop_add.html'
        })

        .when('/shops/:id', {
            controller: 'ShopController',
            templateUrl: 'views/shop_profile.html'
        })

//-------------------------------STOCKCHANGE------------------------------------

        .when('/stockchanges', {
            controller: 'StockchangeController',
            templateUrl: 'views/stockchanges.html'
        })

        .when('/stockchanges/add', {
            controller: 'StockchangeController',
            templateUrl: 'views/stockchange_add.html'
        })

        .when('/stockchanges/:id', {
            controller: 'StockchangeController',
            templateUrl: 'views/stockchange_profile.html'
        })

//-------------------------------SUPPLIER--------------------------------------

        .when('/suppliers', {
            controller: 'SupplierController',
            templateUrl: 'views/suppliers.html'
        })

        .when('/suppliers/add', {
            controller: 'SupplierController',
            templateUrl: 'views/supplier_add.html'
        })

        .when('/suppliers/:id', {
            controller: 'SupplierController',
            templateUrl: 'views/supplier_profile.html'
        })

//-------------------------------DATABASE--------------------------------------

        .when('/database', {
            controller: 'DatabaseController',
            templateUrl: 'views/database.html'
        })


//------------------------------------------------------------------------------

        .otherwise({
            redirectTo: '/home'
        });

    }
    ]
);