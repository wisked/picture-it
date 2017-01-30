import angular from 'angular';
import  angularUiBootstrap from 'angular-ui-bootstrap';

import '../services/userService'

angular.module('app.home', [
    angularUiBootstrap,
    'user.service'
])
.controller('homeCtrl', function($scope, $rootScope, UserSevice) {


})
