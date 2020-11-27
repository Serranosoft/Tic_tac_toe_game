

const boardModule = (() => {

    const board = [...document.querySelectorAll(".tictactoe-box")];
    const playButton = document.getElementById("play-button");
    const playerName = document.getElementById("player-name");
    const errorInput = document.getElementById("error-input");

    toggleBoard(board, false);
    startGame();


    function startGame() {

        playButton.addEventListener("click", (e) => {
            e.preventDefault();
            if (playerName.value.length > 0) {
                player = players(playerName.value);
                enemy = players("IA");
                toggleBoard(board, true);
                controllerModule.winnerDiv.innerHTML = "";
                clearBoard();
            } else {
                errorInput.innerHTML = "Please choose a name";
            }
        })

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

    function clearBoard() {
        board.forEach(element => {
            element.setAttribute("style", "background-color: lightgray")
        })
    }

    return { board, playButton }

})();

const controllerModule = (() => {

    const winnerDiv = document.getElementById("winner");

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

    const diagonal = [
        [0, 4, 8],
        [2, 4, 6]
    ];

    let winCheck = [horizontal, vertical, diagonal];
    let win_X = 0;
    let win_O = 0;

    let boardPlays = [];

    function playerPlay(board) {
        board.forEach(element => {
            element.addEventListener("click", () => {
                if (element.innerHTML === "") {
                    boardPlays.push(element);
                    element.innerHTML = "X";
                    enemyPlay(board);
                     setTimeout(() => {
                        checkWinner(board);
                    }, 350) 
                }
            })
        });
    }

    function enemyPlay(board) {

        let movement = Math.floor(Math.random() * (9 - 1) + 1);
        while (board[movement].textContent == "X" || board[movement].textContent == "O") {
            if (boardPlays.length >= 8) {
                break;
            }
            movement = Math.floor(Math.random() * (9 - 1) + 1);

        }
        if (boardPlays.length < 9) {
            boardPlays.push(board[movement]);
            setTimeout(() => {
                board.forEach(element => {
                    element.setAttribute("style", "pointer-events: none");
                })
                setTimeout(() => {
                    board[movement].innerHTML = "O";
                    board.forEach(element => {
                        element.removeAttribute("style", "pointer-events: all");
                    })

                }, 300)
            }, 1)
        }


    }

    function checkWinner(board) {
        winCheck.forEach(cell => {
            cell.forEach(combo => {

                combo.forEach(secuence => {


                    if (board[secuence].textContent === "X") {

                        win_X++;
                        if (win_X == 3) {
                            console.log(combo);
                            displayWinner(player.getName(), board, combo);
                        }

                    } else if (board[secuence].textContent === "O") {

                        win_O++;

                        if (win_O == 3) {
                            displayWinner("IA", board, combo);
                        }
                    }
                    
                    if (isFull(board)) {
                        console.log(win_X);
                        console.log(win_O);
                        displayWinner("Tie", board, null);
                    }


                })
                win_X = 0;
                win_O = 0;

            })

        })
    }

    function displayWinner(winner, board, comboWinner) {
        if (winner === "Tie") {
            winnerDiv.innerHTML = "Tie!"
        } else {
            winnerDiv.innerHTML = winner + " wins";
            comboWinner.forEach(secuence => {
                board[secuence].setAttribute("style", "background-color: #eca400;")
            })
        }

        boardModule.playButton.value = "Play again!";
        boardPlays = [];
        win_X = 0;
        win_O = 0;
        board.forEach(box => {
            box.classList.add("inactive");
        })

    }

    function isFull(board) {

        //let boardFull = board.filter(element => element.textContent != "");
        
        if (boardPlays.length >= 9) {
            return true;
        }
        return false;
    }

    playerPlay(boardModule.board);

    return { winnerDiv }

})();

// Players factory
const players = (name) => {
    const getName = () => name;

    return { getName };
};