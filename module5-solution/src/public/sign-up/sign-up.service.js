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
            data: {
                firstName: "",
                lastName: "",
                email: "",
                tel: {
                    areaCode: "",
                    number: ""
                },
                favoriteDish: ""
            },
            isSignedUp: function () {
                return !!this.data.email;
            }
        };

        service.put = function (data) {
            signUpData.data = data;
        }

        service.get = function () {
            return signUpData;
        }
    }
})();
