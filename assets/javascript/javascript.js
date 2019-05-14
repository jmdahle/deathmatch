// Search for uppercase key words
// NOTE REPLACE DEBUG

// everything is inside document.ready funciton to ensure page loads before any code is executed
$(document).ready(function () {
    // initialize global variables
    var heroSelected = false;
    var opponentSelected = false;
    var characters = [];   
    var charButton = []; 
    var enemies = [];
    var enemyButton = [];
    var hero;
    var heroButton;
    var opponent;
    var oppButton;

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
    // characters inside character selection 
    for (var i = 0; i < characters.length; i++) {
        charButton[i] = $("<button>");
        charButton[i].attr("id", "char" + i);
        charButton[i].attr("class", "character char");
        charButton[i].attr("zone", "char");
        charButton[i].attr("charindex", i);
        charButton[i].html(characters[i].characterName + "<br><img class='charimage' src='" + characters[i].charImage + "'><br><div id='hp" + i + "' class='hp'>" + characters[i].healthPoints + "hp</div>");
        charButton[i].on("click", clickChar);
        $("#charContainer").append(charButton[i]);
    }
    // place charButtons in the correct zones
    
    // function charZones() {
    //     alert ("alloc all chars to zones");
    //     for (var i = 0; i < characters.length; i++) {
    //         thisButton = charButton[i];
    //         thisZone = charButton[i].attr("zone");
    //         charButton[i].remove();
    //         swtich (thisZone) {
    //             case "char":
    //                 $("#charContainer").append(thisButton);
    //                 break;
    //             case: "hero":
    //                 $("heroContainer").append(thisButton);
    //                 break;
    //         }
    //     }
    // }

    // charZones();

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

    // handle clicking character
    function clickChar(event) {
        alert ("character clicked");
        // branch to function based on state
        currZone = $(this).attr("zone")
        currIndex = $(this).attr("charindex");
        switch (currZone) {
            case "char":
                if (!heroSelected) {
                    // if the character is in the char zone, and a hero has not been selected, select the hero, move the rest to enemy
                    chooseHero(currIndex);
                }
                break;
            case "enemy":
                if ((!opponentSelected) && (heroSelected))  {
                    // if the character is in the enemy zone, and the hero has been selected, select the opponent
                    chooseOpponent(currIndex);
                }
        }
        
    }
    // handle hero selection
    function chooseHero(heroindex) {
        if (!heroSelected) {
            // user chooses a character to play as hero
            heroindex = parseInt(heroindex);
            hero = characters[heroindex]; // global variable re-assignment
            // move hero to heroContainer
            heroButton = $("#char" + heroindex);
            heroButton.attr("class", "character hero");
            heroButton.attr("zone", "hero");
            charButton[heroindex].remove();
            $("#heroContainer").append(heroButton);
            // cycle through characters assigning the remaining characters to enemies
            for (var i = 0; i < characters.length; i++) {
                if (!(i === heroindex)) {
                    enemies.push(characters[i]);
                    // add enemies to enemyContainer
                    enemyButton[i] = $("#char" + i);
                    enemyButton[i].attr("class", "character enemy");
                    enemyButton[i].attr("zone","enemy");
                    enemyButton[i].on("click", clickChar);
                    charButton[i].remove();
                    $("#enemyContainer").append(enemyButton[i]);
                }
            }
            heroSelected = true; // global variable re-assignment
            postMessage("You seleted " + hero.characterName + " as your hero.  Now select an opponent from the remaining enemies");
            // $(".char").hide();
        }
    }

    // handle opponent selection
    // $(".enemy").on("click", function () {
    function chooseOpponent(oppindex) {
        if (!opponentSelected) {
            opponent = characters[oppindex];
            // add opponent to opponentContainer
            oppButton = $("#char" + oppindex);
            oppButton.attr("class", "character opponent");
            oppButton.attr("zone", "opponent");
            $("#opponentContainer").append(oppButton);
            // remove opponent from enemyContainer
            $("#char" + oppindex).remove();
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