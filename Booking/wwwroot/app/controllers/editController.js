app.controller('editController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', '$q', 'Psychoanalyst', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, $q, fileReader, $timeout, Psychoanalyst) {

    $scope.Name = $rootScope.Name,
        $scope.LastName = $rootScope.LastName,
        $scope.Mobile = $rootScope.Mobile,
        $scope.Subject = $rootScope.Subject,
        $scope.Reason = $rootScope.Reason,
        $scope.Email = $rootScope.Email,
        $scope.MaritalStatus = $rootScope.MaritalStatus,
        $scope.Age = $rootScope.Age,
        $scope.ChildrenNum = $rootScope.ChildrenNum,
        $scope.Introduced = $rootScope.Introduced,
        $scope.Education = $rootScope.Education,
        $scope.Job = $rootScope.Job,
        $scope.FieldOfStudy = $rootScope.FieldOfStudy

    $scope.btn_showPsychoanalyst = function () {

        var dto_Patient = {
            Id: $rootScope.Id,
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


        authService.editPatientData($rootScope.Id, dto_Patient).then(function (response) {
            $rootScope.Name = $scope.Name
            $rootScope.LastName = $scope.LastName
        });
        //authService.patientRegistration(dto_Patient).then(function (response) {
        //    $scope.patientId = response.data


            
        //    $scope.timeRegistration = function (starttime, endtime) {
        //        $scope.registeredTime = starttime + "-" + endtime;
        //        $scope.selectedTime = starttime;
        //        $scope.registeredDate = $scope.selectedDate + $scope.selectedTime

        //        var dateBox = ["sun", "mon", "tues", "wed", "thur", "fri", "sat"];
        //        angular.forEach(dateBox, function (x) {
        //            document.getElementById(x).style.display = "none";
        //            document.getElementById(x).style.backgroundColor = "#ffffff";
        //        });

        //        var timesPopup = ["popSat", "popSun", "popMon", "popTues", "popWed", "popThur", "popFri"];
        //        angular.forEach(timesPopup, function (x) {
        //            document.getElementById(x).style.display = "none";
        //        });

        //        document.getElementById("choosePsychoanalyst").style.display = "none";


               $location.path("/factor")



        //        var dto_calendar = {
        //            Amount: "20000",
        //            TrackingNO: 223,
        //            IsEmergency: true,
        //            PatientId: $scope.patientId,
        //            PsychoanalystId: $scope.psychoanalystId,
        //            DatePersian: $scope.registeredDate,
        //            DateAmount: $scope.registeredDate,
        //            time: $scope.registeredTime

        //        }

        //        $rootScope.Time = $scope.registeredTime
        //        $rootScope.PsychoanalystId = $scope.psychoanalystId

        //        authService.saveCalendar(dto_calendar).then(function (response) {
        //        })

        //    }
        //})
    }

}]);