'use strict';
app.controller('adminCustomerController', ['$scope', '$routeParams', '$location', 'authService', 'ngAuthSettings', '$rootScope', 'orderService', '$http', 'Psychoanalyst', function ($scope, $routeParams, $location, authService, ngAuthSettings, $rootScope, orderService, $http, Psychoanalyst) {

    Psychoanalyst.GetPsychoanalystId($rootScope.drPhone).then(function (response) {
        var data = response.data;
        angular.forEach(data, function (x) {
            $scope.Id = x.ID
        });

        authService.getPatients($scope.Id).then(function (response) {
            $scope.patients = response.data;
        })
    })
}]);