/**
 * Created by Vladimir on 15.09.2016.
 */
(function () {
    'use strict';
    angular.module('CustomFilterApp', ['EuroCurrencyFilterModule', 'EuroCurrencyListServiceModule'])
        .controller('CustomFilterController', CustomFilterController);

    CustomFilterController.$inject = ['EuroCurrencyListService'];
    function CustomFilterController(EuroCurrencyListService) {
        var service = EuroCurrencyListService;
        var ctrl = this;
        ctrl.value = 153.558;
        ctrl.currencyList = service.getCurrencyList();
    }
})();
