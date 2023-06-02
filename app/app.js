'use strict';

// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ui.router',
  'myApp.version'
]).
config(['$locationProvider', '$stateProvider', function($locationProvider, $stateProvider) {
  $locationProvider.hashPrefix('!');

  $stateProvider
    .state('dogs', {
      url: '/dogs',
      views: {
          '': {
              templateUrl: 'dogs/dog.html',
              controller: 'DogCtrl as vm'
          },
          'larry': {
              template: "<b> hello I'm Larry </b>"
          }
      },
      resolve: {
        allDogs: function() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(['terrance', 'larry']);
                }, 1000);
            });
        }
      }

    })
    .state('dogs.terrier', {
        url: '/terrier', // /dogs/terrier
        templateUrl: 'dogs/terrier.html',
        controller: function($scope) {
            const vm = this;
            vm.breed = 'terrier';
            vm.animalName = 'Terrance';
            vm.names = ['Bin-laden', 'Al-Assad', 'Zarqāwī'];
            vm.age = 5;
            $scope.$emit('setAnimalName', vm.animalName);

            vm.personalInfo = {rank: 'Ace'};

            vm.onImageClick = (obj) => {
                console.log("What is this ", obj);
            };

            vm.onChange = (val) => {
                vm.personalInfo.rank = ['Ace of Spades', 'Ace of Hearts'][Math.floor(Math.random() * 3)];
                console.log("on-change:: ", val);
            };

            $scope.$on('onAddResult', (event, data) => {
                console.log("On add was triggered", data);
                vm.age = data.result;
            });

        },
        controllerAs: 'vm'
    })
    .state('cats', {
      url: '/cats',
      component: 'garfieldCat'
    });

  // $stateProvider.otherwise({redirectTo: '/view1'});
}]);
