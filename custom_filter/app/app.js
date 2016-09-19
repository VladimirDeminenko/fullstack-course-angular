/**
 * Created by Vladimir on 15.09.2016.
 */
(function () {
    'use strict';
    angular.module('CustomFilterApp', ['EuroCurrencyFilterModule', 'EuroCurrencyListServiceModule'])
        .controller('CustomFilterController', CustomFilterController);

    CustomFilterController.$inject = ['$scope', 'EuroCurrencyListService'];
    function CustomFilterController($scope, EuroCurrencyListService) {
        var service = EuroCurrencyListService;
        var ctrl = this;

        $scope.defaultUserCurrency = {
            symbol: '\u00A3',
            fractionSize: 3,
            delimeter: '',
            amount: 55.6789
        };

        $scope.userCurrency = $scope.defaultUserCurrency;
        ctrl.currencyList = service.getCurrencyList();

        ctrl.cleanAll = function () {
            $scope.userCurrency = $scope.defaultUserCurrency;
        };

        ctrl.testCurrency = function () {
            var userCurrency = service.newCurrency(
                $scope.userCurrency.symbol, $scope.userCurrency.fractionSize,
                $scope.userCurrency.delimeter, Number($scope.userCurrency.amount));

            ctrl.currencyList.push(userCurrency);
        };
    }
})();
