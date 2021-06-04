app.controller('blogController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {



    $scope.btn_reserve = function () {
        $location.path('/patientRegister')
    };

    authService.getPost().then(function (response) {
        var data = response.data;
        $scope.posts = response.data
        $scope.posts.forEach(function (x) {
          
            $scope.Image = x.Image
            $rootScope.uploadPath = "http://localhost:63136/"
            $scope.imagePath = $rootScope.uploadPath + $scope.Image;
            console.log($scope.imagePath)

        });
       
     

    });

}]);