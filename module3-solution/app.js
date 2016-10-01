/**
 * Created by Vladimir on 28.09.2016.
 */
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective)
        .constant('ITEMS_LOADER_INDICATOR_TEMPLATE_PATH', 'loader/itemsloaderindicator.template.html')
        .constant('DEFAULT_PENDING_TIMEOUT_FOR_EMPTY_SEARCH_TERM', 100)
        .constant('FOUND_TEMPLATE_PATH', 'found.template.html')
        .constant('API_PATH', 'https://davids-restaurant.herokuapp.com/menu_items.json');

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

    MenuSearchService.$inject = ['$q', '$http', '$timeout', 'API_PATH', 'DEFAULT_PENDING_TIMEOUT_FOR_EMPTY_SEARCH_TERM'];
    function MenuSearchService($q, $http, $timeout, apiPath, defaultPendingTimeout) {
        var sevice = this;

        sevice.getMatchedMenuItems = function (searchTerm, pendingTimeoutForEmptySearchTerm) {
            var deferred = $q.defer();
            var result = [];

            searchTerm = (searchTerm || '').trim().toLowerCase();

            if (searchTerm === '') {
                // here we simulate a pending
                $timeout(function () {
                    deferred.reject(result);
                }, pendingTimeoutForEmptySearchTerm || defaultPendingTimeout);

                return deferred.promise;
            }

            $http({
                method: 'GET',
                url: apiPath
            }).then(function (response) {
                var menu = response.data.menu_items;

                menu.forEach(function (dish) {
                    var description = dish.description.toLowerCase();

                    if (description.indexOf(searchTerm) >= 0) {
                        result.push(dish);
                        console.log('description:', '"' + dish.description + '"');
                    }
                });

                deferred.resolve(result);
            }).catch(function (response) {
                result.push({
                    "name": "error",
                    "description": response
                });

                deferred.reject(result);
            });

            return deferred.promise;
        };
    }

    FoundItemsDirective.$inject = ['FOUND_TEMPLATE_PATH'];
    function FoundItemsDirective(templatePath) {
        return {
            templateUrl: templatePath,
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'found',
            bindToController: true
        };
    }

    function FoundItemsDirectiveController() {
    }

    ItemsLoaderIndicatorDirective.$inject = ['ITEMS_LOADER_INDICATOR_TEMPLATE_PATH'];
    function ItemsLoaderIndicatorDirective(templatePath) {
        return {
            templateUrl: templatePath,
            scope: {
                itemsLoaderIndicator: '<',
                pendingTimeout: '<'
            }
        };
    }
})()
