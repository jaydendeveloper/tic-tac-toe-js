const modeSelectionScreen = document.getElementById("modeSelectionScreen");
const gameMapNode = document.getElementById("gameMap");
const pvpBtn = document.getElementById("pvp");
const pvbBtn = document.getElementById("pvb");
const resultHeader = document.getElementById("resultHeader");
const resultDiv = document.getElementById("result");
const resetBtn = document.getElementById("resetBtn");
let gameEnded = false;
let gameMode = "pvp";

const gameData = Array.from(document.getElementById("gameMap").children);
let currentPlayer = "X";

function startGame(){
    if(!gameEnded){
        console.log(gameData)
        gameData.forEach((cell) => {
            cell.addEventListener("click", (e) => {
                e.preventDefault();
                if(gameMode == "pvp"){
                    handleCellClick(cell)
                }

                if(gameMode == "pvb" && currentPlayer == "X"){
                    handleCellClick(cell)
                }

                if(gameMode == "pvb" && currentPlayer == "O" && !gameEnded){
                    setTimeout(()=> {
                        let rand = Math.floor(Math.random() * gameData.length);
                        console.log(rand)
                        let chosenCell = gameData[rand];
                        console.log(gameData[rand])

                        while(chosenCell.innerHTML != "" && !gameEnded){
                            rand =  Math.floor(Math.random() * gameData.length);
                            chosenCell = gameData[rand];
                        }

                        chosenCell.innerHTML = "O";
                        currentPlayer = "X";

                        winChecker();
                    }, 1000)
                }
        })
    })
    }
}

function handleCellClick(cell){
    if(!gameEnded && currentPlayer == "X"){
        if(cell.innerHTML === ""){
            cell.innerHTML = currentPlayer;
            currentPlayer = "O";
        }
        setTimeout(()=> {
            winChecker();
        }, 100)
    }

    if(!gameEnded && currentPlayer == "O"){
        if(cell.innerHTML === ""){
            cell.innerHTML = currentPlayer;
            currentPlayer = "X";
        }
        setTimeout(()=> {
            winChecker();
        }, 100)
    }
}
function showGame(type){

    gameMapNode.style.display = "grid";
    modeSelectionScreen.style.display = "none";

    gameMode = type;
    startGame();
}

function winChecker(){
    const mapState = gameData.map((cell) => cell.innerHTML);

    const allCellPlayed = gameData.filter(cell => (cell.innerHTML == "X") || (cell.innerHTML == "O"));
    console.log(allCellPlayed)
    if(allCellPlayed.length == 9){
        gameWon("draw")
    }

    if(mapState[0] == "X" && mapState[1] == "X" && mapState[2]  == "X"){
        gameWon("X");
    }
    if(mapState[3] == "X" && mapState[4] == "X" && mapState[5]  == "X"){
        gameWon("X");
    }
    if(mapState[6] == "X" && mapState[7] == "X" && mapState[8]  == "X"){
        gameWon("X");
    }
    if(mapState[0] == "X" && mapState[3] == "X" && mapState[6]  == "X"){
        gameWon("X");
    }
    if(mapState[1] == "X" && mapState[4] == "X" && mapState[7]  == "X"){
        gameWon("X");
    }
    if(mapState[2] == "X" && mapState[5] == "X" && mapState[8]  == "X"){
        gameWon("X");
    }
    if(mapState[0] == "X" && mapState[4] == "X" && mapState[8]  == "X"){
        gameWon("X");
    }
    if(mapState[2] == "X" && mapState[4] == "X" && mapState[6]  == "X"){
        gameWon("X");
    }
    if(mapState[0] == "O" && mapState[1] == "O" && mapState[2]  == "O"){
        gameWon("O");
    }
    if(mapState[3] == "O" && mapState[4] == "O" && mapState[5]  == "O"){
        gameWon("O");
    }
    if(mapState[6] == "O" && mapState[7] == "O" && mapState[8]  == "O"){
        gameWon("O");
    }
    if(mapState[0] == "O" && mapState[3] == "O" && mapState[6]  == "O"){
        gameWon("O");
    }
    if(mapState[1] == "O" && mapState[4] == "O" && mapState[7]  == "O"){
        gameWon("O");
    }
    if(mapState[2] == "O" && mapState[5] == "O" && mapState[8]  == "O"){
        gameWon("O");
    }
    if(mapState[0] == "O" && mapState[4] == "O" && mapState[8]  == "O"){
        gameWon("O");
    }
    if(mapState[2] == "O" && mapState[4] == "O" && mapState[6]  == "O"){
        gameWon("O");
    }
}

function gameWon(player){
    gameEnded = true;
    if(player != "draw"){
        resultHeader.innerHTML = `${player} has won the game!`;
        resultDiv.style.display = "block";
    } else {
        resultHeader.innerHTML = `Draw!`;
        resultDiv.style.display = "block";
    }
}

function resetGame(){
    window.location.reload();
}

pvpBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    showGame("pvp");
})

pvbBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    showGame("pvb");
})

resetBtn.addEventListener("click",resetGame)