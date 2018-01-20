var myApp = angular.module('myApp', ['ngRoute']);

var apiurl = 'http://localhost:3228/api'

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

        .when('/products/:id', {
            controller: 'ProductController',
            templateUrl: 'views/product_profile.html'
        })

//-------------------------------PURCHASES--------------------------------------

        .when('/purchases', {
            controller: 'PurchaseController',
            templateUrl: 'views/purchases.html'
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

        .when('/shops/:id', {
            controller: 'ShopController',
            templateUrl: 'views/shop_profile.html'
        })

//-------------------------------STOCKCHANGE------------------------------------

        .when('/stockchanges', {
            controller: 'StockchangeController',
            templateUrl: 'views/stockchanges.html'
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