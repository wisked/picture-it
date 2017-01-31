import angular from 'angular';
import angularUiBootstrap from 'angular-ui-bootstrap';

import ngFileUpload from 'ng-file-upload';
import '../services/userService';

angular.module('app.profile', [
    'user.service',
    ngFileUpload,
    angularUiBootstrap
])
.controller('profileCtrl', function($scope, UserSevice) {
    $scope.header = "Edit profile"
    let profilePromise = UserSevice.checkProfileVisability()
    profilePromise.then(res => $scope.profileVisability = res.profile)

    $scope.changeProfile = function (checkBoxValue) {
        let profilePromise = UserSevice.updateProfile(checkBoxValue)
        profilePromise.then(res => $scope.profileVisability)
    }
})
