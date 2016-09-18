(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var ctrl = this;
        var service = ShoppingListCheckOffService;

        ctrl.checkOff = function (index) {
            service.checkOff(index);
        };

        ctrl.getList = function () {
            return service.getToBuyList();
        };

        ctrl.isEmpty = function () {
            return service.isToBuyListEmpty();
        };
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var ctrl = this;
        var service = ShoppingListCheckOffService;

        ctrl.getList = function () {
            return service.getBoughtList();
        };

        ctrl.isEmpty = function () {
            return service.isBoughtListEmpty();
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;

        service.toBuyList = [
            {
                name: "Apples",
                quantity: "3 kg"
            },
            {
                name: "Wild Slamon",
                quantity: "800 gr"
            },
            {
                name: "Coulommiers Cheese",
                quantity: "300 gr"
            },
            {
                name: "Carrots",
                quantity: "500 gr"
            },
            {
                name: "Eggs",
                quantity: "20 pcs"
            },
            {
                name: "Mineral Water",
                quantity: "12 bottles"
            }
        ];

        service.boughtList = [];

        service.checkOff = function (itemIndex) {
            var boughtItem = service.toBuyList.splice(itemIndex, 1)[0];
            service.boughtList.push(boughtItem);
        };

        service.getToBuyList = function () {
            return service.toBuyList;
        };

        service.getBoughtList = function () {
            return service.boughtList;
        };

        service.isToBuyListEmpty = function () {
            return service.toBuyList.length == 0;
        };

        service.isBoughtListEmpty = function () {
            return service.boughtList.length == 0;
        };
    }

})();
