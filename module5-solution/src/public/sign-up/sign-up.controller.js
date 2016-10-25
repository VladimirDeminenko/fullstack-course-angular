/**
 * Created by Vladimir Deminenko on 23.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', 'MenuService', 'SignUpService', 'MENU_NOT_EXISTS_MESSAGE', 'INFO_SAVED_MESSAGE'];
    function SignUpController($scope, MenuService, SignUpService, MENU_NOT_EXISTS_MESSAGE, INFO_SAVED_MESSAGE) {
        var $ctrl = this;

        $ctrl.personalData = SignUpService.get().data;
        $ctrl.isChecked = false;

        $ctrl.signUp = function () {
            $ctrl.isChecked = true;
            $ctrl.isSignedUp = $ctrl.isValid();

            if ($ctrl.isSignedUp) {
                SignUpService.put($ctrl.personalData);
                $ctrl.personalData.message = INFO_SAVED_MESSAGE;
            }
            else {
                $ctrl.personalData.message = MENU_NOT_EXISTS_MESSAGE;
            }
        }

        $ctrl.isValid = function () {
            return SignUpService.get().isSignedUp() && !$ctrl.personalData.favoriteDish;
        }

        $scope.$watch('ctrl.personalData.firstName', function () {
            $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.personalData.lastName', function () {
            $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.personalData.email', function () {
            $ctrl.isChecked = false;

            if ($scope.ctrl.personalData.email) {
                $scope.ctrl.personalData.email = $scope.ctrl.personalData.email.toLowerCase();
            }
        });

        $scope.$watch('ctrl.personalData.tel.areaCode', function () {
            $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.personalData.tel.number', function () {
            $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.personalData.favoriteDish', function () {
            $ctrl.isChecked = false;

            if ($scope.ctrl.personalData.favoriteDish) {
                $scope.ctrl.personalData.favoriteDish = $scope.ctrl.personalData.favoriteDish.toUpperCase();
            }
        });
    }

    // TODO InfoController
    // TODO var myService = $injector.get('MyService');
})();
