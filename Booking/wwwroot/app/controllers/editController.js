app.controller('editController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', '$q', 'Psychoanalyst', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, $q, fileReader, $timeout, Psychoanalyst) {


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

    var data = $rootScope.PatientsInfo;

    angular.forEach(data, function (x) {
        $scope.Name = x.Name;
        $scope.LastName = x.LastName;
        $scope.Mobile = x.Mobile;
        $scope.Subject = x.Subject;
        $scope.Reason = x.Reason;
        $scope.Email = x.Email;
        $scope.MaritalStatus = x.MaritalStatus;
        $scope.Age = x.Age;
        $scope.ChildrenNum = x.ChildrenNum;
        $scope.Introduced = x.Introduced;
        $scope.Education = x.Education;
            $scope.Job = x.Job;
        $scope.FieldOfStudy = x.FieldOfStudy;
            $scope.Id = x.PatientId;
    })




    $scope.btn_showPsychoanalyst = function () {

        var dto_Patient = {
            Id: $scope.Id,
            Name: $scope.Name,
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
            FieldOfStudy: $scope.FieldOfStudy,
        }

        authService.editPatientData($scope.Id, dto_Patient).then(function (response) {
            $rootScope.Name = $scope.Name
            $rootScope.LastName = $scope.LastName
        });

        $location.path("/patientProfile")

    }

}]);