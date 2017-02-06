import angular from 'angular';
import angularUiBootstrap from 'angular-ui-bootstrap';
import ngFileUpload from 'ng-file-upload';
import uiRouter from 'angular-ui-router';

import '../services/userService';
import '../services/imgService.js'

angular.module('app.profile', [
    'user.service',
    'img.service',
    ngFileUpload,
    angularUiBootstrap,
    uiRouter
])
.controller('profileCtrl', function($scope, UserSevice, ImageService, $uibModal, $stateParams) {
    $scope.header = "Edit profile"
    $scope.images = []
    $scope.alerts = [];
    $scope.max = 100

    let profilePromise = UserSevice.checkProfileVisability()
    profilePromise.then(res => $scope.profileVisability = res.profile)

    let getImagesPromise = ImageService.getImgs()
    getImagesPromise.then(res => {
        res.data.map(img => {
            $scope.images.push(img)
        })
    })
    $scope.$watch('files', () => {
        $scope.dynamic = 0

    })
    $scope.changeProfile = function (checkBoxValue) {
        let profilePromise = UserSevice.updateProfile(checkBoxValue)
        profilePromise.then(res => $scope.profileVisability = res)
    }

    $scope.submit = function () {
        let imagesPromise = ImageService.loadImgs($scope.files, $stateParams.id)
        imagesPromise.then(res => {

            res.map(img => {
                $scope.dynamic += parseInt(100 / res.length)
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

    $scope.addLike = function(imgId, index) {
        ImageService.addLike(imgId, $stateParams.id)
            .then(res => {
                console.log($scope.images[index]["likes"]);
                $scope.images[index]["likes"] = res.data.likes

            })
    }

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
