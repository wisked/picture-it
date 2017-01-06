angular.module('img.service', [])

.factory('ImageService', function($http) {
    const img = {};

    img.delete = function(url) {
        return $http.post('/delete', {
            url: url
        });
    }

    return img;
})
