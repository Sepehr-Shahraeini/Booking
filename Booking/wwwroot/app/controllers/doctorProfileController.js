app.controller('doctorProfileController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', '$q', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, $q, fileReader, $timeout) {
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


    function convertDate(x) {
        var day = { 'day': '2-digit' };
        var month = { 'month': 'long' };
        var monthNum = { 'month': '2-digit' };
        var year = { 'year': 'numeric' };

        var result = x.toLocaleString('en-US', year) + '-' + x.toLocaleString('en-US', monthNum) + '-' + x.toLocaleString('en-US', day);
        return result;
    }

    function thisMonth(x) {
        var monthNum = { 'month': '2-digit' };

        var result = x.toLocaleString('fa-Ir', monthNum).replace(/([۰-۹])/g, token => String.fromCharCode(token.charCodeAt(0) - 1728));;
        return result;
    }

    $scope.yFromDate = new Date();
    $scope.yToDate = $scope.yFromDate.addDays(365);

    $scope.yFrom = convertDate($scope.yFromDate);
    $scope.yTo = convertDate($scope.yToDate);

    ////////////////////////////////

    $scope.monthsBoxBack = function () {
        document.getElementById("monthsBox").style.display = "block"
        document.getElementById("daysBox").style.display = "none"
    }

    $scope.daysBoxBack = function () {
        document.getElementById("daysBox").style.display = "block"
        document.getElementById("timesBox").style.display = "none"
    }

    ///////////////////////////////


    authService.PsychoanalystById($rootScope.psychoanalystId).then(function (res) {
        $scope.doctorInfo = res.data;
    })

    $scope.thisMonthNo = thisMonth(new Date())

    authService.psychoanalystMonths($rootScope.psychoanalystId, 1400).then(function (res) {


        $scope.doctorAvailabeMonth = res.data
        $scope.getDays = function (Pyear, PMonth) {

            document.getElementById("monthsBox").style.display = "none"

            authService.Days($rootScope.psychoanalystId, Pyear, PMonth).then(function (res) {
                $scope.doctorAvailabeDays = res.data
                document.getElementById("daysBox").style.display = "block"



            })
        }
    });

    ///////////////////////////

    $scope.getTimes = function (DateId) {
        authService.Times($rootScope.psychoanalystId, DateId).then(function (res) {
            $scope.Times = res.data;

        })
        document.getElementById("daysBox").style.display = "none"
        document.getElementById("timesBox").style.display = "block"
    }

    ////////////////////////// 

    $scope.registerTime = function (starttime, endtime, availableTimeId, gdate, pdate) {
        var data = {
            Id: availableTimeId,
            PatientId: $rootScope.PatientId
        };

        $rootScope.availableTimeId = availableTimeId

        authService.checkConfirmDate(availableTimeId).then(function (res) {
            if (res.data.IsSuccess) {

                $location.path("/factor")

                authService.editConfirmedDate(data).then(function (res) {

                });

                $rootScope.PsychoanalystId = $scope.psychoanalystId
                $rootScope.DatePersian = pdate
                $rootScope.DateAmount = pdate
                $rootScope.Time = starttime + '-' + endtime

            } else {
                    alert("دقایقی پیش این وقت رزرو شد");

            }

        })



    }

}]);