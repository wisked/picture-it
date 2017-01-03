angular.module('app', [
    'app.home',
    'app.about',
    'app.auth',
    'ui.router',
    'ngAnimate',
    'thatisuday.ng-image-gallery',
    'ngFileUpload'
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

.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home/',
                templateUrl: 'templates/home.html',
                controller: 'homeCtrl',
                authenticate: true
            })
            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html',
                controller: 'aboutCtrl',
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

    }
])

.controller('AppCtrl', function ($rootScope, $scope, $state, AuthService) {
    $scope.authenticated = AuthService.isAuthenticated();

    $scope.logout = async function () {
        await AuthService.logout()
        $scope.authenticated = false
        $state.transitionTo('login')
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        $scope.authenticated = AuthService.isAuthenticated();
    });
})
