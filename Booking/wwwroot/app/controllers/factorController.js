'use strict';
app.controller('factorController', ['$scope', '$routeParams', '$location', 'authService', 'ngAuthSettings', '$rootScope', 'orderService', '$http', 'Psychoanalyst', function ($scope, $routeParams, $location, authService, ngAuthSettings, $rootScope, orderService, $http, Psychoanalyst) {


    authService.PsychoanalystById($rootScope.PsychoanalystId).then(function (response) {
        
        angular.forEach(response.data, function (x) {

            $scope.PsychoanalystName = x.Name + " " + x.LastName
        })
    })


   

    $scope.btn_pay = function () {
        alert("این پاپ اپ به صورت موقت قرار دارد و پس از دریافت درگاه پرداخت با فشار دادن دکمه پرداخت به درگاه پرداخت هدایت میشوید  ")

        
        var dto_calendar = {
            Amount: $rootScope.Amount,
            TrackingNO: $rootScope.TrackingNO,
            IsEmergency: true,
            PatientId: $rootScope.PatientId,
            PsychoanalystId: $rootScope.PsychoanalystId,
            DateAmount: $rootScope.DateAmount,
            AvailableId: $rootScope.availableTimeId,
            
        }

        authService.saveCalendar(dto_calendar).then(function (response) {

            $rootScope.PatientId = null;
            $rootScope.Name = null;
            $rootScope.LastName = null;
            $rootScope.Mobile = null;
            $rootScope.Subject = null;
            $rootScope.Reason = null;
            $rootScope.Email = null;
            $rootScope.MaritalStatus = null;
            $rootScope.Age = null;
            $rootScope.ChildrenNum = null;
            $rootScope.Introduced = null;
            $rootScope.Education = null;
            $rootScope.Job = null;
            $rootScope.FieldOfStudy = null;
            $rootScope.Amount = null;
            $rootScope.TrackingNO = null;
        })


    }
}]);