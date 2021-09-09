app.controller('loginController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', 'localStorageService', '$http', 'Psychoanalyst', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, localStorageService, Psychoanalyst) {

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

    


    $scope.btn_save = function () {

        var dto = {
            UserName: $scope.UserName,
            Password: $scope.Password
        }

        authService.login(dto).then(function (res) {

            authService.getUserByUsername($scope.UserName).then(function (res) {

                if (res.data.Role == 0) {
                    $location.path('/adminProfile')

                    $rootScope.psychoanalystId = res.data.ID
                    authService.getDoctorPatients($scope.UserName).then(function (res) {
                        $rootScope.PatientsData = res.data
                      
                    })
                }

                if (res.data.Role == 1) {
                    $location.path('/doctorProfile')
                    authService.getDoctorPatients($scope.UserName).then(function (res) {
                        $rootScope.PatientsData = res.data

                        });
                  
                    
                }

                if (res.data.Role == 2) {
                    $location.path('/patientProfile');
                    authService.getPatientTimes($scope.UserName).then(function (res) {
                        $rootScope.PatientsData = res.data
                           
                    })

                    authService.getPatientInfo($scope.UserName).then(function (res) {
                        $rootScope.PatientsInfo = res.data
                          
                    })
                }
            });
        });


    }
}]);