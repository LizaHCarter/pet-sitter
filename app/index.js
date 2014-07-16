var Pet = require('./models/pet.js');

var p1 = new Pet('frederick', 7, 'male', 'camel');
var p2 = new Pet('lassie', 4, 'female', 'bee');

p1.walk();
p1.eat();
p1.sleep();

while(!p2.isZombie){
  console.log(p2);
  p1.attack(p2);
}

console.log('the winner is ',p1);

console.log('the loser is ',p2);
