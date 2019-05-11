# Star Wars RPG Pseudocode

## Gameplay Summary
1. Start 4 characters to select from, each with HP, Attack Power, and Counter-Attack Power
1. Select one of the characters; that character becomes the "hero" while the remaining are "enemies"
1. Select one of the "enemies" to battle
1. During the battle, each round the hero attacks, causing the enemy HP to reduce by Attack Power; the hero HP is reduced by Counter-Attack Power
    1.1 each round, the hero Attack Power increases by the original Attack Power while the enemy Counter-Attack Power remains unchanged
1. The hero is defeated (and the game ends) if its HP falls to 0 or less; the enemy is defeated if its HP falls to 0 or less
    1.1 If the enemy is defeated, the hero must select a new enemy from those remaining.  If none remain, the hero has won.

