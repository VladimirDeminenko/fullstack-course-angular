/**
 * Created by Vladimir on 07.10.2016.
 */

(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['categoryList'];
    function CategoryController(categoryList) {
        this.categoryList = categoryList;
    }
})()
