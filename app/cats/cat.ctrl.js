'use strict';

function CatCtrl() {
    const vm = this;
    console.log(vm);

    vm.$onInit = function() {
        console.log(vm.lastName);
        vm.lastName = vm.lastName || 'Arbuckle';
        vm.fullName = "Garfield " + vm.lastName;
    };
}

angular.module('myApp')
.component('garfieldCat', {
    templateUrl: 'cats/cat.html',
    controller: CatCtrl,
    controllerAs: 'vm',
    bindings: {
        lastName: '@'
    }
});