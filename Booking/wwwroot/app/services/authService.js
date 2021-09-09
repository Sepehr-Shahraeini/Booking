﻿'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$location', '$rootScope', function ($http, $q, localStorageService, ngAuthSettings, $location, $rootScope) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };

    var _login = function (loginData) {

        var data = loginData

        
        $rootScope.drPhone = loginData.UserName;

        
        if (loginData.useRefreshTokens) {
            // data = data + "&client_id=" + ngAuthSettings.clientId;
        }
        var deferred = $q.defer();


        $http.post(serviceBase + 'api/user/login', data, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            var responseData = response.data;
            angular.forEach(responseData, function (x) {
                var token = x
                if (loginData.useRefreshTokens) {
                    localStorageService.set('authorizationData', {
                        token: token, userName: loginData.UserName, refreshToken: responseData.refresh_token, expires: responseData['.expires'], useRefreshTokens: true
                    });
                }
                else {
                    localStorageService.set('authorizationData', { token: token, userName: loginData.UserName, refreshToken: "", expires: responseData['.expires'], useRefreshTokens: false });
                }
            })




            localStorageService.set('userData', { Name: responseData.Name, UserId: responseData.UserId, Image: responseData.Image, Role: responseData.Role, UserName: loginData.userName, AuthId: responseData.AuthId });
            _authentication.isAuth = true;
            _authentication.userName = loginData.UserName;
            _authentication.useRefreshTokens = loginData.useRefreshTokens;
            $rootScope.userName = loginData.UserName;
            $rootScope.userTitle = responseData.Name;
            $rootScope.userId = responseData.UserId;
            $rootScope.authId = responseData.AuthId;
            $rootScope.image = $rootScope.imagesUrl + responseData.Image;
            $rootScope.role = responseData.Role;
            $rootScope.isSignedIn = true;
            deferred.resolve(response);

        }, function (err, status) {
            //alert('ex');
            //console.log(err);
            // _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _patientLogin = function (loginData) {

        var data = loginData
        $rootScope.drPhone = loginData.UserName;

        if (loginData.useRefreshTokens) {
            // data = data + "&client_id=" + ngAuthSettings.clientId;
        }
        var deferred = $q.defer();


        $http.post(serviceBase + 'api/patient/login', data, { headers: { 'Content-Type': 'application/json' } }).then(function (response) {
            var responseData = response.data;
            angular.forEach(responseData, function (x) {
                var token = x
                if (loginData.useRefreshTokens) {
                    localStorageService.set('authorizationData', {
                        token: token, userName: loginData.UserName, refreshToken: responseData.refresh_token, expires: responseData['.expires'], useRefreshTokens: true
                    });
                }
                else {
                    localStorageService.set('authorizationData', { token: token, userName: loginData.UserName, refreshToken: "", expires: responseData['.expires'], useRefreshTokens: false });
                }
            })




            localStorageService.set('userData', { Name: responseData.Name, UserId: responseData.UserId, Image: responseData.Image, Role: responseData.Role, UserName: loginData.userName, AuthId: responseData.AuthId });
            _authentication.isAuth = true;
            _authentication.userName = loginData.UserName;
            _authentication.useRefreshTokens = loginData.useRefreshTokens;
            $rootScope.userName = loginData.UserName;
            $rootScope.userTitle = responseData.Name;
            $rootScope.userId = responseData.UserId;
            $rootScope.authId = responseData.AuthId;
            $rootScope.image = $rootScope.imagesUrl + responseData.Image;
            $rootScope.role = responseData.Role;
            $rootScope.isSignedIn = true;
            deferred.resolve(response);

        }, function (err, status) {
            //alert('ex');
            //console.log(err);
            // _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationData');
        localStorageService.remove('userData');
        _authentication.isAuth = false;
        _authentication.userName = "";
        $rootScope.isSignedIn = false;
        _authentication.useRefreshTokens = false;
        $location.path('/signin');
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;

            _authentication.useRefreshTokens = authData.useRefreshTokens;

            $rootScope.userName = authData.userName;
            var userData = localStorageService.get('userData');
            if (userData) {
                $rootScope.userTitle = userData.Name;
                $rootScope.authId = userData.AuthId;
                $rootScope.userName = userData.UserName;
                $rootScope.userId = userData.UserId;
                $rootScope.image = $rootScope.imagesUrl + userData.Image;
                $rootScope.role = userData.Role;
                $rootScope.isSignedIn = true;
            }
        }

    };


    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationData');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationData');

                //$http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                //    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                //    deferred.resolve(response);

                //}).error(function (err, status) {
                //    _logOut();
                //    deferred.reject(err);
                //    });


                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                    var responseData = response.data;
                    console.log('refresh');
                    console.log(responseData);
                    localStorageService.set('authorizationData', { token: responseData.access_token, userName: responseData.userName, refreshToken: responseData.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }, function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });


            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _isAuthorized = function () {
        var authData = localStorageService.get('authorizationData');
        if (!authData)
            return false;
        var expires = new Date(authData.expires);
        if (new Date() > expires)
            return false;

        return true;

    };
    var _redirectToLogin = function () {
        localStorageService.remove('authorizationData');
        $location.path('/signin');
    };
    var _checkAuth = function () {
        var authData = localStorageService.get('authorizationData');


        if (!authData) {
            localStorageService.remove('authorizationData');
            $location.path('/login');
            return;
        }
        var expires = new Date(authData.expires);
        // alert(expires);
        // alert(new Date());
        if (new Date() > expires) {
            alert('expire');
            localStorageService.remove('authorizationData');
            $location.path('/login');
            return;
        }

    };

    var _setModuleProperties = function (moduleId) {
        var module = { id: Number(moduleId) };
        switch (Number(moduleId)) {
            case 1:
                module.title = 'Profile';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.steel-light';
                module.color = '#2f7899';
                module.class = 'theme-steel';
                break;
            case 2:
                module.title = 'Library';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.purple-light';
                module.color = '#9C27B0';
                module.class = 'theme-purple';
                break;
            case 3:
                module.title = 'Flight Management';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.blue-light';
                module.color = '#03A9F4';
                module.class = 'theme-blue';
                break;
            case 4:
                module.title = 'Basic Information';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.gray-light';
                module.color = '#97a1a6';
                module.class = 'theme-gray';
                break;
            default:
                break;
        }
        return module;

    }
    var _fillModuleData = function () {

        var data = localStorageService.get('module');

        if (data) {
            $rootScope.module = data.title;
            $rootScope.moduleId = data.id;
            $rootScope.moduleRemark = data.remark;
            $rootScope.theme = data.theme;
            $rootScope.color = data.color;
            $rootScope.class = data.class;

            //  $rootScope.headerClasses.push(data.class);
        }

    };
    var _setModule = function (moduleId) {
        var module = _setModuleProperties(moduleId);
        localStorageService.set('module', module);
        _fillModuleData();

    };
    //var _register2 = function (entity) {
    //    var deferred = $q.defer();
    //    $http.post($rootScope.serviceUrl + 'api/users/register', entity).then(function (response) {
    //        deferred.resolve(response.data);
    //    }, function (err, status) {

    //        deferred.reject(Exceptions.getMessage(err));
    //    });

    //    return deferred.promise;
    //};
    //var _changePassword = function (entity) {
    //    var deferred = $q.defer();
    //    $http.post($rootScope.serviceUrl + 'api/password/change', entity).then(function (response) {
    //        deferred.resolve(response.data);
    //    }, function (err, status) {

    //        deferred.reject(Exceptions.getMessage(err));
    //    });

    //    return deferred.promise;
    //};
    var _updateCompany = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/company/update', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _registerCompany = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/company/register', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _registerUser = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/user/register', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveActivity = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'api/user/activity', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _getPatients = function (psychoanalystId) {
        return $http.get(serviceBase + 'api/getpatient/' + psychoanalystId).then(function (response) {
            return response;
        })
    };

    var _existTime = function (phone) {
        return $http.get(serviceBase + 'api/ExistTime/' + phone).then(function (response) {
            return response;
        })
    };



    var _changePassword = function (id, data) {
        return $http.put(serviceBase + 'api/auth/' + id, data).then(function (response) {
            return response;
        })
    }


    var _deleteUser = function (id) {
        return $http.delete(serviceBase + 'api/auth/' + id).then(function (response) {
            return response;
        })
    }


    //var _deletePsychoanalyst = function (id) {
    //    return $http.delete(serviceBase + 'api/Psychoanalysts/' + id).then(function (response) {
    //        return response;
    //    })
    //}


    var _deleteVisitingTime = function (id) {
        return $http.delete(serviceBase + 'api/VisitingTimes/' + id).then(function (response) {
            return response;

        })
    }


    var _editVisitingTime = function (id, data) {
        return $http.put(serviceBase + 'api/VisitingTimes/' + id, data).then(function (response) {
            return response;

        })
    }


    var _patientRegistration = function (data) {
        return $http.post(serviceBase + 'api/patient/save', data).then(function (response) {

            return response;
        });

    };

    var _savePatient = function (data) {
        return $http.post(serviceBase + 'api/patient/save', data).then(function (response) {
            return responsel
        })
    }

    var _saveCalendar = function (data) {
        return $http.post(serviceBase + 'api/calendar/save ', data).then(function (response) {
            return response
        })
    }

    var _newTime = function (data) {
        return $http.post(serviceBase + 'api/ExistTime', data).then(function (response) {
            return response;
        });

    };

    var _getUserByUsername = function (phone) {
        return $http.get(serviceBase + 'api/user/get/' + phone).then(function (response) {
            return response;
        })
    };

    var _getPsychoanalysts = function () {
        return $http.get(serviceBase + 'api/psychoanalyst/get').then(function (response) {
            return response;
        })
    };

    var _getExistTime = function (pyschoanalystId) {
        return $http.get(serviceBase + 'api/Patients/Calendar/' + pyschoanalystId).then(function (response) {
            return response;
        })
    };

    var _getVisitingTime = function (pyschoanalystId, day) {
        return $http.get(serviceBase + 'api/Psychoanalysts/available/' + pyschoanalystId + '/' + day).then(function (response) {
            return response;
        })
    };

    var _getPosts = function () {
        return $http.get(serviceBase + 'api/posts/get' ).then(function (response) {
            return response;
        })
    };

    var _getPost = function (title) {
        return $http.get(serviceBase + 'api/post/get/' + title).then(function (response) {
            return response;
        })
    };

    var _getUnselectedTime = function (pyschoanalystId, day, startTime) {
        return $http.get(serviceBase + 'api/VisitingTimes/' + pyschoanalystId + '/' + day + '/' + startTime).then(function (response) {
            return response;
        })
    };

    var _VisitingTimeByDrPhone = function (psychoanalystId ,weekday) {
        return $http.get(serviceBase + 'api/VisitingTimes/' + psychoanalystId + "/" + weekday).then(function (response) {
            return response;

        })
    }

    var _PsychoanalystById = function (psychoanalystId) {
        return $http.get(serviceBase + 'api/psychoanalyst/' + psychoanalystId ).then(function (response) {
            return response;

        })
    }

    var _uploadImage = function (fd) {
        return $http.post(serviceBase + 'api/image/upload', fd, { transformRequest: angular.identity, headers: { 'Content-Type': undefined } }).then(function (response) {
            return response
        })
    }

    var _uploadPost = function (fd) {
        return $http.post(serviceBase + 'api/post/upload', fd).then(function (response) {
            return response
        })
    }

    var _editPatientData = function (id, data) {
        return $http.post(serviceBase + 'api/Patients/edit/', data).then(function (response) {
            return response
        })
    }

    var _editConfirmedDate = function (data) {
        return $http.post(serviceBase + 'api/confirmdate/update', data).then(function (response) {
            return response
        })
    }

    var _newVisitingTime = function (newVisitingTime) {
        return $http.post(serviceBase + 'api/availabetime/save', newVisitingTime).then(function (response) {
            return response;
        })
    }

    //var _psychoanalystWeekDays = function (id, dtFrom, dtTo) {
    //    return $http.get(serviceBase + 'api/Psychoanalysts/available/' + id + '/' + dtFrom + '/' + dtTo).then(function (response) {
    //        return response;
    //    })
    //}

    //var _unAvailableDays = function (id, dtFrom, dtTo) {
    //    return $http.get(serviceBase + 'api/Psychoanalysts/unAvailable/' + id + '/' + dtFrom + '/' + dtTo).then(function (response) {
    //        return response;
    //    })
    //}

    var _psychoanalystMonths = function (id, year, month) {
        return $http.get(serviceBase + 'api/getmonths/' + id + '/' + year ).then(function (response) {
            return response;
        })
    }

    var _Days = function (id, pyear, pmonth) {
        return $http.get(serviceBase + 'api/days/'+ id + '/'  + pyear + '/' + pmonth ).then(function (response) {
            return response;
        })
    }

    var _Times = function (id, dateId) {
        return $http.get(serviceBase + 'api/times/' + id + '/' + dateId ).then(function (response) {
            return response;
        })
    }

    var _checkConfirmDate = function (id) {
        return $http.get(serviceBase + 'api/confirmdate/' + id).then(function (response) {
            return response;
        })
    }

    var _getPatientTimes = function (mobile) {
        return $http.get(serviceBase + 'api/patient/times/' + mobile).then(function (response) {
            return response;
        })
    }

    var _getPatientInfo = function (mobile) {
        return $http.get(serviceBase + 'api/patient/info/' + mobile).then(function (response) {
            return response;
        })
    }

    var _getDoctorPatients = function (mobile) {
        return $http.get(serviceBase + 'api/getdoctorPatients/' + mobile).then(function (response) {
            return response;
        })
    }
    
    var _checkPatient = function (mobile) {
        return $http.get(serviceBase + 'api/checkPatient/' + mobile).then(function (response) {
            return response
        })
    }

    var _newPsychoanalyst = function (newPsychoanalyst) {
        return $http.post(serviceBase + 'api', newPsychoanalyst).then(function (response) {
            return response;
        })
    }

    var _newUser = function (newUserData) {
        return $http.post(serviceBase + 'api/user/save', newUserData).then(function (response) {
            return response;
        })
    }

    var _newAvailableTime = function (data) {
       return $http.post(serviceBase + 'api/saveAvailableTime', data).then(function (response) {
            return response;
        })
    }

    authServiceFactory.newTime = _newTime;
    authServiceFactory.newUser = _newUser;
    authServiceFactory.newAvailableTime = _newAvailableTime;
    authServiceFactory.newPsychoanalyst = _newPsychoanalyst;
    authServiceFactory.checkPatient = _checkPatient;
    authServiceFactory.checkConfirmDate = _checkConfirmDate;
    authServiceFactory.getPatientTimes = _getPatientTimes;
    authServiceFactory.getPatientInfo = _getPatientInfo;
    authServiceFactory.getDoctorPatients = _getDoctorPatients;
    authServiceFactory.editConfirmedDate = _editConfirmedDate;
    authServiceFactory.psychoanalystMonths = _psychoanalystMonths;
    authServiceFactory.Days = _Days;
    authServiceFactory.Times = _Times;
    authServiceFactory.newVisitingTime = _newVisitingTime;
    authServiceFactory.editPatientData = _editPatientData;
    authServiceFactory.PsychoanalystById = _PsychoanalystById;
    authServiceFactory.uploadPost = _uploadPost;
    authServiceFactory.getPost = _getPost;
    authServiceFactory.getPosts = _getPosts;
    authServiceFactory.uploadImage = _uploadImage;
    authServiceFactory.getUnselectedTime = _getUnselectedTime;
    authServiceFactory.deleteUser = _deleteUser;
   // authServiceFactory.deletePsychoanalyst = _deletePsychoanalyst;
    authServiceFactory.deleteVisitingTime = _deleteVisitingTime;
    authServiceFactory.editVisitingTime = _editVisitingTime;
    authServiceFactory.visitingTimeByDrPhone = _VisitingTimeByDrPhone;
    authServiceFactory.existTime = _existTime;
    authServiceFactory.getUserByUsername = _getUserByUsername;
    authServiceFactory.setModule = _setModule;
    authServiceFactory.fillModuleData = _fillModuleData;
    authServiceFactory.checkAuth = _checkAuth;
    authServiceFactory.isAuthorized = _isAuthorized;
    authServiceFactory.redirectToLogin = _redirectToLogin;
    authServiceFactory.patientRegistration = _patientRegistration;
    authServiceFactory.savePatient = _savePatient;
    authServiceFactory.saveCalendar = _saveCalendar;
    authServiceFactory.login = _login;
    authServiceFactory.patientLogin = _patientLogin;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;
    authServiceFactory.getPatients = _getPatients;
    authServiceFactory.getVisitingTime = _getVisitingTime;

    authServiceFactory.getExistTime = _getExistTime;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;
    authServiceFactory.getPsychoanalysts = _getPsychoanalysts;
    authServiceFactory.changePassword = _changePassword;
    authServiceFactory.registerCompany = _registerCompany;
    authServiceFactory.registerUser = _registerUser;
    authServiceFactory.updateCompany = _updateCompany;
    authServiceFactory.saveActivity = _saveActivity;
    authServiceFactory.IsAuthurized = function () {


        return authServiceFactory.authentication.isAuth;
    };


    return authServiceFactory;
}]);