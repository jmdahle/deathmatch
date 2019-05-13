// Search for uppercase key words
// NOTE REPLACE DEBUG

// everything is inside document.ready funciton to ensure page loads before any code is executed
$(document).ready(function () {
    // initialize global variables
    var heroSelected = false;
    var opponentSelected = false;
    var enemies = [];
    var hero;
    var opponent;
    var characters = [];    

    // game character constuctor
    function GameCharacter(name, hp, bap, loc) {
        this.characterName = name;
        this.healthPoints = hp;
        this.baseAttackPower = bap;
        this.charImage = loc;
        this.attackPower = bap;
        this.counterAttackPower = bap;
    }

    // create 4 game characters
    var gChar1 = new GameCharacter("Sleipnir", 100, 10, "./assets/images/sleipnir.jpg");
    var gChar2 = new GameCharacter("Hel", 110, 20, "./assets/images/hel.jpg");
    var gChar3 = new GameCharacter("Fenrir", 150, 15, "./assets/images/fenrir.jpg");
    var gChar4 = new GameCharacter("Jormungandr", 150, 12, "./assets/images/jormungandr.jpg");

    // create a game character array
    characters = [gChar1, gChar2, gChar3, gChar4];

    // create game containers and buttons
    // DIV main container
    var gameMainDiv = $("<div>");
    gameMainDiv.attr("id", "gameMain");
    gameMainDiv.attr("class", "container");
    $("body").append(gameMainDiv);
    // DIV to hold message area
    var messageDiv = $("<div>");
    messageDiv.attr("id", "messageContainer");
    $("#gameMain").append(messageDiv);
    var messageP = $("<p>");
    messageP.attr("id", "gameMessage");
    messageP.text("Test text");
    messageDiv.append(messageP);
    // DIV to hold character selection
    var characterDiv = $("<div>");
    characterDiv.attr("id", "charContainer");
    characterDiv.attr("class", "char");
    characterDiv.html("<p class='divHeading'>Available characters:</p>");
    $("#gameMain").append(characterDiv);
    // characters inside character selection
    for (var i = 0; i < characters.length; i++) {
        var charButton = $("<button>");
        charButton.attr("id", "char" + i);
        charButton.attr("class", "character char");
        charButton.attr("charindex", i);
        charButton.text(characters[i].characterName);
        charButton.html(characters[i].characterName + "<br><img class='charimage' src='" + characters[i].charImage + "'><br>" + characters[i].healthPoints + "hp");
        charButton.on("click", chooseHero);
        $("#charContainer").append(charButton);
    }
    // DIV to hold "battle arena"
    var arenaDiv = $("<div>");
    arenaDiv.attr("id", "arena");
    $("#gameMain").append(arenaDiv);
    // DIV to hold hero selected
    var heroDiv = $("<div>");
    heroDiv.attr("id", "heroContainer");
    heroDiv.attr("class", "hero");
    heroDiv.html("<p class='divHeading'>Your Hero</p>");
    $("#arena").append(heroDiv);
    // create an attack button
    var buttonAttack = $("<button>");
    buttonAttack.attr("id", "btnAttack");
    buttonAttack.attr("type", "button");
    buttonAttack.attr("value", "attack");
    buttonAttack.on("click", attackOpponent);
    buttonAttack.text("Attack!");
    $("#arena").append(buttonAttack);
    // DIV to hold opponent
    var opponentDiv = $("<div>");
    opponentDiv.attr("id", "opponentContainer");
    opponentDiv.attr("class", "opponent");
    opponentDiv.html("<p class='divHeading'>Current Opponent</p>");
    $("#arena").append(opponentDiv);
    // DIV to hold enemies
    var enemyDiv = $("<div>");
    enemyDiv.attr("id", "enemyContainer");
    enemyDiv.attr("class", "enemy");
    enemyDiv.html("<p class='divHeading'>Enemies Remaining</p>");
    $("#gameMain").append(enemyDiv);

    // initial game messaghe
    postMessage("Choose a hero from the list of characters to begin.");

    // hit function
    function hitSuccessful(prob) {
        // is random # between 1-100 <= prob?
        return (Math.floor(Math.random() * 100) + 1 <= prob);
    }

    // post a message to the message area
    function postMessage (msg) {
        // alert (msg);
        $("#gameMessage").text(msg);
    }

    // handle hero selection
    function chooseHero(event) {
        if (!heroSelected) {
            // "this" is the specific button clicked    
            // user chooses a character to play as hero
            var userHeroChoice = parseInt($(this).attr("charindex"));
            console.log(userHeroChoice + " = " + characters[userHeroChoice].characterName); // DEBUG    
            hero = characters[userHeroChoice]; // global variable re-assignment
            // add hero to heroContainer
            var heroButton = $("<button>");
            heroButton.attr("id", "hero");
            heroButton.attr("class", "character hero");
            heroButton.text(hero.characterName);
            heroButton.html(hero.characterName + "<br><img class='charimage' src='" + hero.charImage + "'><br>" + hero.healthPoints + "hp");
            $("#heroContainer").append(heroButton);
            // cycle through characters assigning the remaining characters to enemies
            for (var i = 0; i < characters.length; i++) {
                if (!(i === userHeroChoice)) {
                    enemies.push(characters[i]);
                    var enemyIndex = enemies.length - 1;
                    // add enemies to enemyContainer
                    var enemyButton = $("<button>");
                    enemyButton.attr("id", "enemy" + enemyIndex);
                    enemyButton.attr("class", "character enemy");
                    enemyButton.attr("enemyindex", enemyIndex);
                    enemyButton.text(enemies[enemyIndex].characterName);
                    enemyButton.html(enemies[enemyIndex].characterName + "<br><img class='charimage' src='" + enemies[enemyIndex].charImage + "'><br>" + enemies[enemyIndex].healthPoints + "hp");
                    enemyButton.on("click", chooseOpponent);
                    $("#enemyContainer").append(enemyButton);
                }
            }
            heroSelected = true; // global variable re-assignment
            postMessage("You seleted " + hero.characterName + " as your hero.  Now select an opponent from the remaining enemies");
            $(".char").hide();
        }
    }

    // handle opponent selection
    // $(".enemy").on("click", function () {
    function chooseOpponent(event) {
        if (!opponentSelected) {
            var userEnemyChoice = parseInt($(event.currentTarget).attr("enemyindex"));
            opponent = enemies[userEnemyChoice];
            enemies.splice(userEnemyChoice, 1);
            // remove opponent from enemyContainer
            $("#enemy" + userEnemyChoice).remove();
            // add opponent to opponentContainer
            var opponentButton = $("<button>");
            opponentButton.attr("id", "opponent");
            opponentButton.attr("class", "character opponent");
            opponentButton.text(opponent.characterName);
            opponentButton.html(opponent.characterName + "<br><img class='charimage' src='" + opponent.charImage + "'><br>" + opponent.healthPoints + "hp");            $("#opponentContainer").append(opponentButton);
            opponentSelected = true;
            postMessage("You seleted " + opponent.characterName + " as your opponent.  Click the 'attack' button to attack your opponent until one of you is defeated.");

        }
        // Ready to battle
        // NOTE enable the attack button
    }

    // Each time the attack button is pressed
    function attackOpponent() {
        if (opponentSelected && heroSelected) {
            // hero attack
            // if successful (in this game, always is)
            var heroAttackSuccessful = hitSuccessful(100);
            if (heroAttackSuccessful) {
                // attack was successful!
                // reduce HP of opponent
                opponent.healthPoints -= hero.attackPower;
                console.log("opponent health: " + opponent.healthPoints); // DEBUG
                // increase attack strength
                hero.attackPower += hero.baseAttackPower;
                console.log("hero attack power: " + hero.attackPower); // DEBUG
                // check if opponent defeated?
                if (opponent.healthPoints < 1) {
                    // YES - move oppoent to graveyard and choose new opponent
                }
                // NO - continue
            } else {
                // attack was un-successful!
                // DEBUG - assuming 100% hits, so this is a problem
                alert("Hero missed!  Now THAT is not supposed to happen in this game.");
            }
            // opponent counter attack
            // if successful (in this game, always is)
            var oppAttackSuccessful = hitSuccessful(100);
            if (oppAttackSuccessful) {
                // attack was successful!
                // reduce HP of hero
                hero.healthPoints -= opponent.counterAttackPower;
                console.log("hero health: " + hero.healthPoints); // DEBUG
                console.log("opponent counter-attack power" + opponent.counterAttackPower); // DEBUG
                // check if hero defeated
                if (hero.healthPoints < 1) {
                    // YES - end game
                }
                // NO - end current attack
            } else {
                // attack was un-successful!
                // DEBUG - assuming 100% hits, so this is a problem
                alert("Opponent missed!  Now THAT is not supposed to happen in this game.");
            }
        }
    };



    // end of document.ready
});