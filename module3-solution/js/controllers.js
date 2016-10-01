/**
 * Created by Vladimir on 01.10.2016.
 */

(function () {
    'use strict';

    angular.module('Controllers', ['Constants'])
        .controller('NarrowItDownController', NarrowItDownController);

    NarrowItDownController.$inject = ['MenuSearchService', 'DEFAULT_PENDING_TIMEOUT_FOR_EMPTY_SEARCH_TERM'];
    function NarrowItDownController(MenuSearchService, DefaultPendingTimeout) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.pendingTimeout = DefaultPendingTimeout;
        ctrl.isPending = false;
        ctrl.showMessage = false;
        ctrl.found = [];

        ctrl.searchItems = function () {
            ctrl.showMessage = false;
            ctrl.isPending = true;
            ctrl.found = [];

            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm, ctrl.pendingTimeout)
                .then(function (response) {
                    ctrl.found = response;
                    console.info('found:', ctrl.found);
                })
                .catch(function (response) {
                    ctrl.found = response;
                    console.info('catch:', ctrl.found);
                })
                .finally(function () {
                    ctrl.isPending = false;
                    ctrl.showMessage = ctrl.isEmpty();
                });
        }

        ctrl.isEmpty = function () {
            return ctrl.found.length == 0;
        }

        ctrl.removeItem = function (itemIndex) {
            var removedItem = ctrl.found.splice(itemIndex, 1);
            console.log('removed:', removedItem);

            return removedItem;
        };

        ctrl.setPendingTimeout = function (timeout) {
            ctrl.pendingTimeout = timeout;
        }
    }
})()
