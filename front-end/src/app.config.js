import angular from 'angular';
import uiRouter from 'angular-ui-router';

export default angular.module('app.config', [
    uiRouter
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl',
            authenticate: true
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html',
            controller: 'profileCtrl',
            authenticate: true
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/register.html',
            controller: 'authCtrl',
            authenticate: false
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'authCtrl',
            authenticate: false
        })
        .state('user', {
            url: '/user/{id}',
            templateUrl: 'templates/user-info.html',
            controller: 'userCtrl',
            authenticate: true
        })
        .state('image', {
            url: '/image/{img}',
            templateUrl: 'templates/image.html',
            controller: 'imageCtrl',
            authenticate: true
        })

    }
])
