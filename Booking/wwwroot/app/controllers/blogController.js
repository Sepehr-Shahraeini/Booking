app.controller('blogController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {


    $scope.btn_reserve = function() {
        alert("alert")
    }

    //$scope.btn_save = function () {
    //    var dto = {
    //        FirstName = $scope.FirstName
    //    }

    //    console.log(dto)
    //}

}]);