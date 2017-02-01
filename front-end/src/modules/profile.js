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
.controller('profileCtrl', function($scope, UserSevice, ImageService) {
    $scope.header = "Edit profile"
    let profilePromise = UserSevice.checkProfileVisability()
    profilePromise.then(res => $scope.profileVisability = res.profile)

    $scope.changeProfile = function (checkBoxValue) {
        let profilePromise = UserSevice.updateProfile(checkBoxValue)
        profilePromise.then(res => $scope.profileVisability)
    }

    $scope.submit = function () {
        let imagesPromise = ImageService.loadImgs($scope.files)
        
    }
})
