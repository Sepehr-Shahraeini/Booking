'use strict';
app.factory('Psychoanalyst', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$location', '$rootScope', function ($http, $q, localStorageService, ngAuthSettings, $location, $rootScope) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};




    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };

    
    var _newPsychoanalyst = function (newPsychoanalyst) {
        return $http.post(serviceBase + 'api/Psychoanalysts', newPsychoanalyst).then(function (response) {
            return response;
        })
    }

    var _newVisitingTime = function (newVisitingTime) {
         $http.post(serviceBase + 'api/VisitingTimes', newVisitingTime).then(function (response) {
            return response;
        })
    }

    var _newUser = function (newUserData) {
        return $http.post(serviceBase + 'api/auth/user', newUserData).then(function (response) {
            return response;
        })
    }

     var _VisitingTime = function (newVisitingTime) {
        return $http.get(serviceBase + 'api/VisitingTimes').then(function (response) {
            return response;
        })
    }

    var _VisitingTimeByPhone = function (phone, weekday) {
        return $http.get(serviceBase + 'api/VisitingTimes/' + phone + "/" +  weekday).then(function (response) {
            return response;
            console.log(serviceBase + 'api/VisitingTimes/' + phone + "/" + weekday)
        })
    }


    authServiceFactory.newPsychoanalyst = _newPsychoanalyst;
    authServiceFactory.newVisitingTime = _newVisitingTime;
    authServiceFactory.VisitingTimeByPhone = _VisitingTimeByPhone;
    authServiceFactory.newUser = _newUser;
    authServiceFactory.VisitingTime = _VisitingTime;
    authServiceFactory.IsAuthurized = function () {


        return authServiceFactory.authentication.isAuth;
    };


    return authServiceFactory;
}]);

