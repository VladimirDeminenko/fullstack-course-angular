/**
 * Created by Vladimir on 28.09.2016.
 */
(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('ApiPath', 'https://davids-restaurant.herokuapp.com/menu_items.json');

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.found = [];

        ctrl.searchDishes = function () {
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function (response) {
                    ctrl.found = response;
                    console.info('found:', ctrl.found);
                });
        }

        ctrl.removeItem = function (itemIndex) {
            var removedItem = ctrl.found.splice(itemIndex, 1);
            console.log('removed:', removedItem);
        };
    }

    MenuSearchService.$inject = ['$q', '$http', 'ApiPath'];
    function MenuSearchService($q, $http, ApiPath) {
        var sevice = this;

        sevice.getMatchedMenuItems = function (searchTerm) {
            var deferred = $q.defer();
            var result = [];

            searchTerm = (searchTerm || '').trim().toLowerCase();

            if (searchTerm === '') {
                deferred.reject(result);
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

                if (result.length > 0) {
                    deferred.resolve(result);
                }
                else {
                    deferred.reject(result);
                }
            });

            return deferred.promise;
        };
    }

    function FoundItemsDirective() {
        var ddo = {
            restrict: 'AE',
             templateUrl: 'loader/itemsloaderindicator.template.html',
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'loader',
            bindToController: true
        };

        return ddo;
    }

    function FoundItemsDirectiveController() {
        return true;
    }
})()
