app.controller('blogController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {

    window.scrollTo(0, 0);

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

    authService.getPosts().then(function (response) {
        $scope.posts = response.data
        $scope.posts.forEach(function (x) {
            $scope.Image = x.Image
      
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