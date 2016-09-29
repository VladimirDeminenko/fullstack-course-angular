/**
 * Created by Vladimir on 28.09.2016.
 */
(function () {
    'use strict';

    const API_PATH = 'https://davids-restaurant.herokuapp.com/menu_items.json';
    const DEFAULT_SEARCH_TERM = 'eggs';
    const TAG = 'found:';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiPath', API_PATH);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.found = [];
        ctrl.searchTerm = DEFAULT_SEARCH_TERM;

        ctrl.searchMenuItems = function () {
            MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                .then(function (response) {
                    ctrl.found = response;
                    console.info(TAG, ctrl.found);
                });
        }
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
                method: "GET",
                url: ApiPath
            }).then(function (response) {
                var menu = response.data.menu_items;

                menu.forEach(function (dish) {
                    var description = dish.description.toLowerCase();

                    if (description.indexOf(searchTerm) >= 0) {
                        console.log(description);
                        result.push(dish);
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
})
()
