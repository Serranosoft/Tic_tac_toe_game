

const gameBoardModule = (() => {

    const board = [...document.querySelectorAll(".tictactoe-box")];
    console.log(board[4].textContent);
    const playButton = document.getElementById("play-button");
    const playerName = document.getElementById("player-name");
    const errorInput = document.getElementById("error-input");
    const winnerDiv = document.getElementById("winner");
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
                checkWinner();
            }
        })
    });

    function printEnemy(board) {

        let movement = Math.floor(Math.random() * (8 - 1) +1);
        while(board[movement].textContent == "X" || board[movement].textContent == "O") {
            if(boardPlays.length >= 8) {
                break;
            }
            movement = Math.floor(Math.random() * (8 - 1) +1);
            
        }
        console.log(movement);
        console.log(board[movement]);
        boardPlays.push(board[movement]);
        board[movement].innerHTML = "O";
    }

    function toggleBoard(board, playing) {
        if (!playing) {
            board.forEach(element => {
                element.classList.add("inactive");
            })
        } else {
            board.forEach(element => {
                element.classList.remove("inactive");
                element.innerHTML = "";
            })
        }
    }


    const horizontal = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
    ];

    const vertical = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    const tie = [
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winCheck = [horizontal, vertical, tie];
    let win_X = 0;
    let win_O = 0;

    function checkWinner() {

        winCheck.forEach(cell => {
            cell.forEach(combo => {

                combo.forEach(secuence => {
                    if (board[secuence].textContent == "X") {
                        win_X++;
                        if (win_X == 3) {
                            displayWinner(player.getName());
                        }
                    } else if (board[secuence].textContent == "O") {
                        win_O++;
                        if (win_O == 3) {
                            displayWinner("IA");
                        }
                    }
                })
                win_X = 0;
                win_O = 0;
            })
        })
    }

    function displayWinner(winner) {
        winnerDiv.innerHTML = winner +" wins";
        playButton.value = "Play again!";
        board.forEach(box => {
            box.classList.add("inactive");
        })
        
    }
})();


// Players factory
const players = (name) => {
    const getName = () => name;

    return { getName };
};