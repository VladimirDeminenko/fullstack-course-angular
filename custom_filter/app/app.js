/**
 * Created by Vladimir on 15.09.2016.
 */
(function () {
    'use strict';
    angular.module('CustomFilterApp', ['EuroCurrencyFilterModule'])
        .controller('CustomFilterController', CustomFilterController);

    CustomFilterController.$inject = ['$scope', 'euroCurrencyFilter'];
    function CustomFilterController($scope, euroCurrencyFilter) {
        $scope.cost = 153.558;

        $scope.sayHello = function () {
            return "Hello Custom Filter!";
        }

        $scope.showHongKongDollar = function () {
            return euroCurrencyFilter($scope.cost, "HK$");
        }
    }
})();
