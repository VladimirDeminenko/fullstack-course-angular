/**
 * Created by Vladimir on 06.10.2016.
 */

(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('API_PATH_CATEGORIES', 'https://davids-restaurant.herokuapp.com/categories.json')
        .constant('API_PATH_MENU_ITEMS', 'https://davids-restaurant.herokuapp.com/menu_items.json');

    MenuDataService.$inject = ['$http', 'API_PATH_CATEGORIES', 'API_PATH_MENU_ITEMS'];
    function MenuDataService($http, apiPathCategories, apiPathMenuItems) {
        var service = this;

        service.getAllCategories = function () {
            return $http({
                method: 'GET',
                url: apiPathCategories
            }).then(function (response) {
                return response.data;
            });
        }

        service.getItemsForCategory = function (categoryShortName) {
            // console.info('service.getItemsForCategory.categoryShortName:', categoryShortName);

            return $http({
                method: 'GET',
                url: apiPathMenuItems,
                params: {
                    category: categoryShortName
                }
            }).then(function (response) {
                // console.info('data:', response.data);
                return response.data;
            });
        }
    }
})()

