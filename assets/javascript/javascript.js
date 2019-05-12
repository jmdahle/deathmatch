// Search for uppercase key words
// NOTE REPLACE DEBUG

// everything is inside document.ready funciton to ensure page loads before any code is executed
$(document).ready(function () {
    // initialize
    // game character constuctor
    function GameCharacter(name, hp, bap) {
        this.characterName = name;
        this.healthPoints = hp;
        this.baseAttackPower = bap;
        this.attackPower = bap;
        this.counterAttackPower = bap;
    }
    // hit probability
    function hitSuccessful(prob) {
        // is random # between 1-100 <= prob?
        return (Math.floor(Math.random()*100)+1 <= prob);
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
    var userHeroChoice = 0; // REPLACE with actual choice

    // cycle through characters assigning hero to the selected character and assining the remaining characters to enemies
    for (var i = 0; i < characters.length; i++) {
        if (i === userHeroChoice) {
            hero = characters[i];
        } else {
            enemies.push(characters[i]);
        }
    }

    // DEBUG list hero and enemies in console
    console.log(hero);
    console.log(enemies);

    // user chooses an opponent from remaining enemies to battle
    var userEnemyChoice = 0; //REPLACE with actual choice
    opponent = enemies[userEnemyChoice];

    // DEBUG list opponent in console
    console.log(opponent);

    // Ready to battle
    // create an attack button
    // REPALCE location once we are ready to lay out
    var buttonAttack = $("<button>");
    buttonAttack.attr("id","btnAttack");
    buttonAttack.attr("type", "button");
    buttonAttack.attr("value", "attack");
    buttonAttack.text("Attack!");
    $("#gameMain").append(buttonAttack);
    // Each time the attack button is pressed
    buttonAttack.on("click", function() {
        // DEBUG click to console
        console.log("Attack!");
        // hero attack
        // if successful (in this game, always is)
        var heroAttackSuccessful = hitSuccessful(100);
        if (heroAttackSuccessful) {
            // attack was successful!
            // reduce HP of opponent
            // increase attack strength
            // check if opponent defeated?
            // YES - move oppoent to graveyard and choose new opponent
            // NO - continue
        } else {
            // attack was un-successful!
            // DEBUG - assuming 100% hits, so this is a problem
            alert ("Hero missed!  Now THAT is not supposed to happen in this game.");
        }    
        // opponent counter attack
        // if successful (in this game, always is)
        var oppAttackSuccessful = hitSuccessful(100);
        if (oppAttackSuccessful) {
            // attack was successful!
            // reduce HP of hero
            // check if hero defeated
            // YES - end game
            // NO - end current attack
        } else {
            // attack was un-successful!
            // DEBUG - assuming 100% hits, so this is a problem
            alert ("Opponent missed!  Now THAT is not supposed to happen in this game.");
        }
    });
   


    // end of document.ready
});