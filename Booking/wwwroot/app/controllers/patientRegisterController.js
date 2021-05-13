app.controller('patientRegisterController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', 'localStorageService', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, localStorageService) {


    $scope.signedUp = function () {
        $location.path('/patientLogin')
    }

    $scope.btn_showPsychoanalyst = function () {

        document.getElementById("choosePsychoanalyst").style.display = "block";

        var dto_Patient = {
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
            Password: $scope.Password
        }

        authService.patientRegistration(dto_Patient).then(function (response) {
            $scope.patientId = response.data

            $scope.timeRegistration = function (starttime, endtime) {
                $scope.registeredTime = starttime + "-" + endtime;
                $scope.selectedTime = starttime;
                $scope.registeredDate = $scope.selectedDate + $scope.selectedTime

                console.log($scope.registeredDate)


                var dto_calendar = {
                    Amount: "20000",
                    TrackingNO: 223,
                    IsEmergency: true,
                    PatientId: $scope.patientId,
                    PsychoanalystId: 2,
                    DatePersian: $scope.registeredDate,
                    DateAmount: $scope.registeredDate,
                    time: $scope.registeredTime

                }

                authService.saveCalendar(dto_calendar).then(function (response) {
                    console.log(response)
                })

            }
        })
    }


    function getWeekdays(psychoanalystId = 2, weekdays) {
        authService.getExistTime(psychoanalystId).then(function (response) {
            $scope.Patients = response.data;
            $scope.Patients.forEach(function (x) {
                $scope.PatientsTime = x.Time
                console.log(response)
            })
        })

        authService.getExistTime(psychoanalystId).then(function (response) {
            $scope.Patient = JSON.stringify(response)

            authService.getVisitingTime(1, 0).then(function (response) {
                var data = response.data;
                $scope.sunDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(0) + "/" + $scope.MonthNum + "/" + $scope.Year + "/0/" + $scope.time) == -1) {
                            authService.getUnselectedTime(1, 0, $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.sunDay.length; i++) { }
                                $scope.sunDay[i] = $scope.records
                            });
                        }
                    }
                });


            });

            authService.getVisitingTime(1, 1).then(function (response) {
                var data = response.data;
                $scope.monDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(1) + "/" + $scope.MonthNum + "/" + $scope.Year + "/1/" + $scope.time) == -1) {
                            authService.getUnselectedTime(1, 1, $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.monDay.length; i++) { }
                                $scope.monDay[i] = $scope.records
                            });
                        }
                    }
                });
            });

            authService.getVisitingTime(1, 2).then(function (response) {
                var data = response.data;
                $scope.tuesDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(2) + "/" + $scope.MonthNum + "/" + $scope.Year + "/2/" + $scope.time) == -1) {
                            authService.getUnselectedTime(1, 2, $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.tuesDay.length; i++) { }
                                $scope.tuesDay[i] = $scope.records
                            });
                        }
                    }
                });

            });

            authService.getVisitingTime(1, 3).then(function (response) {
                var data = response.data;
                $scope.wednesDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(3) + "/" + $scope.MonthNum + "/" + $scope.Year + "/3/" + $scope.time) == -1) {
                            authService.getUnselectedTime(1, 3, $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.wednesDay.length; i++) { }
                                $scope.wednesDay[i] = $scope.records
                            });
                        }
                    }
                });

            });

            authService.getVisitingTime(1, 4).then(function (response) {
                var data = response.data;
                $scope.thursDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(4) + "/" + $scope.MonthNum + "/" + $scope.Year + "/4/" + $scope.time) == -1) {
                            authService.getUnselectedTime(1, 4, $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.thursDay.length; i++) { }
                                $scope.thursDay[i] = $scope.records
                            });
                        }
                    }
                });


            });

            authService.getVisitingTime(1, 5).then(function (response) {
                var data = response.data;
                $scope.friDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(5) + "/" + $scope.MonthNum + "/" + $scope.Year + "/5/" + $scope.time) == -1) {
                            authService.getUnselectedTime(1, 5, $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.friDay.length; i++) { }
                                $scope.friDay[i] = $scope.records
                            });
                        }
                    }
                });


            });

            authService.getVisitingTime(1, 6).then(function (response) {
                var data = response.data;
                $scope.saturDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(6) + "/" + $scope.MonthNum + "/" + $scope.Year + "/6/" + $scope.time) == -1) {
                            authService.getUnselectedTime(1, 6, $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.saturDay.length; i++) { }
                                $scope.saturDay[i] = $scope.records
                            });
                        }
                    }
                });
            });
        });

        $scope.weekDay = weekdays;

        if ($scope.weekDay[6] == "1") {
            document.getElementById("sat").style.display = "inline-block";
        }

        if ($scope.weekDay[0] == "1") {
            document.getElementById("sun").style.display = "inline-block";
        }

        if ($scope.weekDay[1] == "1") {
            document.getElementById("mon").style.display = "inline-block";
        }

        if ($scope.weekDay[2] == "1") {
            document.getElementById("tues").style.display = "inline-block";
        }

        if ($scope.weekDay[3] == "1") {
            document.getElementById("wed").style.display = "inline-block";
        }

        if ($scope.weekDay[4] == "1") {
            document.getElementById("thur").style.display = "inline-block";
        }

        if ($scope.weekDay[5] == "1") {
            document.getElementById("fri").style.display = "inline-block";
        }
    }

    authService.getPsychoanalysts().then(function (response) {
        $scope.Psychoanalysts = response.data
    })



    $scope.showPsychoanalysts = function (name, lastname, weekdays, psychoanalystId) {
        authService.getPsychoanalysts().then(function (response) {
            $scope.Psychoanalysts = response.data
        })

        var dateBoxs = document.getElementsByClassName("dateBox");
        for (var i = 0; i < dateBoxs.length; i++) {
            dateBoxs[i].style.display = "none";
        }


        getWeekdays(psychoanalystId, weekdays);

    }

    function calDate(x) {

        var d = new Date();
        d.setDate(d.getDate() + (x + 7 - d.getDay()) % 7);

        if (d.getDay() == 3 && d.getHours() > 19 && d.getMinutes() > 30) {
            d.setDate(d.getDate() + (x + 7 - d.getDay()));
        }

        var day = { 'day': '2-digit' };
        var month = { 'month': 'long' };
        var monthNum = { 'month': '2-digit' };
        var year = { 'year': 'numeric' };
        var Day = d.toLocaleString('fa-Ir', day);
        $scope.Month = d.toLocaleString('fa-Ir', month);
        $scope.MonthNum = d.toLocaleString('fa-Ir', monthNum);
        $scope.Year = d.toLocaleString('fa-Ir', year);
        return (Day)
    }


    document.getElementById("dateSun").innerHTML = calDate(0);
    document.getElementById("dateMon").innerHTML = calDate(1);
    document.getElementById("dateTues").innerHTML = calDate(2);
    document.getElementById("dateWed").innerHTML = calDate(3);
    document.getElementById("dateThur").innerHTML = calDate(4);
    document.getElementById("dateFri").innerHTML = calDate(5);
    document.getElementById("dateSat").innerHTML = calDate(6);


    document.getElementById("monthSun").innerHTML = $scope.Month;
    document.getElementById("monthMon").innerHTML = $scope.Month;
    document.getElementById("monthTues").innerHTML = $scope.Month;
    document.getElementById("monthWed").innerHTML = $scope.Month;
    document.getElementById("monthThur").innerHTML = $scope.Month;
    document.getElementById("monthFri").innerHTML = $scope.Month;
    document.getElementById("monthSat").innerHTML = $scope.Month;



    $scope.satBtn = function () {
        var Times = document.getElementsByClassName("Time");
        for (var i = 0; i < Times.length; i++) {
            Times[i].style.display = "none";
        }

        var dateBoxs = document.getElementsByClassName("dateBox");
        for (var i = 0; i < dateBoxs.length; i++) {
            dateBoxs[i].style.backgroundColor = "#ffffff";
        }

        document.getElementById("popSat").style.display = "block";
        $scope.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(6)
        $scope.selectedDate = calDate(6) + "/" + $scope.MonthNum + "/" + $scope.Year + "/6/"
        document.getElementById("sat").style.backgroundColor = "#ff9900"
    };


    $scope.sunBtn = function () {
        var Times = document.getElementsByClassName("Time");
        for (var i = 0; i < Times.length; i++) {
            Times[i].style.display = "none";
        }

        var dateBoxs = document.getElementsByClassName("dateBox");
        for (var i = 0; i < dateBoxs.length; i++) {
            dateBoxs[i].style.backgroundColor = "#ffffff";
        }

        document.getElementById("popSat").style.display = "block";
        $scope.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(0)
        $scope.selectedDate = calDate(6) + "/" + $scope.MonthNum + "/" + $scope.Year + "/0/"
        document.getElementById("sat").style.backgroundColor = "#ff9900"
    };


    $scope.monBtn = function () {
        var Times = document.getElementsByClassName("Time");
        for (var i = 0; i < Times.length; i++) {
            Times[i].style.display = "none";
        }

        var dateBoxs = document.getElementsByClassName("dateBox");
        for (var i = 0; i < dateBoxs.length; i++) {
            dateBoxs[i].style.backgroundColor = "#ffffff";
        }

        document.getElementById("popMon").style.display = "block";
        $scope.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(1)
        $scope.selectedDate = calDate(1) + "/" + $scope.MonthNum + "/" + $scope.Year + "/1/"
        document.getElementById("mon").style.backgroundColor = "#ff9900"
    };


    $scope.tuesBtn = function () {
        var Times = document.getElementsByClassName("Time");
        for (var i = 0; i < Times.length; i++) {
            Times[i].style.display = "none";
        }

        var dateBoxs = document.getElementsByClassName("dateBox");
        for (var i = 0; i < dateBoxs.length; i++) {
            dateBoxs[i].style.backgroundColor = "#ffffff";
        }

        document.getElementById("popTues").style.display = "block";
        $scope.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(2)
        $scope.selectedDate = calDate(2) + "/" + $scope.MonthNum + "/" + $scope.Year + "/2/"
        document.getElementById("tues").style.backgroundColor = "#ff9900"
    };


    $scope.wedBtn = function () {
        var Times = document.getElementsByClassName("Time");
        for (var i = 0; i < Times.length; i++) {
            Times[i].style.display = "none";
        }

        var dateBoxs = document.getElementsByClassName("dateBox");
        for (var i = 0; i < dateBoxs.length; i++) {
            dateBoxs[i].style.backgroundColor = "#ffffff";
        }

        document.getElementById("popWed").style.display = "block";
        $scope.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(3)
        $scope.selectedDate = calDate(3) + "/" + $scope.MonthNum + "/" + $scope.Year + "/3/"
        document.getElementById("wed").style.backgroundColor = "#ff9900"
    };

    $scope.thurBtn = function () {
        var Times = document.getElementsByClassName("Time");
        for (var i = 0; i < Times.length; i++) {
            Times[i].style.display = "none";
        }

        var dateBoxs = document.getElementsByClassName("dateBox");
        for (var i = 0; i < dateBoxs.length; i++) {
            dateBoxs[i].style.backgroundColor = "#ffffff";
        }

        document.getElementById("popThur").style.display = "block";
        $scope.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(4)
        $scope.selectedDate = calDate(4) + "/" + $scope.MonthNum + "/" + $scope.Year + "/4/"
        document.getElementById("thur").style.backgroundColor = "#ff9900"
    };


    $scope.friBtn = function () {
        var Times = document.getElementsByClassName("Time");
        for (var i = 0; i < Times.length; i++) {
            Times[i].style.display = "none";
        }

        var dateBoxs = document.getElementsByClassName("dateBox");
        for (var i = 0; i < dateBoxs.length; i++) {
            dateBoxs[i].style.backgroundColor = "#ffffff";
        }


        document.getElementById("popFri").style.display = "block";
        $scope.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(5)
        $scope.selectedDate = calDate(5) + "/" + $scope.MonthNum + "/" + $scope.Year + "/5/"
        document.getElementById("fri").style.backgroundColor = "#ff9900"
    };

    ////////////////////////////////////

}]);