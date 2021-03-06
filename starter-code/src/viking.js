// Soldier
function Soldier(health, strength) {
    this.health = health;
    this.strength = strength;

    this.attack = function(){
        return this.strength;
    }

    this.receiveDamage = function (damage){
        this.health = this.health - damage;
    }
}



// Viking
function Viking(name, health, strength) {
    Soldier.call(this, health, strength);
    this.name = name;

    this.receiveDamage = function (damage){
        this.health = this.health - damage;
        if (this.health > 0){
            return `${this.name} has received ${damage} points of damage`;
        } else {
            return `${this.name} has died in act of combat`;
        }
    }

    this.battleCry = function(){
        return `Odin Owns You All!`;
    }
}

Viking.prototype = Object.create(Soldier.prototype);
Viking.prototype.constructor = Viking;

// Saxon
function Saxon(health, strength) {
    Soldier.call(this, health, strength);

    this.receiveDamage = function (damage){
        this.health = this.health - damage;
        if (this.health > 0){
            return `A Saxon has received ${damage} points of damage`;
        } else {
            return `A Saxon has died in combat`;
        }
    };
}
Saxon.prototype = Object.create(Soldier.prototype);
Saxon.prototype.constructor = Saxon;

// War
function War() {
    this.vikingArmy = [];
    this.saxonArmy = [];

    this.addViking = function addViking(Viking){
        this.vikingArmy.push(Viking);
    };

    this.addSaxon = function addSaxon(Saxon){
        this.saxonArmy.push(Saxon);
    };

    this.vikingAttack = function vikingAttack(){
        var randomSaxon = Math.floor(Math.random()*this.saxonArmy.length);
        var randomViking = Math.floor(Math.random()*this.vikingArmy.length);

        var result = this.saxonArmy[randomSaxon].receiveDamage(this.vikingArmy[randomViking].strength);

        if (this.saxonArmy[randomSaxon].health <= 0){
            this.saxonArmy.splice(randomSaxon, 1);
        }
        return result;
    };

    this.saxonAttack = function saxonAttack(){
        var randomSaxon = Math.floor(Math.random()*this.saxonArmy.length);
        var randomViking = Math.floor(Math.random()*this.vikingArmy.length);

        var result = this.vikingArmy[randomViking].receiveDamage(this.saxonArmy[randomSaxon].strength);

        if (this.vikingArmy[randomViking].health <= 0){
            this.vikingArmy.splice(randomViking, 1);
        }
        return result;
    }

    this.showStatus = function(){
        if (this.saxonArmy.length <= 0){
            return "Vikings have won the war of the century!";
        }  else if (this.vikingArmy.length <= 0){
            return "Saxons have fought for their lives and survive another day...";
        } else {
            return "Vikings and Saxons are still in the thick of battle.";
        }
    }
}