

const gameBoardModule = (() => {

    /* Player */
    let playButton = document.getElementById("play-button");
    let playerName = document.getElementById("player-name");
    let errorInput = document.getElementById("error-input");
    let player;
    let enemy;
    playButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (playerName.value.length > 0) {
            player = players(playerName.value);
            enemy = players("IA");
            console.log("player name: " + player.getName());
            console.log("enemy name: " + enemy.getName());
        } else {
            errorInput.innerHTML = "Please choose a name";
        }
    })


    /* Board */

    let board = [...document.querySelectorAll(".tictactoe-box")];
    let boardPlays = [];
    board.forEach(element => {
        element.addEventListener("click", () => {
            if (element.innerHTML === "") {
                boardPlays.push(element);
                element.innerHTML = "X";
                printEnemy(board);
            }
        })
    });

    function printEnemy(board) {

        for (let index = 0; index < board.length; index++) {
            if(board[index].textContent != "X" && board[index].textContent != "O") {
                boardPlays.push(board[index]);
                board[index].innerHTML = "O";  
                break;
            }
        }
    }

})();


// Players factory
const players = (name) => {
    const getName = () => name;

    return { getName };
};