angular.module('auth.service', [])
.factory('AuthService', function ($http) {
    const auth = {};

    auth.user = {}

    auth.register = async function (email, name, password) {
        let res = await $http.post('/register', {
            email: email,
            name: name,
            password: password,

        })
        window.localStorage['jwt'] = angular.toJson(res.data.token)
    }

    auth.login = async function (email, password) {
        let res = await $http.post('/login', {
            email: email,
            password: password
        })
        auth.user = res.user;
        auth.user = { userIsAdmin: res.data.userIsAdmin}
        window.localStorage['jwt'] = angular.toJson(res.data.token);
        window.localStorage['isAdmin'] = angular.toJson(res.data.userIsAdmin)
        window.localStorage['name'] = angular.toJson(res.data.name)
    }

    auth.isAuthenticated = function () {
        return window.localStorage.getItem('jwt') ? true : false
    }

    auth.logout = async function () {
        await $http.get('/logout')
        window.localStorage.removeItem('jwt');
        window.localStorage.removeItem('isAdmin');
        window.localStorage.removeItem('name')
    }

    return auth;
})
