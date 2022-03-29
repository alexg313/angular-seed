'use strict';

function DogService() {

    let service = {};
    let breeds = ['lab', 'pug', 'golden retriever', 'husky'];


    service.isValidBreed = (breed) => {
        return breeds.filter(b => b === breed).length > 0;
    };

    return service;
}


angular.module('myApp')
    .service('DogService', DogService);