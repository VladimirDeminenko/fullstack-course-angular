/**
 * Created by Vladimir Deminenko on 23.10.2016.
 */

(function () {
    'use strict';

    angular.module('public')
        .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['$scope', 'MENU_NOT_EXISTS_MESSAGE', 'INFO_SAVED_MESSAGE'];
    function SignUpController($scope, MENU_NOT_EXISTS_MESSAGE, INFO_SAVED_MESSAGE) {
        var $ctrl = this;

        $ctrl.personalData = {
            firstName: "",
            lastName: "",
            email: "",
            tel: {
                areaCode: "",
                number: ""
            },
            favoriteDish: "",
            isSignedUp: false,
            message: ""
        };

        $ctrl.signUp = function () {
            console.log('data:', $ctrl.personalData);

            $scope.signupForm.$setPristine();
            $ctrl.personalData.message = INFO_SAVED_MESSAGE;
            $ctrl.personalData.isSignedUp = true;


            console.log('$scope.ctrl.personalData:', $scope.ctrl.personalData);
        }

        $scope.$watch('ctrl.personalData.favoriteDish', function () {
            console.log('$scope:', $scope.ctrl.personalData.favoriteDish);

            if ($scope.ctrl.personalData.favoriteDish) {
                $scope.ctrl.personalData.favoriteDish = $scope.ctrl.personalData.favoriteDish.toUpperCase();
            }

        });
    }

    // TODO Service --> Stand alone
    // TODO InfoController
})();
