'use strict';

function DogCtrl($scope, $state, DogService, allDogs) {
  const vm = this;
  vm.viewName = "Dogs";
  vm.animalName = "Larry";

  console.log("Dog service???? ", DogService);
  console.log("All dogs? ", allDogs);
  vm.isLabValid = DogService.isValidBreed('lab');

  $scope.$on('setAnimalName', (event, data) => {
    console.log(data);
    vm.animalName = data;
  });

  vm.add = () => {
    vm.result = (vm.firstOperand || 0) + (vm.secondOperand || 0);
  };
}

DogCtrl.$inject = ['$scope', '$state', 'DogService', 'allDogs'];

angular
  .module('myApp')
  .controller('DogCtrl', DogCtrl);