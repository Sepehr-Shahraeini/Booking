'use strict';
app.controller('aboutController', ['$scope', '$routeParams', '$location', 'authService', 'ngAuthSettings', '$rootScope', 'orderService', '$http', 'Psychoanalyst', function ($scope, $routeParams, $location, authService, ngAuthSettings, $rootScope, orderService, $http, Psychoanalyst) {



    $scope.openMenu = function () {
        var x = document.getElementById("menu");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    $scope.btn_reserve = function () {
        $location.path('/patientRegister')
    };

    $scope.backHome = function () {
        $location.path('/blog')
    };



}]);