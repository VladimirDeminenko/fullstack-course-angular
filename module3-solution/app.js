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
        .constant('ItemsLoaderIndicatorTemplatePath', 'loader/itemsloaderindicator.template.html')
        .constant('DefaultPendingTimeout', 100)
        .constant('FoundTemplatePath', 'found.template.html')
        .constant('ApiPath', 'https://davids-restaurant.herokuapp.com/menu_items.json');

    NarrowItDownController.$inject = ['MenuSearchService', 'DefaultPendingTimeout'];
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

    MenuSearchService.$inject = ['$q', '$http', '$timeout', 'ApiPath'];
    function MenuSearchService($q, $http, $timeout, ApiPath) {
        var sevice = this;

        sevice.getMatchedMenuItems = function (searchTerm, pendingTimeout) {
            var deferred = $q.defer();
            var result = [];

            searchTerm = (searchTerm || '').trim().toLowerCase();

            if (searchTerm === '') {
                // here we simulate a pending
                $timeout(function () {
                    deferred.reject(result);
                }, pendingTimeout);

                return deferred.promise;
            }

            $http({
                method: 'GET',
                url: ApiPath
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
            });

            return deferred.promise;
        };
    }

    FoundItemsDirective.$inject = ['FoundTemplatePath'];
    function FoundItemsDirective(FoundTemplatePath) {
        return {
            templateUrl: FoundTemplatePath,
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

    ItemsLoaderIndicatorDirective.$inject = ['ItemsLoaderIndicatorTemplatePath'];
    function ItemsLoaderIndicatorDirective (ItemsLoaderIndicatorTemplatePath) {
        return {
            templateUrl: ItemsLoaderIndicatorTemplatePath,
            scope: {
                itemsLoaderIndicator: '<',
                pendingTimeout: '<'
            }
        };
    }

})()
