app.controller('blogController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {



    $scope.btn_reserve = function () {
        $location.path('/patientRegister')
    };

    $rootScope.uploadPath = "http://localhost:63136/Resources/Images/"
    $scope.imagePath = $rootScope.uploadPath + "1.jpg";



      



}]);