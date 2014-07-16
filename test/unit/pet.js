/* global describe, it*/
/*jshint expr:true*/

'use strict';
var expect = require('chai').expect;
var Pet = require('../../app/models/pet.js');

describe('Pet',function(){
  describe('constructor',function(){
    it('should create a new pet', function(){
     var pet = new Pet();
     expect(pet).to.be.ok;
     expect(pet).to.be.instanceof(Pet);
    });
    it('should create a new pet with arguments', function(){
     var pet = new Pet('fluffy', 3, 'female', 'lizard');
     expect(pet.name).to.equal('fluffy');
     expect(pet.age).to.equal(3);
     expect(pet.gender).to.equal('female');
     expect(pet.species).to.equal('lizard');
     expect(pet.isZombie).to.be.false;
     expect(pet.wins).to.equal(0);
     
     expect(pet.health).to.be.within(10,100);
     expect(pet.energy).to.be.within(10,100);
     expect(pet.full).to.be.within(10,100);
    });
  });
  describe('#walk', function(){
    it('should increase health but decrease energy and full', function(){
      var pet = new Pet('fluffy', 3, 'female', 'lizard');
      pet.health = 90;
      pet.energy = 30;
      pet.full = 20;

      pet.walk();
      expect(pet.health).to.be.within(91,93);
      expect(pet.energy).to.be.within(26,28);
      expect(pet.full).to.be.within(15,17);
    });
  });

  describe('#sleep', function(){
    it('should increase health and energy but decrease full', function(){
      var pet = new Pet('fluffy', 3, 'female', 'lizard');
      pet.health = 90;
      pet.energy = 30;
      pet.full = 20;

      pet.sleep();
      expect(pet.health).to.be.within(92,93);
      expect(pet.energy).to.be.within(31,35);
      expect(pet.full).to.be.within(13,16);
    });
  });

  describe('#eat', function(){
    it('should increase health and fullness, but decreases energy', function(){
      var pet = new Pet('fluffy', 3, 'female', 'lizard');
      pet.health = 90;
      pet.energy = 30;
      pet.full = 20;

      pet.eat();
      expect(pet.health).to.be.within(91,94);
      expect(pet.energy).to.be.within(22,27);
      expect(pet.full).to.be.within(25,29);
    });
  });

  describe('#attack', function(){
    it('should allow pets to cage fight', function(){
      var pet1 = new Pet('fluffy', 3, 'female', 'sloth');
      pet1.health = 45;
      pet1.energy = 60;
      pet1.full = 90;

      var pet2 = new Pet('baxter',5,'male', 'monkey');
      pet2.health = 70;
      pet2.energy = 50;
      pet2.full = 80;

      pet1.attack(pet2);
      expect(pet2.health).to.be.within(54.5,59.5);
      expect(pet2.isZombie).to.be.false;
    });
    it('should cause a pet with negative health to become a Zombie', function(){
      var pet1 = new Pet('fluffy', 3, 'female', 'sloth');
      var pet2 = new Pet('baxter', 5, 'male', 'monkey');

    for(var i = 0; i < 1000; i++){
      pet1.attack(pet2);
    }
      expect(pet2.isZombie).to.be.true;
      expect(pet1.wins).to.equal(1);
    });
    it('should allow a zombie pet to attack', function(){
      var pet1 = new Pet('fluffy', 3, 'female', 'sloth');
      pet1.health = 50;

      var pet2 = new Pet('baxter', 5, 'male', 'monkey');
      pet2.isZombie = true;

      pet2.attack(pet1);

      expect(pet1.health).to.be.within(45,50);
      expect(pet1.isZombie).to.be.false;
  });

 });

  describe('#resurrect', function(){
    it('should resurrect the pet', function(){
      var pet1 = new Pet('fluffy', 3, 'female', 'lizard');
      pet1.isZombie = true;
      pet1.wins = 8;

      pet1.resurrect();

      expect(pet1.isZombie).to.be.false;
      expect(pet1.wins).to.equal(3);
      expect(pet1.health).to.be.within(25,50);
    });
    it('should not resurrect the pet-still alive', function(){
      var pet1 = new Pet('fluffy', 3, 'female', 'lizard');
      pet1.isZombie = false;
      pet1.wins = 8;

      pet1.resurrect();

      expect(pet1.isZombie).to.be.false;
      expect(pet1.wins).to.equal(8);
    });

    it('should not resurrect the pet - not enough wins', function(){
      var pet1 = new Pet('fluffy', 3, 'female', 'lizard');
      pet1.isZombie = true;
      pet1.wins = 2;

      pet1.resurrect();

      expect(pet1.isZombie).to.be.true;
      expect(pet1.wins).to.equal(2);
    });

  });

});
