angular.module('app.home', ['ngFileUpload'])

.controller('homeCtrl', function($scope, $stateParams, $http, Upload, AuthService) {
    $scope.methods = {};
    $scope.images = [];
    $scope.usersList = [];
    let userIsAdmin = window.localStorage['userIsAdmin'];

    $scope.$watch('file', function () {
        if ($scope.file != null) {
            Upload.upload({ url: '/image', data: { image: $scope.file } })
                .then(res => {
                    if (res.status = 200)
                        $scope.images.push({url: res.data})
                });
        }
    });
    if (userIsAdmin) {
        $http.get('/users-list')
            .then(res => {
                if (res.status == 200) {
                    $scope.usersList.push({user: res.data})
                }
            })
    }
    $http.get('/images')
        .then(images => {
            images.data.forEach(img => {
                $scope.images.push({url: img})
            })
        })
        .catch(err => console.log(err))
})
