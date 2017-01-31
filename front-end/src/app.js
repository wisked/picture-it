import angular from 'angular';
import uiRouter from 'angular-ui-router';


import './modules/auth';
import './modules/home';
import './modules/user'
import './modules/profile'

import './services/authService'

import './app.config';

angular.module('imgStore', [
    'app.config',
    'app.auth',
    'app.home',
    'app.user',
    'app.profile',
    'auth.service',
    uiRouter
])

.run(['$rootScope', '$state', '$stateParams', 'AuthService',
    function ($rootScope, $state, $stateParams, AuthService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !AuthService.isAuthenticated()) {
                // User isn’t authenticated
                event.preventDefault();
                $state.transitionTo("login");
            }
        });
    }
])

.controller('appCtrl', function($scope, $state, $rootScope, AuthService) {
    $scope.authenticated = AuthService.isAuthenticated();
    $scope.name = $rootScope
    $scope.logout = function () {
        AuthService.logout()
        $scope.authenticated = false
        $state.transitionTo('login')
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $scope.authenticated = AuthService.isAuthenticated();
    });
})
