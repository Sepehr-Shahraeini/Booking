

var app = angular.module('AngularJSApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', , 'ngSanitize', 'ngAnimate']).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
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

     $routeProvider.when("/patientRegister", {
         controller: "patientRegisterController",
         templateUrl: "/app/views/patientRegister.html"
    });


     $routeProvider.when("/patientLogin", {
         controller: "patientLoginController",
         templateUrl: "/app/views/patientLogin.html"
    });

    $routeProvider.when("/blogAdmin", {
         controller: "blogAdminController",
         templateUrl: "/app/views/blogAdmin.html"
    });


    $routeProvider.when("/post", {
        controller: "postController",
         templateUrl: "/app/views/post.html"
    });


    $routeProvider.when("/about", {
        controller: "aboutController",
         templateUrl: "/app/views/about.html"
    });


    $routeProvider.otherwise({ redirectTo: "/blog" });

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

    


    $rootScope.isContentVisible = true;




    //////////////////////////////////////////////////////
}]);


