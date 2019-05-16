# Ragnarok Death Match (unit-4-game)
Based on Star Wars RPG

### About the Game
Ragnarok Death Match is a battle simulation based on the Star Wars RPG.  In this game, the user selects a "hero" from the available characters and battles the remaining characters - enemies - one at a time.  The game continues until either the hero defeats all of the enemies or the hero is defeated by one of it's opponents.

The characters in this version of the game are taken from Norse Mythology and the end of the world(s) - Rgnarok - that is a key component to the mythology.  Each of the characters is a child of Loki, the "tickster god:"  
* Sleipnir, the eight-legged horse ridden by the "All Father," Odin.
* Hel, the daughter of Loki and ruler of the netherworlds.
* Fenrir, the giant wolf that, accoridng to a prophecy, will kill Odin during Ragnarok.
* Jormungandr, a giant snake that encircles the mortal world of Midgard.  It is said that Ragnarok will begin when the so-called "world snake" releases its tail.

### Instructions
The player selects any available character to play as the "hero."  Unselected characters become "enemies."  Each character has different "health points" and "attack points" that drive the player's strategy in selecting a hero and - more importantly - the order of opponents.

The hero selects an opponent to battle from the available enemies.  Using the "Attack!" button, the hero reduces the health points of the opponent.  The opponent then reduces the hero's health points of the hero through a counter-attack.

After each successful "hit" on an opponent, the hero's attack points increases.  Opponents do not receive any bonus for counter-attacks.

A character is "defeated" when its health points are reduced to 0 or less.  The game is complete when either the hero is defeated or the hero defeats all of the enemies.

### Technical Notes
The gameplay is written in JavaScript and the JQuery library.  Bootstrrap is also used to generate UI controls and layout.  The movement of character icons from one zone to another is handled using `remove` and `append` methods in JQuery.

### Credits
* Background image retrieved from https://bavipower.com/blogs/bavipower-viking-blog/10-things-about-ragnarok-that-you-dont-know
* Sleipnir character image is free for personal use, acquired from https://www.kisspng.com/png-odin-horse-viking-age-sleipnir-viking-art-valknut-4317542/
* Jormungandr character image is free for personal use, acquired from https://www.pngfly.com/png-tsn4ux/
* Hel character image acquired from https://skull-heads.tumblr.com/post/168485379841/skull-girl-vi (no copyright information available)
* Fenrir character image is free for personal use, acquired from https://www.kisspng.com/png-gods-eater-burst-god-eater-2-logo-ace-combat-infin-1142476/
