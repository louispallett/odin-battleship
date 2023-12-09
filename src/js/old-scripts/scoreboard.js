export { detail, updateScore, announceWinner };

const detailElement = document.getElementById("detail");
const pScore = document.getElementById("pScore");
const cScore = document.getElementById("cScore");

const detail = (gameboard, index, result) => {
    detailElement.textContent = `The ${gameboard.opponent} fires at square ${index + 1} and it ${result}`;
}

const updateScore = (gameboard) => {
    if(gameboard.opponent == "player") {
        cScore.textContent = 15 - gameboard.hits.length;
    } else {
        pScore.textContent = 15 - gameboard.hits.length;
    }
}

const announceWinner = (gameboard) => {
    let winner;
    if(gameboard.opponent == "player") {
        winner = "player";
    } else {
        winner = "computer";
    }
    detailElement.textContent = `The ${winner} wins!`;
}