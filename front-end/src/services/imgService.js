import angular from 'angular'
import ngFileUpload from 'ng-file-upload';


angular.module('img.service', [
    ngFileUpload
])

.factory('ImageService', function($http, Upload) {
    const img = {};

    img.loadImgs = function (files) {
        Upload.upload({
            url: '/api/loadImgs',
            data: {file: files}
            data: {files: files}
        })
        .then(res => {
            if (res.status = 200) {
                return res.data;
            }
        })
    }
    img.delete = function(url) {
        return $http.post('/api/delete', {
            url: url
        });
    }
    img.deleteUserImg = function (url, user) {
        return $http.post('/api/deleteUserImg', {
            url: url,
            user: user
        })
     }
    return img;
})
