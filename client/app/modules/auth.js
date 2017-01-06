angular.module('app.auth', [])

.controller('authCtrl', function($scope, $rootScope, $http, $state, AuthService) {
    $scope.login = async function() {
        await AuthService.login($scope.username, $scope.password)
        $state.transitionTo('home')

    }

    $scope.register = async function() {
        await AuthService.register($scope.email, $scope.username, $scope.password)
        $state.transitionTo('home')
    }

})
