/**
 * Created by Vladimir on 08.10.2016.
 */

(function () {
    'use restrict';

    angular.module('MenuApp')
        .component('items', {
            templateUrl: 'templates/items.template.html',
            binding: {
                itemsList: '<'
            }
        });;
})()
