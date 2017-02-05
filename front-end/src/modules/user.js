import angular from 'angular'
import angularUiBootstrap from 'angular-ui-bootstrap';
import ngFileUpload from 'ng-file-upload';
import uiRouter from 'angular-ui-router';

import '../services/userService';
import '../services/imgService'

angular.module('app.user', [
    'user.service',
    'img.service',
    uiRouter,
    ngFileUpload,
    angularUiBootstrap
])
.controller('userCtrl', function ($scope, $rootScope, UserSevice, $stateParams, ImageService, $uibModal) {
    $scope.header = "Edit profile"
    $scope.images = []
    $scope.alerts = [];
    $scope.max = 100
    $scope.dynamic = 0
    $scope.isAdmin = $rootScope.user.isAdmin

    let getImagesPromise = ImageService.getImgs()
    getImagesPromise.then(res => {
        res.data.map(img => {
            $scope.images.push(img)
        })
    })

    let profilePromise = UserSevice.checkProfileVisability($stateParams.id)
    profilePromise.then(res => $scope.profileVisability = res.profile)

    $scope.changeProfile = function (checkBoxValue) {
        let profilePromise = UserSevice.updateProfile(checkBoxValue)
        profilePromise.then(res => $scope.profileVisability = res)
    }
    
    $scope.submit = function () {
        let imagesPromise = ImageService.loadImgs($scope.files)
        imagesPromise.then(res => {
            res.map(img => {
                $scope.dynamic += parseFloat(100 / res.length)
                $scope.images.unshift(img)
            })
        })
    }

    $scope.deleteImg = function (id) {
        let deleteImgPromise = ImageService.deleteImage(id, $stateParams.id)
        deleteImgPromise.then(res => {
            $scope.images = $scope.images.filter(item => item.id != id)
            $scope.alerts.push(
                { type: 'danger', msg: 'Image was deleted' }
            )
        })
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    }
    
    $scope.openModal = function (url) {
        let modalInstance = $uibModal.open({
            templateUrl: '../../src/templates/image-modal.html',
            controller: function($scope) {
                $scope.url = url
            },
            size: 'lg'
        })
    }
})
