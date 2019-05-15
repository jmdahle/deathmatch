// Search for uppercase key words
// NOTE REPLACE DEBUG

// everything is inside document.ready funciton to ensure page loads before any code is executed
$(document).ready(function () {
    // initialize global variables
    var heroSelected = false;
    var opponentSelected = false;
    var heroIndex = 0;
    var oppIndex = 0;
    var characters = [];

    var charButton = [];
    var enemies = [];
    var enemyButton = [];
    var hero;
    var heroButton;
    var opponent;
    var oppButton;

    // game character constuctor
    function GameCharacter(name, hp, bap, imgloc) {
        this.characterName = name;
        this.status = "char"; //other roles: enemy hero opp grave
        this.healthPoints = hp;
        this.baseAttackPower = bap;
        this.charImage = imgloc;
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

    function updateCharStatus() {
        for (var i = 0; i < characters.length; i++) {
            // remove the character button if it exists
            console.log("char" + i + "length: " + $("#char" + i).length);
            if ($("#char" + i).length > 0) {
                console.log("removing char" + i);
                $("#char" + i).remove();
            }
            // construct the character button
            var characterButton = $("<button>");
            characterButton.attr("id", "char" + i);
            characterButton.attr("class", "character " + characters[i].status);
            characterButton.attr("zone", characters[i].status);
            characterButton.attr("charindex", i);
            characterButton.html(characters[i].characterName + "<br><img class='charimage' src='" + characters[i].charImage + "'><br><div id='hp" + i + "' class='hp'>" + characters[i].healthPoints + "hp</div>");

            // place character button in its proper zone based on status
            switch (characters[i].status) {
                case "char":
                    $("#characterContainer").append(characterButton);
                    $("#char" + i).on("click", function () {
                        charIndex = $(this).attr("charindex");
                        selectHero(charIndex);
                    });
                    // $("#chardiv" + charCounter).append(characterButton);
                    // $("#chardiv" + charCounter).on("click", function() {
                    //     alert("clicked on character");
                    // });
                    break;
                case "hero":
                    $("#heroContainer").append(characterButton);
                    heroSelected = true;
                    heroIndex = i;
                    break;
                case "enemy":
                    $("#enemyContainer").append(characterButton);
                    $("#char" + i).on("click", function () {
                        charIndex = $(this).attr("charindex");
                        selectOpponent(charIndex);
                    });
                    break;
                case "opp":
                    $("#opponentContainer").append(characterButton);
                    opponentSelected = true;
                    oppIndex = i;
                    break;
                default:
                    console.log("unhandled case for " & characters[i].status);
            }
        }
    }

    function selectHero(idx) {
        if (!heroSelected) {
            console.log("selected hero is char" + idx, characters[idx].characterName);
            // update selected hero to status = "hero"
            // and update other characters to status = "enemy"
            for (var i = 0; i < characters.length; i++) {
                if (idx == i) {
                    characters[i].status = "hero";
                    postMessage("You seleted " + characters[i].characterName + " as your hero.  Now select an opponent from the remaining enemies");
                } else {
                    characters[i].status = "enemy";
                }
            }
        }
        updateCharStatus();
    }

    function selectOpponent(idx) {
        if (!opponentSelected) {
            console.log("selected opponent is char" + idx, characters[idx].characterName);
            // update selected hero to status = "opp"
            characters[idx].status = "opp";
            postMessage("You seleted " + characters[idx].characterName + " as your opponent.  Click the 'Attack!' button to attack your opponent until one of you is defeated.");
        }
        updateCharStatus();
    }
    // create game containers and buttons
    // characters inside character selection 
    // comments out - replaced with function updateCharStatus
    // for (var i = 0; i < characters.length; i++) {
    //     charButton[i] = $("<button>");
    //     charButton[i].attr("id", "char" + i);
    //     charButton[i].attr("class", "character char");
    //     charButton[i].attr("zone", "char");
    //     charButton[i].attr("charindex", i);
    //     charButton[i].html(characters[i].characterName + "<br><img class='charimage' src='" + characters[i].charImage + "'><br><div id='hp" + i + "' class='hp'>" + characters[i].healthPoints + "hp</div>");
    //     $("#chardiv"+i).append(charButton[i]);
    //     $("#chardiv"+i).attr("charindex",i);
    //     $("#chardiv"+i).on("click", chooseHero);
    // }
    updateCharStatus();
    // initial game message
    postMessage("Choose a hero from the list of characters to begin.");
    // assign event for attack button
    $("#btnAttack").on("click", attackOpponent);

    // hit function
    function hitSuccessful(prob) {
        // is random # between 1-100 <= prob?
        return (Math.floor(Math.random() * 100) + 1 <= prob);
    }

    // post a message to the message area
    function postMessage(msg) {
        // alert (msg);
        $("#gameMessage").text(msg);
    }

    // handle hero selection
    function chooseHero(event) {
        if (!heroSelected) {
            // user chooses a character to play as hero
            heroindex = parseInt($(this).attr("charindex"));
            hero = characters[heroindex]; // global variable re-assignment
            // move hero to heroContainer
            heroButton = $("#char" + heroindex);
            heroButton.attr("class", "character hero");
            heroButton.attr("zone", "hero");
            charButton[heroindex].remove();
            $("#herodiv").append(heroButton);
            $("#herodiv" + i).attr("charindex", heroindex);
            // cycle through characters assigning the remaining characters to enemies
            idx = 0;
            for (var i = 0; i < characters.length; i++) {
                if (!(i === heroindex)) {
                    enemies.push(characters[i]);
                    // add enemies to enemyContainer
                    enemyButton[enemyButton.length - 1] = $("#char" + i);
                    enemyButton[enemyButton.length - 1].attr("class", "character enemy");
                    enemyButton[enemyButton.length - 1].attr("zone", "enemy");
                    charButton[i].remove();
                    $("#enemydiv" + idx).append(enemyButton[enemyButton.length - 1]);
                    // assign a button to the enemydiv
                    $("#enemydiv" + idx).attr("charindex", i);
                    $("#enemydiv" + idx).on("click", chooseOpponent);
                    idx++;
                }
            }
            heroSelected = true; // global variable re-assignment
            postMessage("You seleted " + hero.characterName + " as your hero.  Now select an opponent from the remaining enemies");
            // $(".char").hide();
        }
    }

    // handle opponent selection
    // $(".enemy").on("click", function () {
    function chooseOpponent(event) {
        if (!opponentSelected) {
            oppindex = parseInt($(this).attr("charindex"));
            opponent = characters[oppindex];
            // create a copy of enemy
            oppButton = $("#char" + oppindex);
            // remove enemy from enemyContainer
            $("#char" + oppindex).remove();
            // add opponent to opponentContainer
            oppButton.attr("class", "character opponent");
            oppButton.attr("zone", "opponent");
            $("#oppdiv").attr("charindex", oppindex);
            $("#oppdiv").append(oppButton);
            opponentSelected = true;
            postMessage("You seleted " + opponent.characterName + " as your opponent.  Click the 'attack' button to attack your opponent until one of you is defeated.");
            // Ready to battle
            // NOTE enable the attack button
            opponentSelected = true;
        }
    }

    // Each time the attack button is pressed
    function attackOpponent() {
        if (opponentSelected && heroSelected) {
            attackMessage = "";
            // hero attack
            // if successful (in this game, always is)
            var heroAttackSuccessful = hitSuccessful(100);
            if (heroAttackSuccessful) {
                // attack was successful!
                // reduce HP of opponent
                characters[oppIndex].healthPoints -= characters[heroIndex].attackPower;
                console.log("opponent health: " + characters[oppIndex].healthPoints); // DEBUG
                attackMessage += characters[heroIndex].characterName + " attacked " + characters[oppIndex].characterName + " for " + characters[heroIndex].attackPower + " points of damage, reducing " + characters[oppIndex].characterName + "'s health to " + characters[oppIndex].healthPoints + ".  ";
                // increase attack strength
                characters[heroIndex].attackPower += characters[heroIndex].baseAttackPower;
                console.log("hero attack power: " + characters[heroIndex].attackPower); // DEBUG
                postMessage(attackMessage);
                // check if opponent defeated?
                if (characters[oppIndex].healthPoints < 1) {
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
                characters[heroIndex].healthPoints -= characters[oppIndex].counterAttackPower;
                console.log("hero health: " + characters[heroIndex].healthPoints); // DEBUG
                console.log("opponent counter-attack power" + characters[oppIndex].counterAttackPower); // DEBUG
                attackMessage += characters[oppIndex].characterName + " counter-attacked " + characters[heroIndex].characterName + " for " + characters[oppIndex].counterAttackPower + " points of damage, reducing " + characters[heroIndex].characterName + "'s health to " + characters[heroIndex].healthPoints + ".  ";
                postMessage(attackMessage);
                // check if hero defeated
                if (characters[heroIndex].healthPoints < 1) {
                    // YES - end game
                }
                // NO - end current attack
            } else {
                // attack was un-successful!
                // DEBUG - assuming 100% hits, so this is a problem
                alert("Opponent missed!  Now THAT is not supposed to happen in this game.");
            }
        updateCharStatus();
        }
    };



    // end of document.ready
});