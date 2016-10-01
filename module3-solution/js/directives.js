/**
 * Created by Vladimir on 01.10.2016.
 */

(function () {
    'use strict';

    angular.module('Directives', ['Constants'])
        .directive('foundItems', FoundItemsDirective)
        .directive('itemsLoaderIndicator', ItemsLoaderIndicatorDirective);


    FoundItemsDirective.$inject = ['FOUND_TEMPLATE_PATH'];
    function FoundItemsDirective(templatePath) {
        return {
            templateUrl: templatePath,
            scope: {
                items: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'found',
            bindToController: true
        };
    }

    function FoundItemsDirectiveController() {
    }

    ItemsLoaderIndicatorDirective.$inject = ['ITEMS_LOADER_INDICATOR_TEMPLATE_PATH'];
    function ItemsLoaderIndicatorDirective(templatePath) {
        return {
            templateUrl: templatePath,
            scope: {
                itemsLoaderIndicator: '<',
                pendingTimeout: '<'
            }
        };
    }

})()
