'use strict';
app.controller('adminCustomerController', ['$scope', '$routeParams', '$location', 'authService', 'ngAuthSettings', '$rootScope', 'orderService', '$http', 'Psychoanalyst', function ($scope, $routeParams, $location, authService, ngAuthSettings, $rootScope, orderService, $http, Psychoanalyst) {

    $scope.entity_WeekDays = {
        Saturday: "0",
        Sunday: "0",
        Monday: "0",
        Tuesday: "0",
        Wednesday: "0",
        Thursday: "0",
        Friday: "0"
    }


    $scope.entity_VisitingTime = {
        StartTime: null,
        EndTime: null,
        WeekDays: null,
        PsychoanalystId: null
    }


    Psychoanalyst.GetPsychoanalystId($rootScope.drPhone).then(function (response) {
        var data = response.data;
        angular.forEach(data, function (x) {
            $scope.Id = x.ID
        });

        authService.getPatients($scope.Id).then(function (response) {
            $scope.patients = response.data;
        })
    })

    $scope.btn_newPsychoanalyst = function (e) {
        document.getElementById("popup_newPsychoanalyst").style.display = "block"
    }


    $scope.btn_savePsychoanalyst = function (e) {

        if ($scope.saturday == true) {
            $scope.entity_WeekDays.Saturday = "1"
        }

        if ($scope.sunday == true) {
            $scope.entity_WeekDays.Sunday = "1"
        }

        if ($scope.monday == true) {
            $scope.entity_WeekDays.Monday = "1"
        }

        if ($scope.tuesday == true) {
            $scope.entity_WeekDays.Tuesday = "1"
        }

        if ($scope.wednesday == true) {
            $scope.entity_WeekDays.Wednesday = "1"
        }

        if ($scope.thursday == true) {
            $scope.entity_WeekDays.Thursday = "1"
        }

        if ($scope.friday == true) {
            $scope.entity_WeekDays.Friday = "1"
        }

        weekDaysSum();


        var dto_psychoanalyst = {
            Name: $scope.FirstName,
            LastName: $scope.LastName,
            Phone: $scope.Phone,
            WeekDays: $scope.WeekDays
        }

        var dto_user = {
            UserName: $scope.Phone,
            Password: "123456"
        }

        Psychoanalyst.newPsychoanalyst(dto_psychoanalyst, function () {


            Psychoanalyst.GetPsychoanalystId($scope.Phone).then(function (response) {
                var data = response.data;
                angular.forEach(data, function (x) {
                    $scope.newPsychoanalystId = x.ID
                    $scope.entity_VisitingTime.PsychoanalystId = x.ID

                    

                });

                
                console.log(data)
            })

            console.log($scope.entity_VisitingTime.PsychoanalystId)
        })

        document.getElementById("popup_newVisitingTime").style.display = "block"

        Psychoanalyst.newUser(dto_user, function () { })


    }

   

    $scope.btn_sat = function (e) {
        authService.visitingTimeByDrPhone($scope.Id, "6").then(function (response) {
            $scope.ExistTime = response.data
        })

        $scope.entity_VisitingTime.WeekDays = "6"
       // $scope.updateTime_Weekdays = "6"

        if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
        } else {
            document.getElementById("popup_time").style.display = "block"
        }
    }



    $scope.btn_sun = function (e) {
        authService.visitingTimeByDrPhone($scope.Id, "0").then(function (response) {
            $scope.ExistTime = response.data
        })

        $scope.entity_VisitingTime.WeekDays = "0"
       // $scope.updateTime_Weekdays = "0"

        if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
        } else {
            document.getElementById("popup_time").style.display = "block"
        }
    }



    $scope.btn_mon = function (e) {
        authService.visitingTimeByDrPhone($scope.Id, "1").then(function (response) {
            $scope.ExistTime = response.data
        })

        $scope.entity_VisitingTime.WeekDays = "1"
       // $scope.updateTime_Weekdays = "1"

        if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
        } else {
            document.getElementById("popup_time").style.display = "block"
        }
    }



    $scope.btn_tues = function (e) {
        authService.visitingTimeByDrPhone($scope.Id, "2").then(function (response) {
            $scope.ExistTime = response.data
        })

        $scope.entity_VisitingTime.WeekDays = "2"
      //  $scope.updateTime_Weekdays = "2"

        if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
        } else {
            document.getElementById("popup_time").style.display = "block"
        }
    }



    $scope.btn_wend = function (e) {
        authService.visitingTimeByDrPhone($scope.Id, "3").then(function (response) {
            $scope.ExistTime = response.data
        })

        $scope.entity_VisitingTime.WeekDays = "3"
        //$scope.updateTime_Weekdays = "3"

        if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
        } else {
            document.getElementById("popup_time").style.display = "block"
        } document.getElementById("formChangeVisitingTime").style.display = "block"

    }



    $scope.btn_thurs = function (e) {
        authService.visitingTimeByDrPhone($scope.Id, "4").then(function (response) {
            $scope.ExistTime = response.data
        })

        $scope.entity_VisitingTime.WeekDays = "4"
       // $scope.updateTime_Weekdays = "4"

        if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
        } else {
            document.getElementById("popup_time").style.display = "block"
        }
    }



    $scope.btn_fri = function (e) {
        authService.visitingTimeByDrPhone($scope.Id, "5").then(function (response) {
            $scope.ExistTime = response.data
        })

        $scope.entity_VisitingTime.WeekDays = "5"
      //  $scope.updateTime_Weekdays = "5"

        if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
        } else {
            document.getElementById("popup_time").style.display = "block"
        }
    }

    $scope.btn_saveTime = function (e) {

        $scope.entity_VisitingTime.StartTime = $scope.StartTime_hour + ":" + $scope.StartTime_minute
        $scope.entity_VisitingTime.EndTime = $scope.EndTime_hour + ":" + $scope.EndTime_minute

        console.log($scope.entity_VisitingTime)


        Psychoanalyst.newVisitingTime($scope.entity_VisitingTime, function (response) {
            alert("زمان ذخیره شد")

            $scope.entity_Time.EndTimeHour = null
            $scope.entity_Time.EndTimeMinute = null
            $scope.entity_Time.StartTimeHour = null
            $scope.entity_Time.StartTimeMinute = null
        })
       

       
      



    }

    function weekDaysSum() {
        $scope.WeekDays = $scope.entity_WeekDays.Sunday +
            $scope.entity_WeekDays.Monday +
            $scope.entity_WeekDays.Tuesday +
            $scope.entity_WeekDays.Wednesday +
            $scope.entity_WeekDays.Thursday +
            $scope.entity_WeekDays.Friday +
            $scope.entity_WeekDays.Saturday;
    }


}]);