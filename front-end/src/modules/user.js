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
    $scope.isAdmin = $rootScope.user.isAdmin
    
    ImageService.getImgs($stateParams.id)
        .then(res => $scope.images = res.data)

    let profilePromise = UserSevice.checkProfileVisability($stateParams.id)
    profilePromise.then(res => $scope.profileVisability = res.profile)

    $scope.changeProfile = function (checkBoxValue) {
        let profilePromise = UserSevice.updateProfile(checkBoxValue)
        profilePromise.then(res => $scope.profileVisability = res)
    }

    $scope.deleteImg = function (id) {
        let deleteImgPromise = ImageService.deleteImage(id, $stateParams.id)
        deleteImgPromise.then(res => {
            $scope.images = $scope.images.filter(item => item.id != id)
        })
    }

    $scope.openModal = function (url) {
        let modalInstance = $uibModal.open({
            templateUrl: '../../src/templates/image-modal.html',
            controller: function($scope) {
                $scope.url = url
            }
        })
    }
})
