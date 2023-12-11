/*
========================================
Pseudologic
========================================

>>>TODO<<<

>Game DOM feedback<

    1. Update #detail to write out result each time either player makes a play:
       Such as:

        `The ${player} fires at square ${index} and it ${result}` 
            such as "The computer fires at square 55 and it hits"
        if a ship is sunk:
            `The ${player} fires at square ${index} and sinks a ship!`

    2. Updated scores to show how many squares left (can link to TOTAL - gameboard.hits.length)

    3. When gameOver is called, display winner in detail.

>Fix post-gameOver<

    1. We need to ensure the user can no longer click on the board once gameOver is finished. (See tic tac toe)

    2. Fix detail/game where computer carries on playing after game

>Implement drag and drop<

    1. First, we need to make the 'play function' create the boards but then allow the user to place ships.

    2. Then create a DONE button. Once the user clicks this, we will have to recreate the COMPUTER board and but adding the logic to allow the user to click and play the game.

>Clean-up<

    Finally, clean up and optimize the code.

*/