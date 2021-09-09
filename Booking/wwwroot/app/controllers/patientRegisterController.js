app.controller('patientRegisterController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', 'localStorageService', '$http', 'Psychoanalyst', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, localStorageService, Psychoanalyst) {

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



    $scope.signedUp = function () {
        $location.path('/patientLogin')
    }

    $scope.MaritalStatusList = ["متاهل", "مجرد"];;
    $scope.EducationList = ["سیکل", "دیپلم", "فوق دیپلم" , "لیسانس", "فوق لیسانس" ,"دکترا"];

      

    $scope.btn_showPsychoanalyst = function () {

        if ($scope.Name == null || $scope.LastName == null || $scope.Mobile == null || $scope.Email == null || $scope.Age == null || $scope.ChildrenNum == null || $scope.Job == null || $scope.FieldOfStudy == null || $scope.MaritalStatus == null || $scope.Subject == null || $scope.Introduced == null || $scope.Password == null || $scope.ConfirmPassword == null || $scope.Education == null) {

            if ($scope.Name == null) {
                document.getElementById("name").style.display = "inline-block";
            } else {
                document.getElementById("name").style.display = "none";
            }

            if ($scope.LastName == null) {
                document.getElementById("lastname").style.display = "inline-block";
            } else {
                document.getElementById("name").style.display = "none";
            }

            if ($scope.Age == null) {
                document.getElementById("age").style.display = "inline-block";
            } else {
                document.getElementById("age").style.display = "none";
            }

            if ($scope.Mobile == null) {
                document.getElementById("mobile").style.display = "inline-block";
            } else {
                document.getElementById("mobile").style.display = "none";
                var regex = /^[0-9]\d{10}$/;
                if (regex.test($scope.Mobile) === false) {
                    document.getElementById("checkMobile").style.display = "inline-block";
                } else {
                    document.getElementById("checkMobile").style.display = "none";
                }
            }

           

            if ($scope.Email == null) {
                document.getElementById("email").style.display = "inline-block";
            } else {
                document.getElementById("email").style.display = "none";
            }

            if ($scope.MaritalStatus == null) {
                document.getElementById("marital").style.display = "inline-block";
            } else {
                document.getElementById("marital").style.display = "none";
            }

            if ($scope.Password == null) {
                document.getElementById("password").style.display = "inline-block";
            } else {
                document.getElementById("password").style.display = "none";
            }

            if ($scope.ConfirmPassword == null) {
                document.getElementById("confirmPassword").style.display = "inline-block";
            } else {
                document.getElementById("confirmPassword").style.display = "none";
            }

            if ($scope.Reason == null) {
                document.getElementById("reason").style.display = "inline-block";
            } else {
                document.getElementById("reason").style.display = "none";
            }

            if ($scope.Subject == null) {
                document.getElementById("subject").style.display = "inline-block";
            } else {
                document.getElementById("subject").style.display = "none";
            }

            if ($scope.ChildrenNum == null) {
                document.getElementById("childNo").style.display = "inline-block";
            } else {
                document.getElementById("childNo").style.display = "none";
            }

            if ($scope.Education == null) {
                document.getElementById("education").style.display = "inline-block";
            } else {
                document.getElementById("education").style.display = "none";
            }

            if ($scope.Job == null) {
                document.getElementById("job").style.display = "inline-block";
            } else {
                document.getElementById("job").style.display = "none";
            }

            if ($scope.FieldOfStudy == null) {
                document.getElementById("fieldOfStudy").style.display = "inline-block";
            } else {
                document.getElementById("fieldOfStudy").style.display = "none";
            }

            if ($scope.Introduced == null) {
                document.getElementById("introduced").style.display = "inline-block";
            } else {
                document.getElementById("introduced").style.display = "none";
            }

        } else {

            authService.checkPatient($scope.Mobile).then(function (res) {
                console.log(res)
                if (res.data.IsSuccess == true) {

                    $location.path("/doctors");





                    $rootScope.Name = $scope.Name,
                        $rootScope.LastName = $scope.LastName,
                        $rootScope.Mobile = $scope.Mobile,
                        $rootScope.Subject = $scope.Subject,
                        $rootScope.Reason = $scope.Reason,
                        $rootScope.Email = $scope.Email,
                        $rootScope.MaritalStatus = $scope.MaritalStatus,
                        $rootScope.Age = $scope.Age,
                        $rootScope.ChildrenNum = $scope.ChildrenNum,
                        $rootScope.Introduced = $scope.Introduced,
                        $rootScope.Education = $scope.Education,
                        $rootScope.Job = $scope.Job,
                        $rootScope.FieldOfStudy = $scope.FieldOfStudy,
                        $rootScope.Amount = "170000",
                        $rootScope.TrackingNO = 230

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
                    }

                    var dto_patientAccount = {
                        UserName: $scope.Mobile,
                        Password: $scope.Password,
                        Role: 1
                    }

                    authService.patientRegistration(dto_Patient).then(function (response) {
                        $rootScope.PatientId = response.data

                        Psychoanalyst.newUser(dto_patientAccount).then(function () { })
                    });

                } else {
                    //document.getElementById("choosePsychoanalyst").style.display = "block";
                    alert("این نام کاربری قبلا ثبت شده است ")
                }
            })
        }
    }

    ////////////////////////////////////

}]);