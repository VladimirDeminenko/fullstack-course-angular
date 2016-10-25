/**
 * Created by Vladimir Deminenko on 23.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$q', '$scope', 'MenuService', 'SignUpService', 'MENU_NOT_EXISTS_MESSAGE', 'INFO_SAVED_MESSAGE'];
    function SignUpController($q, $scope, MenuService, SignUpService, MENU_NOT_EXISTS_MESSAGE, INFO_SAVED_MESSAGE) {
        var $ctrl = this;

        $ctrl.personalData = SignUpService.getData();
        $ctrl.isChecked = false;

        $ctrl.signUp = function () {
            $ctrl.isChecked = true;
            $ctrl.isSignedUp = $ctrl.isValid();

            if ($ctrl.isSignedUp) {
                SignUpService.putData($ctrl.personalData);
                $ctrl.personalData.message = INFO_SAVED_MESSAGE;
            }
            else {
                $ctrl.personalData.message = MENU_NOT_EXISTS_MESSAGE;
            }
        }

        $ctrl.isValid = function () {
            return true;
        }

        $ctrl.isValid2 = function () {
            var deferred = $q.defer();
            var dish = $ctrl.personalData.favoriteDish;
            var result = !dish;

            deferred.resolve(result);
            console.log('-- 0:');

            if (!result) {
                console.log('-- 1:');
                MenuService.existsMenuItem(dish)
                    .then(function (response) {
                            deferred.resolve(response);
                        }
                    ).catch(function (response) {
                        deferred.reject(response);
                    }
                );
            }

            return deferred.promise;
        }

        $scope.$watch('ctrl.personalData.favoriteDish', function () {
            if ($scope.ctrl.personalData.favoriteDish) {
                $scope.ctrl.personalData.favoriteDish = $scope.ctrl.personalData.favoriteDish.toUpperCase();
            }
        });

        $scope.$watch('ctrl.personalData.email', function () {
            if ($scope.ctrl.personalData.email) {
                $scope.ctrl.personalData.email = $scope.ctrl.personalData.email.toLowerCase();
            }
        });
    }

    // TODO InfoController
    // TODO var myService = $injector.get('MyService');
})();
