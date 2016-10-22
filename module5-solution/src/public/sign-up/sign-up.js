/**
 * Created by Vladimir Deminenko on 22.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .component('singUp', {
            templateUrl: 'src/public/sing-up/sing-up.html',
            bindings: {
                singUp: '<'
            }
        });
})();
