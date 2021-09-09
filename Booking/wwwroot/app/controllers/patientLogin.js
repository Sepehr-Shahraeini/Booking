app.controller('patientLoginController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', 'localStorageService', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, localStorageService) {

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


    $scope.btn_save = function () {

        var dto = {
            UserName: $scope.UserName,
            Password: $scope.Password
        }

        authService.patientLogin(dto).then(function (response) {

            $location.path("/doctors")

            var data = response.data.patientData;
            angular.forEach(data, function (x) {
                $rootScope.PatientId = x.Id;
                $rootScope.Name = x.Name;
                $rootScope.LastName = x.LastName;
                $rootScope.Mobile = x.Mobile;
                $rootScope.Subject = x.Subject;
                $rootScope.Reason = x.Reason;
                $rootScope.Email = x.Email;
                $rootScope.MaritalStatus = x.MaritalStatus;
                $rootScope.Age = x.Age;
                $rootScope.ChildrenNum = x.ChildrenNum;
                $rootScope.Introduced = x.Introduced;
                $rootScope.Education = x.Education;
                $rootScope.Job = x.Job;
                $rootScope.FieldOfStudy = x.FieldOfStudy;
                $rootScope.Amount = "170000";
                $rootScope.TrackingNO = 230;
            })



        })
    }


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





}]);