

const gameBoardModule = (() => {

    const board = [...document.querySelectorAll(".tictactoe-box")];
    const playButton = document.getElementById("play-button");
    const playerName = document.getElementById("player-name");
    const errorInput = document.getElementById("error-input");
    toggleBoard(board, false);
    
    /* Player */
    let player;
    let enemy;
    playButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (playerName.value.length > 0) {
            player = players(playerName.value);
            enemy = players("IA");
            toggleBoard(board, true);
        } else {
            errorInput.innerHTML = "Please choose a name";
        }
    })


    /* Board */


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

    function toggleBoard(board, playing) {
        if(!playing) {
            board.forEach(element => {
                element.classList.add("inactive");
            })
        } else {
            board.forEach(element => {
                element.classList.remove("inactive");
            })
        }
    }

})();


// Players factory
const players = (name) => {
    const getName = () => name;

    return { getName };
};