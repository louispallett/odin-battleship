export { checkBoard, checkPosition };

const checkBoard = (gameboard, index, ship) => {
    let counter = 0;
    let temp = index;
    while(index < temp + ship.size) {
        if(ship.direction == "horizontal") {
            if(gameboard.board[index] === null) {
                counter++;
                index++;
            } else {
                return false;
            }

        } else if (ship.direction == "vertical") {
            if(gameboard.board[index] === null) {
                counter++;
                index += 10;
                temp += 9;
            } else {
                return false;
            }
        }
    }

    if(counter == ship.size) {
        return true;
    }
    return false;
};

const checkPosition = (ship, index) => {
    if(ship.direction == "horizontal") {
        let lastdigit = index;
        if(index > 9) lastdigit = getLastDigit(index);
        return (lastdigit + ship.size > 9)? false : true;
    } else if (ship.direction == "vertical") {
        // checkboard() function already checks this so can assume true
        return true;
    }
    return false;
};

const getLastDigit = (number) => {
    const numberAsString = number.toString();
    const lastDigit = numberAsString.charAt(numberAsString.length - 1);
    return parseInt(lastDigit, 10);
};