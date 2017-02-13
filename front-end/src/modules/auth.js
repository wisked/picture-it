import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../services/authService'

angular.module('app.auth', [
    'auth.service',
    uiRouter
])

.controller('authCtrl', function($scope, AuthService, $state) {
    $scope.login = function () {
        AuthService.login($scope.username, $scope.password, function () {
            $state.transitionTo('profile')
        })
    }

    $scope.register = function () {
        AuthService.register($scope.email, $scope.username, $scope.password, function() {
            $state.transitionTo("profile")
        })
    }

})
