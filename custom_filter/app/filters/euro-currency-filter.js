/**
 * Created by Vladimir on 16.09.2016.
 */
(function () {
    'use strict';
    angular.module('EuroCurrencyFilterModule', [])
        .filter('euroCurrency', EuroCurrencyFilter);

    function EuroCurrencyFilter() {
        return function (amount, symbol, fractionSize, delimiter) {
            delimiter = delimiter || "";
            symbol = delimiter + (symbol || "\u20AC").trim();
            fractionSize = fractionSize || 2;

            return amount.toFixed(fractionSize) + symbol;
        }
    }

})();
