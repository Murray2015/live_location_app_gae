# The fog of war

This is an app that forms a real world exploration game. When you start you are surrounded by the "fog of war" - like in old Command and Conquour games, you can only see what is happening in areas of the map that you have already explored.

The aim of the game is the collect the coins before anyone else does. It's a race! Coins randomly generate within a specified radius of you at 11am every day. You can only travel on foot or by bike - travelling by car or other mode of transport will cause coins to move away from you. Plan a route and get moving to collect them first! You collect coins by walking within 100 metres of them.

The person at the top of the leaderboard each month wins cash prizes!
Every month the leaderboard goes to zero, 10 or 20 coins - zero if you won last time or had less than 30 coins. 10 if you had 30 - 60 coins. 20 if you had 60+ coins.

Get fit, explore your beautiful surroundings, and compete for prizes. But keep visiting areas, otherwise the fog of war will creep back...!

## TODO

- Sign in / register
- ~~Display map and your position~~
- ~~Display coins~~
  - ~~Get users location~~
  - ~~generate random number within 1 km of user~~
  - ~~display as point on map~~
- ~~If within 100 m of coin, total++.~~
- ~~Display your total coins collected~~
- ~~Display your speed~~
- BUG: Set view to user location on load
- BUG: Scores not consistently updating
- If within 100 m of coin, remove coin.
- Display leaderboard
- Display fog of war to obscure the map
- remove fog of war within 300m of your position
- Have fog of war slowly return
- Submit bug report
- Cache map
- Push notifications
- Display ads

## Screens

- Register / Login page
- Map
- Leaderboard
- Support

## State

- Logged in or not
- Coins
- Fog of war
- Speed
- Current position
