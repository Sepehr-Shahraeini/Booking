app.controller('blogAdminController', ['$scope', '$rootScope', '$location', 'authService', '$route', '$routeParams', '$http', '$q', function ($scope, $rootScope, $location, authService, $route, $routeParams, $http, $q, fileReader, $timeout) {

    var serviceBase = "http://localhost:63136/";

    $scope.uploadFile = function () {

        var file = $scope.myFile;
        var uploadUrl = "http://localhost:63136/api/Post/";
        uploadFileToUrl(file, uploadUrl);

        function uploadFileToUrl(file, uploadUrl) {
            var fd = new FormData();
            fd.append('file', file);

            
            authService.uploadImage(fd).then(function (response) {

                
                var dto = {
                    Title: $scope.Title,
                    Body: $scope.Body,
                    DateCreate: null,
                    DatePublish: null,
                    AuthorId: 2,
                    CategoryId: 1,
                    Image: serviceBase + response.data.dbPath
                }

                authService.uploadPost(dto).then(function (response) {
                    console.log(response)
                });
            });
        }
    };
}]);



app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
