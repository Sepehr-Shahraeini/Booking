﻿

var app = angular.module('AngularJSApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'dx', 'ngSanitize', 'ngAnimate']).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);


app.config(function ($routeProvider) {
    
    $routeProvider.when("/main", {
        controller: "indexController",
        templateUrl: "/app/views/main.html"
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    $routeProvider.when("/AdminCustomers", {
        controller: "adminCustomerController",
        templateUrl: "/app/views/adminCustomer.html"
    });

     $routeProvider.when("/user", {
         controller: "UserController",
         templateUrl: "/app/views/User.html"
    });


    $routeProvider.when("/blog", {
         controller: "blogController",
        templateUrl: "/app/views/blog.html"
    });


    $routeProvider.otherwise({ redirectTo: "/main" });

});




var serviceBase = 'http://localhost:63136/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});
app.config(['$httpProvider', function ($httpProvider) {

    $httpProvider.interceptors.push('authInterceptorService');
}]);
app.run(['$rootScope', '$location', '$window', 'authService', function ($rootScope, $location, $window, authService) {
  


    
    

    //////////////////////////
    $rootScope.serviceUrl = serviceBase;
    $rootScope.$on('$viewContentLoaded', function () {


    });

    DevExpress.ui.themes.current('material.gray-light');
    


    $rootScope.isContentVisible = true;




    //////////////////////////////////////////////////////
}]);

