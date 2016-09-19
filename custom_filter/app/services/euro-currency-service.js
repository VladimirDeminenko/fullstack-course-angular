/**
 * Created by Vladimir on 19.09.2016.
 */
(function () {
    'use strict';
    angular.module('EuroCurrencyListServiceModule', [])
        .service('EuroCurrencyListService', EuroCurrencyListService);

    function EuroCurrencyListService() {
        var service = this;

        function EuroCurrency(symbol, fractionSize, delimiter) {
            return {
                symbol: symbol,
                fractionSize: fractionSize,
                delimiter: delimiter
            };
        }

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
    }
})();

