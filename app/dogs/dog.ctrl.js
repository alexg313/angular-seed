'use strict';

function DogCtrl($rootScope, $scope, $state, $interval, DogService, allDogs) {
  const vm = this;

  $scope.animalName = "Larry";

  vm.isLabValid = DogService.isValidBreed('lab');

  $scope.$on('setAnimalName', (event, data) => {
    console.log(data);
    vm.animalName = data;
  });

  $scope.$on("onCatInit", () => {
    console.log("Cat Initialized");
  });


  vm.add = () => {
    vm.result = (vm.firstOperand || 0) + (vm.secondOperand || 0);
    $scope.$broadcast('onAddResult', { result: vm.result });
  };

  vm.onChange = (val) => console.log(val);

  $interval(() => {
    console.log("About to publish triggerInterval");
    $rootScope.$broadcast('triggerInterval');
  }, 50000);
}

angular
  .module('myApp')
  .controller('DogCtrl', DogCtrl);