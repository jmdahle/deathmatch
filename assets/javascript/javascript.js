// game character constuctor
function GameCharacter (name, hp, bap) {
    this.characterName = name;
    this.healthPoints = hp;
    this.baseAttackPower = bap;
    this.attackPower = bap;
    this.counterAttackPower = bap;
}

// create 4 game characters
var gChar1 = new GameCharacter("Abel", 100, 10);
var gChar2 = new GameCharacter("Cain", 150, 15);
var gChar3 = new GameCharacter("Belial", 110, 20);
var gChar4 = new GameCharacter("Demonaz", 150, 12);

// create a game character array
var characters = [gChar1, gChar2, gChar3, gChar4];

// initialize variables for hero and enemies
var hero;
var enemies = [];

// user chooses a character to play as hero
userHeroChoice = 0; // REPLACE with actual choice

// cycle through characters assigning hero to the selected character and assining the remaining characters to enemies
for (var i = 0; i < characters.length; i++) {
    if (i === userHeroChoice) {
        hero = characters[i];
    } else {
        enemies.push(characters[i]);
    }
}

// DEBUG list hero and enemies in console
console.log (hero);
console.log (enemies);

