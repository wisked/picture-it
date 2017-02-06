import angular from 'angular';

export default angular.module('auth.service', [])
.factory('AuthService', function($http, $rootScope) {
    const auth = {};
    $rootScope.user = {}

    auth.register = function(email, name, password, callback) {
        $http.post('/api/register', {
            email: email,
            name: name,
            password: password,
        })
        .then(res => {
            window.localStorage['jwt'] = angular.toJson(res.data.token)
            $rootScope.user = {
                name: angular.toJson(res.data.name),
                isAdmin: angular.toJson(res.data.isAdmin)
            }
            callback()
        })
    }


    auth.login = function (username, password, callback) {
        $http.post('/api/login', {
            username: username,
            password: password
        })
        .then(res => {
            auth.user = res.user;
            auth.user = {
                userIsAdmin: res.data.userIsAdmin
            }
            $rootScope.user = {
                isAdmin: angular.toJson(res.data.isAdmin),
                name: angular.toJson(res.data.name)
            }
            window.localStorage['jwt'] = angular.toJson(res.data.token);
            callback()
        })
        .catch(res => $rootScope.data = res.data)
    }

    auth.isAuthenticated = function () {
        return window.localStorage.getItem('jwt') ? true : false
    }

    auth.logout = function (callback) {
        window.localStorage.removeItem('jwt');
        $rootScope.user = {}
        $http.get('/api/logout').then(res => callback())

    }

    auth.getUserName = function () {
        $http.get('/api/get-userName')
            .then(res => $rootScope.user = res.data)
    }

    return auth;
})
