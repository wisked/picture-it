import angular from 'angular';

angular.module('user.service', [])

.factory('UserSevice', function($http) {
    const user = {};

    user.updateProfile = function(profile, id) {
        return $http.post('/api/set-userVisibility', {
                profile: profile,
                userId: id
            })
            .then(response => response.data.profile)
    }
    user.getUserList = function () {
        return $http.get('/api/get-usersList')
                .then(res => res.data)
    }
    user.checkProfileVisability = function (userId) {
        let id = userId ? userId : ''
        return $http.get('/api/check-userProfile/' + id)
                .then(res => res.data)
    }
    user.getUserName = function () {
        return $http.get('/api/get-userName')
    }
    return user
})
