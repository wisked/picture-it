import angular from 'angular';
import uiRouter from 'angular-ui-router';

import '../services/authService'

angular.module('app.auth', [
    'auth.service',
    uiRouter
])

.controller('authCtrl', function($scope, AuthService, $state, $rootScope) {

    $rootScope.$watch('data', () => {
        if ($rootScope.data) {
            $scope.alert = {
                message: $rootScope.data.message,
                type: "warning"
            }
            if ($rootScope.data.message.indexOf("password") >= 0) {
                $scope.alert.pass = true
            }
            else {
                $scope.alert.username = true
            }
        }
    })

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
    $scope.closeAlert = function () {
        $scope.alert = null
    }
})
