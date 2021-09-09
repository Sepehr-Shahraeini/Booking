app.controller('UserController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http) {

    $scope.entity_password = {
        UserName: null,
        Password: null
    }

    $scope.entity_Time = {
        StartTimeHour: null,
        StartTimeMinute: null,
        EndTimeHour: null,
        EndTimeMinute: null,
    }

    $scope.entity_updateTime = {
        Id: null,
        Mobile: null,
        Weekdays: null,
        StartTime: null,
        EndTime: null
    }

    $scope.txt_Password = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        placeholder: '',
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_password.Password',

        }
    };


    $scope.txt_UserName = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        placeholder: '',
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_password.UserName',

        }
    };


    $scope.txt_endTime_hour = {
        hoverStateEnabled: false,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_Time.EndTimeHour',

        }
    };

    $scope.txt_endTime_minute = {
        hoverStateEnabled: false,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_Time.EndTimeMinute',

        }
    };

    $scope.txt_startTime_hour = {
        hoverStateEnabled: false,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_Time.StartTimeHour',

        }
    };

    $scope.txt_startTime_minute = {
        hoverStateEnabled: false,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_Time.StartTimeMinute',

        }
    };



    $scope.btn_changePassword = {
        text: 'تغییر رمز',
        validationGroup: 'form',
        onClick: function (e) {
            document.getElementById("formChangePassword").style.display = "block"

        }
    }


    $scope.btn_newPassword = {
        text: 'تایید',
        type: 'default',
        rtlEnabled: true,
        validationGroup: 'form',
        onClick: function () {

            authService.getUserByUsername($scope.entity_password.UserName).then(function (response) {
                var data = [response.data];
                angular.forEach(data, function (x) {
                    $scope.Id = x.ID
                    $scope.entity_password.ID = $scope.Id
                });

                authService.changePassword($scope.Id, $scope.entity_password).then(function (response) {
                    console.log(response)
                });

            })
        }
    }


    $scope.btn_sat = {
        text: 'شنبه',
        type: 'default',
        width: '48%',
        height: 40,
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.visitingTimeByDrPhone("6").then(function (response) {
                $scope.ExistTime = response.data
            })
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
            $scope.entity_updateTime.Weekdays = "6"
        }
    }


    $scope.btn_sun = {
        text: 'یکشنبه',
        type: 'default',
        width: '48%',
        height: 40,
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.visitingTimeByDrPhone("0").then(function (response) {
                $scope.ExistTime = response.data
            })

            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
            $scope.entity_updateTime.Weekdays = "0"
        }
    }


    $scope.btn_mon = {
        text: 'دوشنبه',
        type: 'default',
        width: '48%',
        height: 40,
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.visitingTimeByDrPhone("1").then(function (response) {
                $scope.ExistTime = response.data
            })
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
            $scope.entity_updateTime.Weekdays = "1"
        }
    }


    $scope.btn_tues = {
        text: 'سه شنبه',
        type: 'default',
        width: '48%',
        height: 40,
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.visitingTimeByDrPhone("2").then(function (response) {
                $scope.ExistTime = response.data
            })
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
            $scope.entity_updateTime.Weekdays = "2"
        }
    }


    $scope.btn_wend = {
        text: 'چهارشنبه',
        type: 'default',
        width: '48%',
        height: 40,
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.visitingTimeByDrPhone("3").then(function (response) {
                $scope.ExistTime = response.data
            })
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
            $scope.entity_updateTime.Weekdays = "3"

        }
    }


    $scope.btn_thurs = {
        text: 'پنج شنبه',
        type: 'default',
        width: '48%',
        height: 40,
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.visitingTimeByDrPhone("4").then(function (response) {
                $scope.ExistTime = response.data
            })
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
            $scope.entity_updateTime.Weekdays = "4"
        }
    }


    $scope.btn_fri = {
        text: 'جمعه',
        type: 'default',
        width: '48%',
        height: 40,
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.visitingTimeByDrPhone("5").then(function (response) {
                $scope.ExistTime = response.data
            })
            document.getElementById("formChangeVisitingTime").style.display = "block"
            document.getElementById("changeVisitingTimeDay").style.display = "none"
            $scope.entity_updateTime.Weekdays = "5"
        }
    }

    $scope.btn_changeVisitingTime = {
        text: 'تغییر زمان',
        validationGroup: 'form',
        onClick: function (e) {
            document.getElementById("changeVisitingTimeDay").style.display = "block"
        }
    }

    $scope.btn_editTime = {
        text: 'ذخیره',
        type: 'default',
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.editVisitingTime($scope.entity_updateTime.Id, $scope.entity_updateTime).then(function (response) {

                $scope.entity_Time.EndTimeHour = null
                $scope.entity_Time.EndTimeMinute = null
                $scope.entity_Time.StartTimeHour = null
                $scope.entity_Time.StartTimeMinute = null
                $scope.editTime = false
                alert("زمان ویرایش شد")

            })

            $scope.entity_updateTime.StartTime = $scope.entity_Time.StartTimeHour + ":" + $scope.entity_Time.StartTimeMinute
            $scope.entity_updateTime.EndTime = $scope.entity_Time.EndTimeHour + ":" + $scope.entity_Time.EndTimeMinute

        }
    }

    $scope.btn_deleteTime = {
        text: 'حذف',
        type: 'danger',
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            authService.deleteVisitingTime($scope.entity_updateTime.Id).then(function () {
                alert("زمان حذف شد")
            })

            $scope.entity_Time.EndTimeHour = null;
            $scope.entity_Time.EndTimeMinute = null;
            $scope.entity_Time.StartTimeHour = null;
            $scope.entity_Time.StartTimeMinute = null;
        }
    }

    $scope.registeredTime = function (startTime, endTime, mobile, id, weekday) {
        $scope.entity_Time.EndTimeHour = endTime[0] + endTime[1]
        $scope.entity_Time.EndTimeMinute = endTime[3] + endTime[4]
        $scope.entity_Time.StartTimeHour = startTime[0] + startTime[1]
        $scope.entity_Time.StartTimeMinute = startTime[3] + startTime[4]

        $scope.entity_updateTime.Id = id
        $scope.entity_updateTime.Mobile = mobile
        $scope.editTime = true
    }



    authService.getPatients().then(function (response) {
        $scope.patients = response.data;
    })


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