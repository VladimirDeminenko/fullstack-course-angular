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

        this.getAllCategories = function () {
            return $http({
                method: 'GET',
                url: apiPathCategories
            }).then(function (response) {
                return response.data;
            });
        }

        this.getItemsForCategory = function (categoryShortName) {
            $http({
                method: 'GET',
                url: apiPathMenuItems,
                params: {
                    category: categoryShortName
                }
            }).then(function (response) {
                return response.data;
            });
        }
    }
})()

