app.controller('blogController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {



    $scope.btn_reserve = function () {
        $location.path('/patientRegister')
    };

    $scope.backHome = function () {
        $location.path('/blog')
    };

    $scope.btn_about = function () {
        $location.path('/about')
    };

    authService.getPosts().then(function (response) {
        $scope.posts = response.data
        $scope.posts.forEach(function (x) {
            $scope.Image = x.Image
            $rootScope.uploadPath = "http://localhost:63136/"
            $scope.imagePath = $rootScope.uploadPath + $scope.Image;   
        });

        $scope.navPost = function (title) {
            authService.getPost(title).then(function (response) {
                $rootScope.post = response.data
                $location.path("/post")
            });
   
        }
    });

    $scope.openMenu = function() {
        var x = document.getElementById("menu");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }
   

    


}]);