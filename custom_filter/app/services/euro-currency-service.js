/**
 * Created by Vladimir on 19.09.2016.
 */
(function () {
    'use strict';
    angular.module('EuroCurrencyListServiceModule', [])
        .service('EuroCurrencyListService', EuroCurrencyListService);

    function EuroCurrencyListService() {
        var service = this;
        service.newCurrency = EuroCurrency;
        service.amount = 153.558;

        service.euroCurrencyList = [
            new EuroCurrency(),
            new EuroCurrency("AU$", "5"),
            new EuroCurrency("DM"),
            new EuroCurrency("DM", "4"),
            new EuroCurrency("DM", "4", " / "),
            new EuroCurrency("HK$"),
            new EuroCurrency(null, 3, ' ')
        ];

        service.getCurrencyList = function () {
            return service.euroCurrencyList;
        }

        service.cloneCurrency = function (currency) {
            return service.newCurrency(currency.symbol, currency.fractionSize, currency.delimeter, currency.amount);
        }

        function EuroCurrency(symbol, fractionSize, delimiter, amount) {
            return {
                amount: amount || service.amount,
                symbol: symbol,
                fractionSize: fractionSize,
                delimiter: delimiter
            };
        }
    }
})();

