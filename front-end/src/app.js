import angular from 'angular';

import './modules/auth';
import './app.config';

angular.module('imgStore', [
    'app.config',
    'app.auth'
])
