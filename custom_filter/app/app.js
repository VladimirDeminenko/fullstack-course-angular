/**
 * Created by Vladimir on 15.09.2016.
 */
(function () {
    'use strict';
    angular.module('CustomFilterApp', [])
        .controller('CustomFilterController', CustomFilterController)
        .filter('euroCurrency', EuroCurrencyFilter);

    CustomFilterController.$inject = ['$scope', 'euroCurrencyFilter'];
    function CustomFilterController($scope, euroCurrencyFilter) {
        $scope.cost = 153.552;

        $scope.sayHello = function () {
            var result = "Hello Custom Filter!!!";

            return result;
        }
    }

    function EuroCurrencyFilter() {
        return function (amount, symbol, fractionSize, delimiter) {
            delimiter = delimiter || " ";
            symbol = delimiter + (symbol || "€").trim();
            fractionSize = fractionSize || 2;

            return amount.toFixed(fractionSize) + symbol;
        }
    }

})();
