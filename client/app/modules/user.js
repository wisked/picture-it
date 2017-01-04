angular.module('app.user', ['ngFileUpload'])

.controller('userCtrl', function($scope, $stateParams, $state, $http, ImageService, Upload) {
    $scope.images = {};

    $http.get('/user-info', {params: {id: $stateParams.id}})
        .then(data => $scope.images = data.data.slice(0))

    $scope.delete = async function(url) {
        ImageService.delete(url)
            .then(res => {
                if (res)
                    $scope.images = $scope.images.filter(e => e.url !== url)
            })
    }
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            Upload.upload({ url: '/image', data: { image: $scope.file } })
                .then(res => {
                    if (res.status = 200)
                        $scope.images.push({url: res.data})
                });
        }
    });
    // $scope.uploadFiles = function(files, errFiles) {
    //     $scope.files = files;
    //     $scope.errFiles = errFiles;
    //     angular.forEach(files, function(file) {
    //         file.upload = Upload.upload({
    //             url: '/image',
    //             data: {file: file, userId: $stateParams.id}
    //         });
    //
    //         file.upload.then(function (response) {
    //             $timeout(function () {
    //                 file.result = response.data;
    //             });
    //         }, function (response) {
    //             if (response.status > 0)
    //                 $scope.errorMsg = response.status + ': ' + response.data;
    //         }, function (evt) {
    //             file.progress = Math.min(100, parseInt(100.0 *
    //                                      evt.loaded / evt.total));
    //         });
    //     });
    // }
})
