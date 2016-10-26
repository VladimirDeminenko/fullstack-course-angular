/**
 * Created by Vladimir Deminenko on 25.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .service('SignUpService', SignUpService);

    SignUpService.$inject = ['MenuService'];
    function SignUpService(MenuService) {
        var service = this;
        var signUpData = {
            firstName: '',
            lastName: '',
            email: '',
            tel: {
                areaCode: '',
                number: ''
            },
            favoriteDish: '',
            dish: {}
        };

        service.putSignUpData = function (data) {
            signUpData = data;

            MenuService.getDish(data.favoriteDish)
                .then(function (response) {
                        signUpData.dish = response.data;
                    }
                );
        }

        service.getSignUpData = function () {
            return signUpData;
        }

        service.isSignedUp = function () {
            return !!signUpData.email;
        }
    }
})();
