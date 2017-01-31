import angular from 'angular';

angular.module('user.service', [])

.factory('UserSevice', function($http) {
    const user = {};

    user.updateProfile = async function(profile) {
        let res = await $http.post('/api/update', {
            profile: profile
        })
    }
    user.getUserList = function () {
        return $http.get('/api/get-usersList')
        .then(res => res.data)


    }
    return user
})
