/**
 * Created by Vladimir on 07.10.2016.
 */

(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['categoriesList'];
    function CategoryController(categoriesList) {
        this.categoriesList = categoriesList;
    }
})()
