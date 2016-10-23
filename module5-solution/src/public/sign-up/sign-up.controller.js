/**
 * Created by Vladimir Deminenko on 23.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$rootScope'];
    function SignUpController($rootScope) {
        $rootScope.personalData = {
            firstName: "Vladimir",
            lastName: "Deminenko",
            email: "vd@gmail.com",
            tel: {
                areaCode: "123",
                number: "123-1234"
            },
            favoriteDish: 'A13'
        };

        var $ctrl = this;

        $ctrl.signUp = function () {
            console.log('data:', $rootScope.personalData);
        }
    }
})();
