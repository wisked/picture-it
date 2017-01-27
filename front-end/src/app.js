import angular from 'angular';

import './services/authService'

import './modules/auth';
import './modules/home';

import './app.config';

angular.module('imgStore', [
    'app.config',
    'app.auth',
    'app.home',
    'auth.service'
])
