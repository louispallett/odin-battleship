export { checkBoard };

const checkBoard = (gameboard, index, size, direction) => {
    let counter = 0;
    let temp = index;
    while(index < temp + size) {
        if(direction == "horizontal") {
            if(gameboard.board[index] === null) {
                counter++;
                index++;
            } else {
                return false;
            }

        } else if (direction == "vertical") {
            if(gameboard.board[index] === null) {
                counter++;
                index += 10;
                temp += 9;
            } else {
                return false;
            }
        }
    }

    if(counter == size) {
        return true;
    }
    return false;
};