import angular from 'angular';
import  angularUiBootstrap from 'angular-ui-bootstrap';

import '../services/userService'

angular.module('app.dashboard', [
    angularUiBootstrap,
    'user.service'
])
.controller('dashboardCtrl', function($scope, $rootScope, UserSevice) {
    let userPromise = UserSevice.getUserList()
    userPromise.then(res => $scope.userList = res);

})
