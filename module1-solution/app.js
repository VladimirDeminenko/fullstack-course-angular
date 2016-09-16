/**
 * Created by Vladimir on 08.09.2016.
 */
(function () {
    'use strict';

    const EMPTY_MESSAGE = 'Please enter data first';
    const ENJOY_MESSAGE = 'Enjoy!';
    const TOO_MUCH_MESSAGE = 'Too much!';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunch = '';
        $scope.isEmpty = true;
        $scope.useStyle = false;

        $scope.lunchCheck = function () {
            $scope.useStyle = true;

            var dishesCount = getDishesCount($scope.lunch);
            $scope.isEmpty = dishesCount == 0;

            if ($scope.isEmpty) {
                $scope.message = EMPTY_MESSAGE;

                return;
            }

            if (dishesCount <= 3) {
                $scope.message = ENJOY_MESSAGE;
            }
            else {
                $scope.message = TOO_MUCH_MESSAGE;
            }
        }

        function getDishesCount(lunch) {
            var result = 0;

            lunch.split(',').forEach(function (element) {
                if ((element || '').trim() != '') {
                    result++;
                }
            });

            return result;
        }
    }
})();
