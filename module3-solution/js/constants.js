/**
 * Created by Vladimir on 01.10.2016.
 */

(function () {
    'use strict';

    angular.module('Constants', [])
        .constant('API_PATH', 'https://davids-restaurant.herokuapp.com/menu_items.json')
        .constant('DEFAULT_PENDING_TIMEOUT_FOR_EMPTY_SEARCH_TERM', 100)
        .constant('FOUND_TEMPLATE_PATH', 'found.template.html')
        .constant('ITEMS_LOADER_INDICATOR_TEMPLATE_PATH', 'loader/itemsloaderindicator.template.html');
})()
