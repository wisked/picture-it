import angular from 'angular';

export default angular.module('auth.service', [])
.factory('AuthService', function($http, $rootScope) {
    const auth = {};
    $rootScope.user = {}

    auth.register = function(email, name, password) {
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
        })
    }


    auth.login = function (username, password) {
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
        })
    }

    auth.isAuthenticated = function () {
        return window.localStorage.getItem('jwt') ? true : false
    }

    // auth.logout = async function () {
    //     window.localStorage.removeItem('jwt');
    //     $rootScope.user = {}
    //     await   $http.get('/api/logout')
    //
    // }

    return auth;
})
