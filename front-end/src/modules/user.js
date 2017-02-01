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
.controller('userCtrl', function ($scope, $rootScope, UserSevice, $stateParams) {
    $scope.header = "Edit profile"
    $scope.isAdmin = $rootScope.user.isAdmin

    let profilePromise = UserSevice.checkProfileVisability($stateParams.id)
    profilePromise.then(res => $scope.profileVisability = res.profile)

    $scope.changeProfile = function (checkBoxValue) {
        let profilePromise = UserSevice.updateProfile(checkBoxValue)
        profilePromise.then(res => $scope.profileVisability)
    }
})
