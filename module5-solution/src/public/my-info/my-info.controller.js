/**
 * Created by Vladimir Deminenko on 22.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .controller('MyInfoController', MyInfoController);

    MyInfoController.$inject = ['SignUpService'];
    function MyInfoController(SignUpService) {
        var $ctrl = this;
        var service = SignUpService;

        $ctrl.isSignedUp = function () {
            return service.isSignUp;
        }

        $ctrl.getData = function () {
            return service.getSignUp().data;
        }
    }
})();
