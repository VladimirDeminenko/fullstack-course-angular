/**
 * Created by Vladimir Deminenko on 25.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .service('SignUpService', SignUpService);

    function SignUpService() {
        var service = this;
        var signUpData = {
            firstName: "",
            lastName: "",
            email: "",
            tel: {
                areaCode: "",
                number: ""
            },
            favoriteDish: ""
        };

        service.putData = function (data) {
            signUpData = data;
        }

        service.getData = function () {
            return signUpData;
        }
    }
})();
