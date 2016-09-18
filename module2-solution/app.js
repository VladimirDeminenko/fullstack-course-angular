(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyShoppingController', ToBuyShoppingController)
        .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyShoppingController(ShoppingListCheckOffService) {
        var ctrl = this;

        ctrl.checkOff = function (index) {
            ShoppingListCheckOffService.checkOff(index);
        };

        ctrl.getList = function () {
            return ShoppingListCheckOffService.getToBuyList();
        };

        ctrl.isEmpty = function () {
            return ShoppingListCheckOffService.isToBuyListEmpty();
        };
    }

    AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
        var ctrl = this;

        ctrl.getList = function () {
            return ShoppingListCheckOffService.getBoughtList();
        };

        ctrl.isEmpty = function () {
            return ShoppingListCheckOffService.isBoughtListEmpty();
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyList = [
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

        var boughtList = [];

        service.checkOff = function (itemIndex) {
            var boughtItem = toBuyList.splice(itemIndex, 1)[0];
            boughtList.push(boughtItem);
        };

        service.getToBuyList = function () {
            return toBuyList;
        };

        service.getBoughtList = function () {
            return boughtList;
        };

        service.isToBuyListEmpty = function () {
            return toBuyList.length == 0;
        };

        service.isBoughtListEmpty = function () {
            return boughtList.length == 0;
        };
    }

})();
