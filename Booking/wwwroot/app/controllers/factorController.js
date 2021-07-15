'use strict';
app.controller('factorController', ['$scope', '$routeParams', '$location', 'authService', 'ngAuthSettings', '$rootScope', 'orderService', '$http', 'Psychoanalyst', function ($scope, $routeParams, $location, authService, ngAuthSettings, $rootScope, orderService, $http, Psychoanalyst) {


    authService.PsychoanalystById($rootScope.PsychoanalystId).then(function (response) {
        
        angular.forEach(response.data, function (x) {

            $scope.PsychoanalystName = x.Name + " " + x.LastName
        })
    })


    $scope.btn_edit = function () {
        $location.path("/edit")
    } 

    $scope.btn_pay = function () {
        alert("این پاپ اپ به صورت موقت قرار دارد و پس از دریافت درگاه پرداخت با فشار دادن دکمه پرداخت به درگاه پرداخت هدایت میشوید  ")

        
        var dto_calendar = {
            Amount: $rootScope.Amount,
            TrackingNO: $rootScope.TrackingNO,
            IsEmergency: true,
            PatientId: $rootScope.Id,
            PsychoanalystId: $rootScope.PsychoanalystId,
            DatePersian: $rootScope.DatePersian,
            DateAmount: $rootScope.DateAmount,
            time: $rootScope.Time

        }

        console.log(dto_calendar)

        authService.saveCalendar(dto_calendar).then(function (response) {

        })


    }
}]);