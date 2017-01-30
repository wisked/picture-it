import angular from 'angular';
import uiRouter from 'angular-ui-router';


import './modules/auth';
import './modules/home';

import './services/authService'

import './app.config';

angular.module('imgStore', [
    'app.config',
    'app.auth',
    'app.home',
    'auth.service',
    uiRouter
])

.run(['$rootScope', '$state', '$stateParams', 'AuthService',
    function ($rootScope, $state, $stateParams, AuthService) {
        $rootScope.$on("$stateChangeStart", async function (event, toState, toParams, fromState, fromParams) {
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
    // $scope.logout = function () {
    //     AuthService.logout()
    //     $scope.authenticated = false
    //     $state.transitionTo('login')
    // }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $scope.authenticated = AuthService.isAuthenticated();
    });
})
