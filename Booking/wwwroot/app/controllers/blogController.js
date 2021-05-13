app.controller('blogController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {


    $scope.btn_reserve = function () {
        $location.path('/patientRegister')
    }

   
}]);