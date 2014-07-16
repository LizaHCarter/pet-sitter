'use strict';

function Pet(name, age, gender, species, health, energy, full){
  this.name = name;
  this.age = parseInt(age);
  this.gender = gender;
  this.species = species;

  this.health = Math.floor(Math.random()*91)+10;
  this.energy = Math.floor(Math.random()*91)+10;
  this.full = Math.floor(Math.random()*91)+10;

  this.isZombie = false;
  this.wins = 0;
}

module.exports = Pet;

Pet.prototype.walk = function(){
  this.health = this.health + (Math.floor(Math.random()*3)+1);
  this.energy = this.energy - (Math.floor(Math.random()*3)+2);
  this.full = this.full - (Math.floor(Math.random()*3)+3);
};


Pet.prototype.sleep = function(){
  this.health = this.health + (Math.floor(Math.random()*2)+2);
  this.energy = this.energy + (Math.floor(Math.random()*5)+1);
  this.full = this.full - (Math.floor(Math.random()*4)+4);
};


Pet.prototype.eat = function(){
  this.health = this.health + (Math.floor(Math.random()*4)+1);
  this.energy = this.energy - (Math.floor(Math.random()*4)+3);
  this.full = this.full + (Math.floor(Math.random()*4)+5);
};


Pet.prototype.attack = function(pet){
  var damage = (this.health / 10) + (this.energy / 20) + (this.full / 30);
  damage += parseInt(Math.random() * 5);

  pet.health -= damage;
  pet.health = parseInt(pet.health);


  if((pet.health < 0)&& !pet.isZombie){
    pet.isZombie = true;
    this.wins++;
  }

  if(this.isZombie === true){

    pet.health  = 50;
    pet.health -= (Math.floor(Math.random()*4)+ 2);
  }

Pet.prototype.resurrect = function(){
  if(this.isZombie === true && this.wins >= 5){
  
  this.health = 0;
  this.isZombie = false;
  this.wins -= 5;
  this.health += Math.floor(Math.random()*26) + 25; 
  }
};

};

