'use strict';
app.controller('adminCustomerController', ['$scope', '$routeParams', '$location', 'authService', 'ngAuthSettings', '$rootScope', 'orderService', '$http', 'Psychoanalyst', function ($scope, $routeParams, $location, authService, ngAuthSettings, $rootScope, orderService, $http, Psychoanalyst) {

    $scope.entity_Psychoanalysts = {
        Name: null,
        LastName: null,
        Phone: null,
        WeekDays: null
    };

    $scope.entity_VisitingTime = {
        StartTime: null,
        EndTime: null,
        Mobile: null
    };

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

    $scope.entity_User = {
        UserName: null,
        Password: "123456"
    };

    $scope.entity_password = {
        ID: null,
        UserName: null,
        Password: null
    }

    $scope.entity_deleteUser = {
        ID: null,
        UserName: null
    }

    $scope.entity_WeekDays = {
        Saturday: "0",
        Sunday: "0",
        Monday: "0",
        Tuesday: "0",
        Wednesday: "0",
        Thursday: "0",
        Friday: "0"
    }

    $scope.txt_lastName = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        placeholder: ' نام خانوادگی',
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_Psychoanalysts.LastName',

        }
    };

    $scope.txt_firstName = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        placeholder: 'نام',
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_Psychoanalysts.Name',

        }
    };

    $scope.txt_phone = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        placeholder: 'تلفن همراه',
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity_Psychoanalysts.Phone',

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

            $scope.entity_WeekDays.Saturday = "1"
            $scope.entity_VisitingTime.WeekDays = "6"
            $scope.entity_updateTime.Weekdays = "6"

            if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
                document.getElementById("formChangeVisitingTime").style.display = "block"
                document.getElementById("changeVisitingTimeDay").style.display = "none"
              } else {
                document.getElementById("popup_time").style.display = "block"
            }
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

            $scope.entity_WeekDays.Saturday = "1"
            $scope.entity_VisitingTime.WeekDays = "0"
            $scope.entity_updateTime.Weekdays = "0"

            if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
                document.getElementById("formChangeVisitingTime").style.display = "block"
                document.getElementById("changeVisitingTimeDay").style.display = "none"
            } else {
                document.getElementById("popup_time").style.display = "block"
            }
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

            $scope.entity_WeekDays.Saturday = "1"
            $scope.entity_VisitingTime.WeekDays = "1"
            $scope.entity_updateTime.Weekdays = "1"

            if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
                document.getElementById("formChangeVisitingTime").style.display = "block"
                document.getElementById("changeVisitingTimeDay").style.display = "none"
            } else {
                document.getElementById("popup_time").style.display = "block"
            }
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

            $scope.entity_WeekDays.Saturday = "1"
            $scope.entity_VisitingTime.WeekDays = "2"
            $scope.entity_updateTime.Weekdays = "2"

            if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
                document.getElementById("formChangeVisitingTime").style.display = "block"
                document.getElementById("changeVisitingTimeDay").style.display = "none"
            } else {
                document.getElementById("popup_time").style.display = "block"
            }
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

            $scope.entity_WeekDays.Saturday = "1"
            $scope.entity_VisitingTime.WeekDays = "3"
            $scope.entity_updateTime.Weekdays = "3"

            if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
                document.getElementById("formChangeVisitingTime").style.display = "block"
                document.getElementById("changeVisitingTimeDay").style.display = "none"
            } else {
                document.getElementById("popup_time").style.display = "block"
            }document.getElementById("formChangeVisitingTime").style.display = "block"
            
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

            $scope.entity_WeekDays.Saturday = "1"
            $scope.entity_VisitingTime.WeekDays = "4"
            $scope.entity_updateTime.Weekdays = "4"

            if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
                document.getElementById("formChangeVisitingTime").style.display = "block"
                document.getElementById("changeVisitingTimeDay").style.display = "none"
            } else {
                document.getElementById("popup_time").style.display = "block"
            }
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

            $scope.entity_WeekDays.Saturday = "1"
            $scope.entity_VisitingTime.WeekDays = "5"
            $scope.entity_updateTime.Weekdays = "5"

            if (document.getElementById("changeVisitingTimeDay").style.display == "block") {
                document.getElementById("formChangeVisitingTime").style.display = "block"
                document.getElementById("changeVisitingTimeDay").style.display = "none"
            } else {
                document.getElementById("popup_time").style.display = "block"
            }
        }
    }

    $scope.editTime = false

    $scope.registeredTime = function (startTime, endTime, mobile, id, weekday) {
        $scope.entity_Time.EndTimeHour = endTime[0] + endTime[1]
        $scope.entity_Time.EndTimeMinute = endTime[3] + endTime[4]
        $scope.entity_Time.StartTimeHour = startTime[0] + startTime[1]
        $scope.entity_Time.StartTimeMinute = startTime[3] + startTime[4]

        $scope.entity_updateTime.Id = id
        $scope.entity_updateTime.Mobile = mobile
        $scope.editTime = true
    }



    $scope.btn_saveTime = {
        text: 'تایید',
        type: 'default',
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {

            Psychoanalyst.newVisitingTime($scope.entity_VisitingTime, function (response) {

            })
            alert("زمان ذخیره شد")

            $scope.entity_VisitingTime.Mobile = $scope.entity_Psychoanalysts.Phone;
            $scope.entity_User.UserName = $scope.entity_Psychoanalysts.Phone;
            $scope.entity_VisitingTime.StartTime = $scope.entity_Time.StartTimeHour + ":" + $scope.entity_Time.StartTimeMinute
            $scope.entity_VisitingTime.EndTime = $scope.entity_Time.EndTimeHour + ":" + $scope.entity_Time.EndTimeMinute

            $scope.entity_Time.EndTimeHour = null
            $scope.entity_Time.EndTimeMinute = null
            $scope.entity_Time.StartTimeHour = null
            $scope.entity_Time.StartTimeMinute = null



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

    $scope.btn_rememberVisitingTime = {
        text: 'تایید',
        type: 'default',
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            document.getElementById('btn_saveTime').style.display = 'none'
            document.getElementById('btn_editTime').style.display = 'block'
            document.getElementById('btn_deleteTime').style.display = 'block'
            document.getElementById('btn_saveWeekDay').style.display = 'block'
            document.getElementById('btn_rememberVisitingTime').style.display = 'none'

            Psychoanalyst.VisitingTimeByPhone($scope.entity_Psychoanalysts.Phone, $scope.entity_VisitingTime.WeekDays).then(function (response) {
                $scope.ExistTime = response.data
            })
        }
    }

    $scope.btn_saveWeekDay = {
        text: 'تایید',
        type: 'default',
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            document.getElementById('btn_saveTime').style.display = 'block'
            document.getElementById('popup_time').style.display = 'none'
            document.getElementById('btn_editTime').style.display = 'none'
            document.getElementById('btn_deleteTime').style.display = 'none'
            document.getElementById('btn_rememberVisitingTime').style.display = 'block'
            document.getElementById('btn_saveWeekDay').style.display = 'none'

            $scope.ExistTime = null
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

    $scope.btn_save = {
        text: 'تایید',
        type: 'default',
        width: '100%',
        height: 45,
        rtlEnabled: true,
        validationGroup: 'signup',
        onClick: function (e) {
            $scope.popup_new_visible = false;
            weekDaysSum();
            Psychoanalyst.newPsychoanalyst($scope.entity_Psychoanalysts, function () {

            })

            Psychoanalyst.newUser($scope.entity_User, function () { })

            console.log($scope.entity_User)


            console.log($scope.entity_Psychoanalysts.WeekDays)

        }
    };

    $scope.btn_new = {
        text: 'روانکاو جدید',
        onClick: function (e) {
            document.getElementById("popup_new").style.display = "block"
        }
    };

    $scope.popup_new = {
        shading: false,
        fullScreen: true,
        showTitle: true,
        dragEnabled: true,

        visible: false,

        closeOnOutsideClick: false,

        bindingOptions: {
            visible: 'popup_new_visible',
        }
    };

    $scope.popup_time = {
        shading: false,
        fullScreen: true,
        showTitle: true,
        dragEnabled: true,

        visible: false,

        closeOnOutsideClick: false,

        bindingOptions: {
            visible: 'popup_time_visible',
        }
    };

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

    $scope.btn_changePassword = {
        text: 'تغییر رمز',
        validationGroup: 'form',
        onClick: function (e) {
            document.getElementById("formChangePassword").style.display = "block"

        }
    }

    $scope.btn_changeVisitingTime = {
        text: 'تغییر زمان',
        validationGroup: 'form',
        onClick: function (e) {
            document.getElementById("changeVisitingTimeDay").style.display = "block"
        }
    }

    $scope.btn_deleteUser = {
        text: 'حذف روانکاو',
        validationGroup: 'form',
        onClick: function (e) {
            document.getElementById("PsychoanalystsForm").style.display = "block"

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
            document.getElementById("formChangePassword").style.display = "none"


        }
    }

    $scope.deleteUser = function (id, name) {

        $scope.entity_deleteUser.ID = id;
        $scope.entity_deleteUser.UserName = name;

        console.log($scope.entity_deleteUser)
        document.getElementById("deletePopup").style.display = "block"

    }

    $scope.sureDelete = function () {
        authService.deleteUser($scope.entity_deleteUser.ID).then(function (response) {
            console.log(response)
        })

        authService.deletePsychoanalyst($scope.entity_deleteUser.ID).then(function (response) {
            console.log(response)
        })

        document.getElementById("deletePopup").style.display = "none"
        document.getElementById("PsychoanalystsForm").style.display = "none"
    }


    $scope.notSureDelete = function () {
        document.getElementById("deletePopup").style.display = "none"
        document.getElementById("PsychoanalystsForm").style.display = "none"
    }


    authService.getPatients().then(function (response) {
        $scope.patients = response.data;
    })

    $http.get("http://localhost:51329/api/Psychoanalysts").then(function (response) {
        $scope.Psychoanalysts = response.data;

    });

    function weekDaysSum() {
        $scope.entity_Psychoanalysts.WeekDays = $scope.entity_WeekDays.Sunday +
            $scope.entity_WeekDays.Monday +
            $scope.entity_WeekDays.Tuesday +
            $scope.entity_WeekDays.Wednesday +
            $scope.entity_WeekDays.Thursday +
            $scope.entity_WeekDays.Friday +
            $scope.entity_WeekDays.Saturday;
    }

    //////////////////////////////////////////////////
}]);