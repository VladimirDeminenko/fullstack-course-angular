/**
 * Created by Vladimir on 07.10.2016.
 */

(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.template.html'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'src/templates/categories.template.html',
                controller: 'CategoryController',
                controllerAs: 'ctrl',
                resolve: {
                    categoriesList: ['MenuDataService', function (MenuDataService) {
                        var result = MenuDataService.getAllCategories();
                        // console.log('RoutesConfig.state.categories:', result);

                        return result;
                    }]
                }
            })
            .state('items', {
                url: '/items/{shortname}',
                templateUrl: 'src/templates/items.template.html',
                controller: 'ItemsController',
                controllerAs: 'ctrl',
                resolve: {
                    itemsList: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                        var result =  MenuDataService.getItemsForCategory($stateParams.shortname);
                        // console.log('RoutesConfig.$stateParams.shortname:', $stateParams.shortname)
                        // console.log('RoutesConfig.state.items:', result);

                        return result;
                    }],
                }
            });
    }
})()
