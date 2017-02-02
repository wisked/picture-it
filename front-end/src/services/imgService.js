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
            data: {files: files}
        })
        .then(res => {
            if (res.status = 200) {
                return res.data;
            }
        })
    }
    img.getImgs = function () {
        return $http.get('/api/getImages')
    }
    img.deleteImage = function(id) {
        return $http.post('/api/delete-image', {
            id: id
        });
    }
    return img;
})
