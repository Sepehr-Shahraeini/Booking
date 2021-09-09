app.controller('rulesController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', '$q', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, $q, fileReader, $timeout) {
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

    $scope.btn_about = function () {
        $location.path('/about')
    };

    $scope.btn_login = function () {
        $location.path('/login')
    };
}]);