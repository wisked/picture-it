import angular from 'angular';

angular.module('auth.service')
.factory('AuthService', function($http, $rootScope) {
    const auth = {};
    $rootScope.user = {}

    auth.register = function(email, name, password) {
        $http.post('/register', {
            email: email,
            name: name,
            password: password,
        })
        .then(res => {
            window.localStorage['jwt'] = angular.toJson(res.data.token)
            $rootScope.name = angular.toJson(res.data.name)
            $rootScope.isAdmin = angular.toJson(res.data.isAdmin)
        })
    }


    auth.login = function (username, password) {
        $http.post('/login', {
            username: username,
            password: password
        })
        .then(res => {
            auth.user = res.user;
            auth.user = { userIsAdmin: res.data.userIsAdmin}
            $rootScope.isAdmin = angular.toJson(res.data.isAdmin)
            $rootScope.name = angular.toJson(res.data.name)
            window.localStorage['jwt'] = angular.toJson(res.data.token);
        })
    }

    auth.isAuthenticated = function () {
        return window.localStorage.getItem('jwt') ? true : false
    }

    auth.logout = async function () {
        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem('isAdmin');
        window.localStorage.removeItem('name')
        await $http.get('/logout')
    }

    return auth;
})
