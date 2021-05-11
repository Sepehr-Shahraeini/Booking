app.controller('blogController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {


    $scope.btn_reserve = function () {
        document.getElementById("form").style.display = "block";
    }

    $scope.btn_save = function () {

        var dto = {
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            Mobile: $scope.Mobile,
            Subject: $scope.Subject,
            Reason: $scope.Reason,
            Email: $scope.Email,
            MaritalStatus: $scope.MaritalStatus,
            Age: $scope.Age,
            ChildrenNum: $scope.ChildrenNum,
            Introduced: $scope.Introduced,
            Education: $scope.Education,
            Job: $scope.Job,
            FieldOfStudy: $scope.FieldOfStudy
        }

        authService.patientRegistration(dto).then( function (response) {
            console.log(response.data)
        })
    }

}]);