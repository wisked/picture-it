import angular from 'angular';


import '../modules/auth';


angular.module('app.auth', [
    'auth.service'
])

.controller('authCtrl', function($scope, AuthService, $state) {
    $scope.login = function () {
        AuthService.login($scope.username, $scope.password)
        $state.transitionTo('home')
    }

    $scope.register = function () {
        AuthService.register($scope.email, $scope.username, $scope.password)
        $state.transitionTo("home")
    }
})
