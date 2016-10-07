/**
 * Created by Vladimir on 07.10.2016.
 */

(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categories', {
            templateUrl: 'templates/categories.template.html',
            binding: {
                categoriesList: '<'
            }
        });
})()
