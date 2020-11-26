

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

    return {board, playButton}

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

        let movement = Math.floor(Math.random() * (8 - 1) + 1);
        while (board[movement].textContent == "X" || board[movement].textContent == "O") {
            if (boardPlays.length >= 8) {
                break;
            }
            movement = Math.floor(Math.random() * (8 - 1) + 1);

        }
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

    function checkWinner(board) {
        winCheck.forEach(cell => {
            cell.forEach(combo => {

                combo.forEach(secuence => {
                    if (board[secuence].textContent === "X") {
                        
                        win_X++;
                        if (win_X == 3) {
                            displayWinner(player.getName(), board);
                        }
                    }
                    if (board[secuence].textContent === "O") {
                       
                        win_O++;
                    
                        if (win_O == 3) {
                            displayWinner("IA", board);
                        }
                    }
                    
                })
                win_X = 0;
                win_O = 0;
                
            })
        })
    }

    function displayWinner(winner, board) {
        winnerDiv.innerHTML = winner + " wins";
        boardModule.playButton.value = "Play again!";
        boardPlays = [];
        win_X = 0;
        win_O = 0;
        board.forEach(box => {
            box.classList.add("inactive");
        })
    }

    playerPlay(boardModule.board);

    return {winnerDiv}

})();

// Players factory
const players = (name) => {
    const getName = () => name;

    return { getName };
};