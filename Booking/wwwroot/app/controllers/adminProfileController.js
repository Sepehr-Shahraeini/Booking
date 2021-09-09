app.controller('adminProfileController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', '$q', 'Psychoanalyst', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, $q, fileReader, $timeout, Psychoanalyst, $modal) {

    $scope.openMenu = function () {
        var x = document.getElementById("menu");
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

    $scope.newDoctor = function () {
        document.getElementById("infoPopup").style.display = "block";
    }


    $scope.timeRegister = function () {
        document.getElementById("monthsBox").style.display = "block";
    }


    $scope.btn_close = function () {
        document.getElementById("timeRegister").style.display = "none";
        document.getElementById("daysBox").style.display = "block";

        $scope.availabeTimes = [];
    }
    

    $scope.daysBoxBack = function () {
        document.getElementById("monthsBox").style.display = "block"
        document.getElementById("daysBox").style.display = "none"
    }

    $scope.monthsBoxBack = function () {
        document.getElementById("daysBox").style.display = "none"
        document.getElementById("monthsBox").style.display = "none"
    }
    //////////////////////////

    $scope.sex = ["آقا", "خانم"];
    $scope.btn_savePsychoanalyst = function () {

        var data = {
            Name: $scope.Name,
            LastName: $scope.LastName,
            Phone: $scope.Mobile,
            Weekdays: null,
            ImageUrl: null,
            About: $scope.About,
            Sex: $scope.Sex
        }

        var user = {
            UserName: $scope.Mobile,
            Password: "1234",
            Role: 1
        }

        authService.newUser(user).then(function (res) {

        })

        authService.newPsychoanalyst(data).then(function (res) {
            alert("روانکاو جدید با موفقیت افزوده شد")
        })
    };
    //////////////////////////////////
    $rootScope.psychoanalystId = 1

    authService.psychoanalystMonths($rootScope.psychoanalystId, 1400).then(function (res) {
        
        $scope.AvailabeMonth = res.data
        $scope.getDays = function (Pyear, PMonth) {

            document.getElementById("monthsBox").style.display = "none";

            authService.Days($rootScope.psychoanalystId, Pyear, PMonth).then(function (res) {
                $scope.AvailabeDays = res.data
                document.getElementById("daysBox").style.display = "block";

            })
        }
    });

    $scope.registerTime = function (DateId) {
        $scope.newAvailabe = {
            PsychoanalystId: $rootScope.psychoanalystId,
            DateId: DateId,
        }  
        document.getElementById("timeRegister").style.display = "block";
        document.getElementById("daysBox").style.display = "none";
    }

    //////////////////////////////////


    $scope.availabeTimes = [];

    $scope.selectTime = function (Id, StartTime, EndTime, DateId, PsychoanalystId, DateConfirmed, PatientId) {

        $scope.newAvailabe = {
            Id: Id,
            PsychoanalystId: PsychoanalystId,
            DateId: DateId,
            StartTime: StartTime,
            EndTime: EndTime,
            DateConfirmed: DateConfirmed,
            PatientId: PatientId,
        }

        $scope.StartTime_hour = StartTime.slice(0, 2);
        $scope.StartTime_minute = StartTime.slice(3, 5);
        $scope.EndTime_hour = EndTime.slice(0, 2);
        $scope.EndTime_minute = EndTime.slice(3, 5);
    }


    function editArray(data) {
        for (var i = 0; i < $scope.availabeTimes.length; i++) {
            if ($scope.availabeTimes[i].Id === data.Id) {
                $scope.availabeTimes[i].PsychoanalystId = data.PsychoanalystId;
                $scope.availabeTimes[i].PDate = data.PDate;
                $scope.availabeTimes[i].StartTime = data.StartTime;
                $scope.availabeTimes[i].EndTime = data.EndTime;
                $scope.availabeTimes[i].DateConfirmed = data.DateConfirmed;
                $scope.availabeTimes[i].PatientId = data.PatientId;
            }
        }
    }


    $scope.btn_saveTime = function (e) {

        if ($scope.StartTime_hour == null || $scope.StartTime_minute == null || $scope.EndTime_hour == null || $scope.EndTime_minute == null) {

            if ($scope.StartTime_hour == null || $scope.StartTime_minute == null || $scope.EndTime_hour == null || $scope.EndTime_minute == null) {
                document.getElementById("err").style.display = "inline-block";
            } else {
                document.getElementById("err").style.display = "none";
            }
        } else {


            document.getElementById("btn_saveTime").style.display = "none";
            document.getElementById("btn_spinner").style.display = "block";

            $scope.newAvailabe.StartTime = $scope.StartTime_hour + ":" + $scope.StartTime_minute;
            $scope.newAvailabe.EndTime = $scope.EndTime_hour + ":" + $scope.EndTime_minute;

            authService.newVisitingTime($scope.newAvailabe).then(function (response) {
                console.log(response.data.IsSuccess)
                console.log($scope.newAvailabe.Id)



                if (response.data.IsSuccess == true) {

                var data = response.data.Data;

                if ($scope.newAvailabe.Id > 0) {
                    $.when(editArray(data)).then(function () {
                        $scope.newAvailabe.Id = -1;

                    })

                } else {
                    $scope.availabeTimes.push(response.data.Data)
                }

                
                    document.getElementById("btn_saveTime").style.display = "none";
                    document.getElementById("btn_spinner").style.display = "none";
                    document.getElementById("btn_check").style.display = "block";

                    setTimeout(function () {
                        document.getElementById("btn_saveTime").style.display = "block";
                        document.getElementById("btn_spinner").style.display = "none";
                        document.getElementById("btn_check").style.display = "none";
                        document.getElementById("btn_err").style.display = "none";

                    }, 1500);
                } else {
                    document.getElementById("btn_saveTime").style.display = "none";
                    document.getElementById("btn_spinner").style.display = "none";
                    document.getElementById("btn_check").style.display = "none";
                    document.getElementById("btn_err").style.display = "block";

                    setTimeout(function () {
                        document.getElementById("btn_saveTime").style.display = "block";
                        document.getElementById("btn_spinner").style.display = "none";
                        document.getElementById("btn_check").style.display = "none";
                        document.getElementById("btn_err").style.display = "none";

                    }, 1500);
                }

                $scope.StartTime_hour = null;
                $scope.StartTime_minute = null;
                $scope.EndTime_hour = null;
                $scope.EndTime_minute = null;

                document.getElementById("err").style.display = "none";
            })
        }
    }

}])