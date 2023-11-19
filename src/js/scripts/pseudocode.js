/*
=======================================
Determining a winner
=======================================

How do we determine who has LOST? 
>> If someone has no ships remaining.

So, we need to keep track of the ships:

    >> When we place a ship, we will need to determine who's ship it is (i.e. the player). This means calling a 
       parameter of the class Player/Computer
    >> Inside of placeShip, we call Player.addShip. This adds the ship to the ships[] array.
    

*/