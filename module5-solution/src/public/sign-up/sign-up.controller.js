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
        var service = SignUpService;

        $ctrl.data = service.getSignUp();

        $ctrl.isChecked = false;

        $ctrl.signUp = function () {
            $ctrl.isChecked = true;
            $ctrl.isSignedUp = $ctrl.isValid();

            if ($ctrl.isSignedUp) {
                service.putSignUp($ctrl.data);
                $ctrl.data.message = INFO_SAVED_MESSAGE;
            }
            else {
                $ctrl.data.message = MENU_NOT_EXISTS_MESSAGE;
            }
        }

        $ctrl.isValid = function () {
            // return service.isSignedUp() && !$ctrl.data.favoriteDish;
            return true;
        }

        $scope.$watch('ctrl.personalData.firstName', function () {
            $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.personalData.lastName', function () {
            $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.personalData.email', function () {
            $ctrl.isChecked = false;

            if ($scope.ctrl.data && $scope.ctrl.data.email) {
                $scope.ctrl.data.email = $scope.ctrl.data.email.toLowerCase();
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

            if ($scope.ctrl.data && $scope.ctrl.data.favoriteDish) {
                $scope.ctrl.data.favoriteDish = $scope.ctrl.data.favoriteDish.toUpperCase();
            }
        });
    }

    // TODO InfoController
    // TODO var myService = $injector.getSignUp('MyService');
})();
