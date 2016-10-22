/**
 * Created by Vladimir Deminenko on 22.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .component('myInfo', {
            templateUrl: 'src/public/my-info/my-info.html',
            bindings: {
                myInfo: '<'
            }
        });
})();
