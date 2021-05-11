'use strict';
app.controller('indexController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {
    $scope.refer = $routeParams.refer;



    $scope.entity = {
        Name: null,
        LastName: null,
        date: null,
        Mobile: null,
        Time: null,
        ExistDate: null,
        Email: null,
        Age: null,
        ChildrenNum: null,
        Job: null,
        FieldOfStudy: null,
        Subject: null,
        Reason: null,
        Education: null,
        MaritalStatus: null,
        Doctor: null,
        Introduced: null,
        weekDays: null
    };

    $scope.time_entity = {
        Time: null,
        Doctor: null,
        Date: null
    }


    $scope.txt_FirstName = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.Name',

        }
    };

    $scope.txt_LastName = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.LastName',

        }
    };

    $scope.txt_Mobile = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.Mobile',

        }
    };

    $scope.txt_Email = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.Email',

        }
    };

    $scope.txt_Introduced = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.Introduced',

        }
    };

    $scope.txt_Age = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.Age',

        }
    };

    $scope.txt_ChildrenNum = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.ChildrenNum',

        }
    };

    $scope.txt_Job = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.Job',

        }
    };

    $scope.txt_FieldOfStudy = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.FieldOfStudy',

        }
    };

    $scope.txt_Subject = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.Subject',

        }
    };

    var EducationData =
        [
            "زیر دیپلم ",
            "دیپلم و زیر دیپلم",
            "لیسانس",
            "فوق لیسانس",
            "دکتر"
        ]
    $scope.drop_Education = {
        items: EducationData,
        placeholder: "",
        bindingOptions: {
            value: 'entity.Education',
        }
    };

    $scope.drop_MaritalStatus = {
        items: ["مجرد", "متاهل"],
        placeholder: "",
        bindingOptions: {
            value: 'entity.MaritalStatus',
        }

    };

    $scope.txt_Reason = {
        bindingOptions: {
            value: "entity.Reason"
        }
    };

    $scope.btn_save = {
        text: 'تایید',
        type: 'default',
        width: '100%',
        height: 45,
        rtlEnabled: true,
        onClick: function (e) {
            authService.patientRegistration($scope.entity, function () { })
            authService.newTime($scope.time_entity, function () { })
        }
    };

    $scope.btn_reserve = {
        text: 'دریافت وقت ویزیت',
        type: 'default',
        width: '50%',
        height: 45,
        rtlEnabled: true,
        onClick: function (e) {
            document.getElementById("selectDoctor").style.display = "block"
        }
    };





    function getWeekdays(phone, weekdays) {
        $http.get("http://localhost:63136/api/ExistTime/" + phone).then(function (response) {
            $scope.Patients = response.data;
            $scope.Patients.forEach(function (x) {
                $scope.PatientsTime = x.Time
            })
        });


        $http.get("http://localhost:63136/api/ExistTime/" + phone).then(function (response) {
            $scope.Patient = JSON.stringify(response)


            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/0").then(function (response) {
                var data = response.data;
                $scope.sunDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(0) + "/" + $scope.MonthNum + "/" + $scope.Year + "/0/" + $scope.time) == -1) {
                            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/0/" + $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.sunDay.length; i++) { }
                                $scope.sunDay[i] = $scope.records
                            });
                        }
                    }
                });


            });

            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/1").then(function (response) {
                var data = response.data;
                $scope.monDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(1) + "/" + $scope.MonthNum + "/" + $scope.Year + "/1/" + $scope.time) == -1) {
                            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/1/" + $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.monDay.length; i++) { }
                                $scope.monDay[i] = $scope.records
                            });
                        }
                    }
                });
            });

            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/2").then(function (response) {
                var data = response.data;
                $scope.tuesDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(2) + "/" + $scope.MonthNum + "/" + $scope.Year + "/2/" + $scope.time) == -1) {
                            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/2/" + $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.tuesDay.length; i++) { }
                                $scope.tuesDay[i] = $scope.records
                            });
                        }
                    }
                });

            });

            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/3").then(function (response) {
                var data = response.data;
                $scope.wednesDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(3) + "/" + $scope.MonthNum + "/" + $scope.Year + "/3/" + $scope.time) == -1) {
                            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/3/" + $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.wednesDay.length; i++) { }
                                $scope.wednesDay[i] = $scope.records
                            });
                        }
                    }
                });

            });

            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/4").then(function (response) {
                var data = response.data;
                $scope.thursDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(4) + "/" + $scope.MonthNum + "/" + $scope.Year + "/4/" + $scope.time) == -1) {
                            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/4/" + $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.thursDay.length; i++) { }
                                $scope.thursDay[i] = $scope.records
                            });
                        }
                    }
                });


            });

            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/5").then(function (response) {
                var data = response.data;
                $scope.friDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(5) + "/" + $scope.MonthNum + "/" + $scope.Year + "/5/" + $scope.time) == -1) {
                            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/5/" + $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.friDay.length; i++) { }
                                $scope.friDay[i] = $scope.records
                            });
                        }
                    }
                });


            });

            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/6").then(function (response) {
                var data = response.data;
                $scope.saturDay = [];
                data.forEach(function (y) {
                    $scope.time = y.StartTime

                    if ($scope.time !== $scope.PatientsTime) {
                        if ($scope.Patient.indexOf(calDate(6) + "/" + $scope.MonthNum + "/" + $scope.Year + "/6/" + $scope.time) == -1) {
                            $http.get("http://localhost:63136/api/VisitingTimes/" + phone + "/6/" + $scope.time).then(function (response) {
                                $scope.records = response.data
                                for (var i = 0; i < $scope.saturDay.length; i++) { }
                                $scope.saturDay[i] = $scope.records
                            });
                        }
                    }
                });
            });
        });

        document.getElementById("form").style.display = "block";
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




    $scope.btn_MRKH = {
        text: 'ميخواهم توسط دكتر محمدرضا خدابخش پذيرش و درمان شوم',
        type: 'default',
        width: '100%',
        height: 45,
        rtlEnabled: true,
        onClick: function (e) {
            document.getElementById("form").style.display = "block";
            $scope.entity.Doctor = "محمدرضا خدابخش"
            getWeekdays("09152283268", "0011001");
        }
    };

    $scope.btn_other = {
        text: 'ميخواهم توسط روانشناسان ديگر زير نظر ايشان پذيرش شوم',
        type: 'default',
        width: '100%',
        height: 45,
        rtlEnabled: true,
        onClick: function (e) {
            document.getElementById("chooseDoctor").style.display = "block"
        }
    };

    $scope.selectDoctor = {
        showTitle: false,
        dragEnabled: false,
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: "selectDr_visible",
        }
    };

    $scope.form = {
        shading: false,
        showTitle: true,
        dragEnabled: true,
        visible: false,
        fullScreen: true,
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: 'form_visible',


        }
    };

    $scope.chooseDoctor = {
        shading: false,
        showTitle: true,
        dragEnabled: true,
        visible: false,
        fullScreen: true,
        closeOnOutsideClick: true,
        bindingOptions: {
            visible: 'chooseDoctor_visible',
        }
    };

    $scope.scrollViewOptions = {
        width: '100%',
        height: '100%'
    };



    $http.get("http://localhost:63136/api/Psychoanalysts").then(function (response) {
        $scope.Psychoanalysts = response.data;
    });


    $scope.timeRegistration = function (starttime, endtime) {
        $scope.entity.Time = starttime + "-" + endtime;
        $scope.time_entity.Time = starttime + "-" + endtime;
        $scope.registeredTime = starttime;
        $scope.entity.Date = $scope.entity.Date 
        $scope.time_entity.Date = $scope.time_entity.Date + $scope.registeredTime
    }




    $scope.show = function (name, lastname, weekdays, phone) {
        $http.get("http://localhost:63136/api/Psychoanalysts").then(function (response) {
            $scope.Psychoanalysts = response.data;
        });

        $scope.entity.Doctor = phone;
        $scope.time_entity.Doctor = phone;
        getWeekdays(phone, weekdays);





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


    document.getElementById("dateSun").innerHTML = calDate();
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
        $scope.entity.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(6) 
        $scope.time_entity.Date = calDate(6) + "/" + $scope.MonthNum + "/" + $scope.Year + "/6/"
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
        document.getElementById("popSun").style.display = "block";
        $scope.entity.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(0)
        $scope.time_entity.Date = calDate() + "/" + $scope.MonthNum + "/" + $scope.Year + "/0/"
        document.getElementById("sun").style.backgroundColor = "#ff9900"
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
        $scope.entity.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(1)
        $scope.time_entity.Date = calDate(1) + "/" + $scope.MonthNum + "/" + $scope.Year + "/1/"
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
        $scope.entity.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(2)
        $scope.time_entity.Date = calDate(2) + "/" + $scope.MonthNum + "/" + $scope.Year + "/2/"
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
        $scope.entity.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(3)
        $scope.time_entity.Date = calDate(3) + "/" + $scope.MonthNum + "/" + $scope.Year + "/3/"
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
        $scope.entity.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(4)
        $scope.time_entity.Date = calDate(4) + "/" + $scope.MonthNum + "/" + $scope.Year + "/4/"
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
        $scope.entity.Date = $scope.Year + "/" + $scope.MonthNum + "/" + calDate(5)
        $scope.time_entity.Date = calDate(5) + "/" + $scope.MonthNum + "/" + $scope.Year + "/5/"
        document.getElementById("fri").style.backgroundColor = "#ff9900"
    };





    ////////////////////////////////////////////


}]);


