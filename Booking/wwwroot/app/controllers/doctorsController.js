app.controller('doctorsController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', '$q', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, $q, fileReader, $timeout) {

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


    function convertDate(x) {
        var day = { 'day': '2-digit' };
        var month = { 'month': 'long' };
        var monthNum = { 'month': '2-digit' };
        var year = { 'year': 'numeric' };

        var result = x.toLocaleString('en-US', year) + '-' + x.toLocaleString('en-US', monthNum) + '-' + x.toLocaleString('en-US', day);
        return result;
    }


    $scope.yFromDate = new Date();
    $scope.yToDate = $scope.yFromDate.addDays(365);

    $scope.yFrom = convertDate($scope.yFromDate);
    $scope.yTo = convertDate($scope.yToDate);

    authService.getPsychoanalysts().then(function (response) {
        $scope.Psychoanalysts = response.data
    })

    $scope.showPsychoanalysts = function (ID, name, lastname, weekdays) {

        $location.path("/doctorProfile")

        $rootScope.psychoanalystId = 1

        $rootScope.psychoanalystId = ID
    }

}]);
