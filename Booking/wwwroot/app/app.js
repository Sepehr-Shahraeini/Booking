

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

    $routeProvider.when("/contact", {
        controller: "contactUsController",
        templateUrl: "/app/views/contactUs.html"
    });

    $routeProvider.when("/factor", {
        controller: "factorController",
        templateUrl: "/app/views/factor.html"
    });

    $routeProvider.when("/rules", {
        controller: "rulesController",
        templateUrl: "/app/views/Rules.html"
    });

    $routeProvider.when("/edit", {
        controller: "editController",
        templateUrl: "/app/views/edit.html"
    });


    $routeProvider.when("/patientProfile", {
        controller: "patientProfileController",
        templateUrl: "/app/views/patientProfile.html"
    });


    $routeProvider.when("/adminProfile", {
        controller: "adminProfileController",
        templateUrl: "/app/views/adminProfile.html"
    });

    $routeProvider.when("/doctorProfile", {
        controller: "doctorProfileController",
        templateUrl: "/app/views/doctorProfile.html"
    });

     $routeProvider.when("/doctors", {
        controller: "doctorsController",
        templateUrl: "/app/views/doctors.html"
    });

      $routeProvider.when("/newDoctorForm", {
          controller: "newDoctorFormController",
          templateUrl: "/app/views/newDoctorForm.html"
    });




    $routeProvider.otherwise({ redirectTo: "/blog" });

});




var serviceBase = 'http://localhost:8081/';
//var serviceBase = 'https://dr-khodabakhsh.ir/api/';

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




    //$rootScope.isContentVisible = true;




    //////////////////////////////////////////////////////
}]);


Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};