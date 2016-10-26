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
        $ctrl.data = {};
        $ctrl.isChecked = false;

        $ctrl.signUp = function () {
            $ctrl.isChecked = true;
            $ctrl.isSignedUp = $ctrl.isValid();

            if ($ctrl.isSignedUp) {
                service.putSignUpData($ctrl.data);
                $ctrl.data = {};

                $scope.signupForm.$setPristine();
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

        $scope.$watch('ctrl.data.firstName', function () {
            // $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.data.lastName', function () {
            // $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.data.email', function () {
            // $ctrl.isChecked = false;

            if ($scope.ctrl.data.email) {
                $scope.ctrl.data.email = $scope.ctrl.data.email.toLowerCase();
            }
        });

        $scope.$watch('ctrl.data.tel.areaCode', function () {
            // $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.data.tel.number', function () {
            // $ctrl.isChecked = false;
        });

        $scope.$watch('ctrl.data.favoriteDish', function () {
            // $ctrl.isChecked = false;

            if ($scope.ctrl.data.favoriteDish) {
                $scope.ctrl.data.favoriteDish = $scope.ctrl.data.favoriteDish.toUpperCase();
            }
        });
    }
})();
