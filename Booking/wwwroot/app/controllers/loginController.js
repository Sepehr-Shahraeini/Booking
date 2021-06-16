app.controller('loginController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', 'localStorageService', '$http', 'Psychoanalyst', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, localStorageService, Psychoanalyst) {


    $scope.btn_save = function () {

        var dto = {
            UserName: $scope.UserName,
            Password: $scope.Password
        }

        authService.login(dto).then(function (response) {

            $scope.loadingVisible = false;

            $rootScope.userName = authService.authentication.UserName;
            if ($scope.UserName == '09352166437') {
                $location.path('/AdminCustomers');
            }
            else
                $location.path('/user');
        })
    }
}]);