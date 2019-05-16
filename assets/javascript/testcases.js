console.log ("test running...");
var testcases = [];

testcases.push ([0,1,2,3]);
testcases.push ([0,1,3,2]);
testcases.push ([0,2,3,1]);
testcases.push ([0,2,1,3]);
testcases.push ([0,3,1,2]);
testcases.push ([0,3,2,1]);
testcases.push ([1,0,2,3]);
testcases.push ([1,0,3,2]);
testcases.push ([1,2,0,3]);
testcases.push ([1,2,3,0]);
testcases.push ([1,3,0,2]);
testcases.push ([1,3,2,0]);
testcases.push ([2,0,1,3]);
testcases.push ([2,0,3,1]);
testcases.push ([2,1,0,3]);
testcases.push ([2,1,3,0]);
testcases.push ([2,3,0,1]);
testcases.push ([2,3,1,0]);
testcases.push ([3,0,1,2]);
testcases.push ([3,0,2,1]);
testcases.push ([3,1,0,2]);
testcases.push ([3,1,2,0]);
testcases.push ([3,2,0,1]);
testcases.push ([3,2,1,0]);



console.log(testcases.length + " test cases will run.");


var charDef = ["name","hp","ap"];
var char = []
// these are the defaults in current version of my game
// char.push (["Sleipnir",100,10]);
// char.push (["Hel",110,20]);
// char.push (["Fenrir",150,15]);
// char.push (["Jormungandr",160,12]);

//these are the values from the example Star Wars RPG game
// char.push (["Obi-Wan Kenobi",120,8]);
// char.push (["Luke Skywalker",100,5]);
// char.push (["Darth Sidious",150,20]);
// char.push (["Darth Maul",100,25]);

// these are proposed changes
char.push (["Sleipnir",100,6]);
char.push (["Hel",80,8]);
char.push (["Fenrir",70,12]);
char.push (["Jormungandr",40,30]);


var numWins = [0,0,0,0]; // hero wins by hero index
var numLosses = [0,0,0,0]; // hero losses by hero index

detailsOn = false;

for (var i = 0; i < char.length; i++) {
	console.log(charDef[0] + ": " + char[i][0], charDef[1] + ": " + char[i][1], charDef[2] + ": "+ char[i][2]);
}


for (var i = 0; i < testcases.length; i++) {
	var thiscase = testcases[i];

	var heroBaseHP = char[thiscase[0]][1]; // hero's initial health
	var heroBaseAP = char[thiscase[0]][2]; // hero's initial attack points
	var heroAlive = true; // hero is alive until HP is 0 or less
	var heroCurrAP = heroBaseAP; // Current attack points begins at base, but increases by base
	var heroCurrHP = heroBaseHP; // Current health points begins at base, and decreases each "hit"
	// simlulate battle
	var numRounds = 0;
	for (var j = 1; j < 4; j++) { // cycle through opponents
		// get opponent data
		var currOppName = char[thiscase[j]][0];
		var currOppHP = char[thiscase[j]][1];
		var currOppAP = char[thiscase[j]][2];
		while (currOppHP > 0) {
			// hero attack
			numRounds++;
			
			if (detailsOn) { console.log("BEGIN: Hero HP " + heroCurrHP + " | Opp HP " + currOppHP); }

			currOppHP -= heroCurrAP; // reduce opponent health by hero attack points
			heroCurrAP += heroBaseAP; // increase hero attack points by base
			if (currOppHP > 0) { //only counter-attack if alive
				heroCurrHP -= currOppAP; // reduce hero health
			}			
			// heroCurrHP -= currOppAP; // reduce hero health (note commented out restriciton for opponent being still alive)

			if (detailsOn) { console.log("END: Hero HP " + heroCurrHP + " | Opp HP " + currOppHP); }

		}
		if (heroCurrHP < 1) {
			heroAlive = false;
		}
	}
	// done with test case; log results
	if (heroAlive) {
		testResult = "Hero wins";
		numWins[thiscase[0]]++;
	} else {
		testResult = "Hero loses";
		numLosses[thiscase[0]]++;
	}
	logmessage = "Test case number " + i + ": hero is " + char[thiscase[0]][0] + "; opponents are: " + char[thiscase[1]][0] + ", " + char[thiscase[2]][0] + ", " + char[thiscase[3]][0] + " - result - " + testResult + " (" + numRounds + " rounds)";
	console.log(logmessage);
}
// log overall win/loss results
for (var i = 0; i < char.length; i++) {
	console.log(char[i][0] + " W-L: " + numWins[i] + "-" + numLosses[i]);
}

