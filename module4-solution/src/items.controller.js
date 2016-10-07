/**
 * Created by Vladimir on 08.10.2016.
 */

(function () {
    'use strict';

    angular.module('MenuApp')
        .controller('ItemsController', ItemsController);

    ItemsController.$inject = ['itemsList'];
    function ItemsController(itemList) {
        console.info('ItemsController:', itemList);

        var ctrl = this;
        ctrl.items = itemList.menu_items;
        ctrl.categoryName = itemList.category.name;
    }
})()
