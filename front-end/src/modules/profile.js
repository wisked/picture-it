import angular from 'angular';
import angularUiBootstrap from 'angular-ui-bootstrap';
import ngFileUpload from 'ng-file-upload';

import '../services/userService';
import '../services/imgService.js'

angular.module('app.profile', [
    'user.service',
    'img.service',
    ngFileUpload,
    angularUiBootstrap
])
.controller('profileCtrl', function($scope, UserSevice, ImageService, $uibModal) {
    $scope.header = "Edit profile"
    let profilePromise = UserSevice.checkProfileVisability()
    profilePromise.then(res => $scope.profileVisability = res.profile)

    let imagesPromise = ImageService.getImgs()
    imagesPromise.then(res => $scope.images = res.data)

    $scope.alerts = [];
    
    $scope.changeProfile = function (checkBoxValue) {
        let profilePromise = UserSevice.updateProfile(checkBoxValue)
        profilePromise.then(res => $scope.profileVisability)
    }

    $scope.submit = function () {
        let imagesPromise = ImageService.loadImgs($scope.files)
        imagesPromise.then(res => $scope.images = res)
    }
    $scope.deleteImg = function (id) {
        let deleteImgPromise = ImageService.deleteImage(id)
        deleteImgPromise.then(res => {
            $scope.images = $scope.images.filter(item => item.id != id)
            $scope.alerts.push(
                { type: 'danger', msg: 'Image was deleted' }
            )
        })
    }
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
  };
    //TODO: add css class
    $scope.openModal = function (url) {
        let modalInstance = $uibModal.open({
            templateUrl: '../../src/templates/image-modal.html',
            controller: function($scope) {
                $scope.url = url
            },
            size: 'lg',
            // windowClass: 'img {width: 100%;' +
            //                 'height: 100%;}',
            openedClass: 'imgModel'
        })
    }
})
