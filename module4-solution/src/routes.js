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
                    categoryList: ['MenuDataService', function (MenuDataService) {
                        var result = MenuDataService.getAllCategories();
                        // console.log('RoutesConfig:', result);

                        return result;
                    }]
                }
            });
    }
})()
