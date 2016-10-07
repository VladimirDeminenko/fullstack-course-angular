/**
 * Created by Vladimir on 06.10.2016.
 */

(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('API_PATH_CATEGORIES', 'https://davids-restaurant.herokuapp.com/categories.json')
        .constant('API_PATH_MENU_ITEMS', 'https://davids-restaurant.herokuapp.com/menu_items.json');

    MenuDataService.$inject = ['$q', '$http', 'API_PATH_CATEGORIES', 'API_PATH_MENU_ITEMS'];
    function MenuDataService($q, $http, apiPathCategories, apiPathMenuItems) {
        var service = this;

        this.getAllCategories = function () {
            var defered = $q.defer();

            $http({
                method: 'GET',
                url: apiPathCategories
            }).then(function (response) {
                defered.resolve(response.data);
                console.info('getAllCategories.then:', response.data);

            }).catch(function (response) {
                defered.reject(response);
                console.info('getAllCategories.catch:', response);
            }).finally(function () {
                console.info('getAllCategories.finally:', defered.promise);
                return defered.promise;
            });
        }

        this.getItemsForCategory = function (categoryShortName) {
            var defered = $q.defer();

            $http({
                method: 'GET',
                url: apiPathMenuItems,
                params: {
                    category: categoryShortName
                }
            }).then(function (response) {
                defered.resolve(response.data);
                console.info('getItemsForCategory.then:', response.data);
            }).catch(function (response) {
                defered.reject(response);
                console.info('getItemsForCategory.catch:', response);
            }).finally(function () {
                console.info('getItemsForCategory.finally:', defered.promise);
                return defered.promise;
            });
        }
    }
})()

