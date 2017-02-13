import angular from 'angular';
import uiRouter from 'angular-ui-router';


import './modules/auth';
import './modules/dashboard';
import './modules/user'
import './modules/profile'

import './services/authService'

import './app.config';

angular.module('imgStore', [
    'app.config',
    'app.auth',
    'app.dashboard',
    'app.user',
    'app.profile',
    'auth.service',
    uiRouter
])

.run(['$rootScope', '$state', '$stateParams', 'AuthService',
    function ($rootScope, $state, $stateParams, AuthService) {
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if ($rootScope.user.hasOwnProperty("name")) {
                $rootScope.authenticated = true
            }
            else
                $rootScope.authenticated = false

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
    if ($scope.authenticated) {
        AuthService.getUserName()
    }

    $scope.logout = function() {
        $scope.authenticated = false
        AuthService.logout(function () {
            $state.transitionTo('login')
        });
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        // resultCompareJWT()
        $scope.authenticated = AuthService.isAuthenticated();
    });

    // TODO: realised compareJWT
    // function resultCompareJWT () {
    //     let promise = AuthService.compareJWT()
    //     promise.then(res => console.log(res))
    // }

})
.directive('navBar', function () {
    return {
        templateUrl: './src/templates/nav-bar.html',
        restrict: 'AE'
    }
})
