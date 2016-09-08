/**
 * Created by Vladimir on 08.09.2016.
 */
(function () {
    'use strict';

    const DISHES_EMPTY_MESSAGE = 'Please enter data first';
    const DISHES_ENJOY_MESSAGE = 'Enjoy!';
    const DISHES_TOO_MUCH_MESSAGE = 'Too much!';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', function ($scope) {
            $scope.dishes = '';
            $scope.isEmpty = true;
            $scope.useStyle = false;

            $scope.lunchCheck = function () {
                $scope.useStyle = true;

                $scope.isEmpty = $scope.dishes.trim() == '';

                if ($scope.isEmpty) {
                    $scope.message = DISHES_EMPTY_MESSAGE;

                    return;
                }

                var dishCount = $scope.dishes.trim().split(',').length;

                if (dishCount <= 3) {
                    $scope.message = DISHES_ENJOY_MESSAGE;
                }
                else {
                    $scope.message = DISHES_TOO_MUCH_MESSAGE;
                }
            }
        });
})();
