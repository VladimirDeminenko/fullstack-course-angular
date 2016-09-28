/**
 * Created by Vladimir on 28.09.2016.
 */
(function () {
    'use strict';

    const API_PATH = 'https://davids-restaurant.herokuapp.com/menu_items.json';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiPath', API_PATH);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.found = [1, 2, 3];
        ctrl.searchTerm = 'eggs';
        ctrl.myService = MenuSearchService;

        ctrl.searchMenuItems = function () {
            console.log('found: ', ctrl.found);
            ctrl.found = ctrl.myService.getMatchedMenuItems(ctrl.searchTerm);
            console.info('found: ', ctrl.found);
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
                var menus = response.data.menu_items;

                menus.forEach(function (menu) {
                    var description = menu.description.toLowerCase();

                    if (description.indexOf(searchTerm) >= 0) {
                        console.log(description);
                        result.push(menu);
                    }
                });

                deferred.resolve(result);

            }).catch(function (error) {
                console.error(error);
                deferred.reject(result);

            }).finally(function () {
                console.info('promise: ', deferred.promise);
                console.info('result: ', result);

                return deferred.promise;
            });
        };
    }
})
()
