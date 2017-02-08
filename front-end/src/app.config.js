import angular from 'angular';
import uiRouter from 'angular-ui-router';

export default angular.module('app.config', [
    uiRouter
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: '/src/templates/dashboard.html',
            controller: 'dashboardCtrl',
            authenticate: false
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '/src/templates/profile.html',
            controller: 'profileCtrl',
            authenticate: true
        })
        .state('register', {
            url: '/register',
            templateUrl: '/src/templates/register.html',
            controller: 'authCtrl',
            authenticate: false
        })
        .state('login', {
            url: '/login',
            templateUrl: '/src/templates/login.html',
            controller: 'authCtrl',
            authenticate: false
        })
        .state('user', {
            url: '/user/{id}',
            templateUrl: '/src/templates/user.html',
            controller: 'userCtrl',
            authenticate: false
        })
        .state('image', {
            url: '/image/{img}',
            templateUrl: '/src/templates/image.html',
            controller: 'imageCtrl',
            authenticate: true
        })

    }
])
