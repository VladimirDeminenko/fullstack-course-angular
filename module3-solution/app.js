/**
 * Created by Vladimir on 28.09.2016.
 */
(function () {
    'use strict';

    const API_PATH = 'https://davids-restaurant.herokuapp.com/menu_items.json';
    const MENU_ITEMS_NOT_FOUND = 'menu_items not found!';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .constant('ApiPath', API_PATH);

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.found = [];
        ctrl.searchTerm = 'eggs';
        ctrl.myService = MenuSearchService;

        console.log('-- 1 --');
        ctrl.searchMenuItems = function () {
            console.log('-- 2 --');
            ctrl.found = ctrl.myService.getMatchedMenuItems(ctrl.searchTerm);
            console.log('-- 3 --', ctrl.found);
        }
    }

    MenuSearchService.$inject = ['$http', 'ApiPath'];
    function MenuSearchService($http, ApiPath) {
        console.log('-- 5 --');
        var sevice = this;

        sevice.getMatchedMenuItems = function (searchTerm) {
            console.log('-- 6 --');
            var promise = $http({
                method: "GET",
                url: ApiPath
            });

            promise.menuItems = [];

            searchTerm = (searchTerm || '').trim().toLowerCase();

            if (searchTerm === '') {
                return promise;
            }

            promise.then(function (response) {
                var menus = response.data.menu_items;

                if (!menus) {
                    throw MENU_ITEMS_NOT_FOUND;
                }

                menus.forEach(function (menu) {
                    var description = menu.description.toLowerCase();

                    if (description.indexOf(searchTerm) >= 0) {
                        console.log(description);
                        promise.menuItems.push(menu);
                    }
                });
            }).catch(function (error) {
                console.error(error);
            }).finally(function () {
                console.info('promise: ', promise);

                return promise;
            });
        };
    }
})
()
