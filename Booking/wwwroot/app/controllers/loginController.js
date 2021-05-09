app.controller('loginController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', 'localStorageService', '$http', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, localStorageService) {


    $scope.entity = {
        UserName: null,
        Password: null,
    }


    $scope.txt_UserName = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.UserName',

        }
    };

    $scope.txt_Password = {
        hoverStateEnabled: false,
        width: '100%',
        height: 45,
        rtlEnabled: true,
        bindingOptions: {
            value: 'entity.Password',

        }
    };

    $scope.btn_save = {
        text: 'تایید',
        type: 'default',
        width: '100%',
        height: 45,
        rtlEnabled: true,
        onClick: function (e) {


            authService.login($scope.entity).then(function (response) {


                $scope.loadingVisible = false;


                $rootScope.userName = authService.authentication.UserName;
                if ($scope.entity.UserName == '09352166437') {
                    $location.path('/AdminCustomers');
                }
                else
                    $location.path('/user');
            })
        

            //authService.login($scope.entity, function (response) {

            //});

                //if ($scope.entity.UserName == "09152283268") {
                //    $location.path('/AdminCustomers')
                //} else {
                //    $location.path('/user')
                //}
           

        }
    }



}]);