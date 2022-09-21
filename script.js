const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""]; // placeholders
let currentPlayer = "X";
let running = false;
alert('Welcome to Derricks Tic Tac Toe game!!')
alert('Hope you Enjoy!')
initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn!!`
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}
function updateCell(cell, index){
    options[index] = currentPlayer; // updating the placeholders
    cell.textContent = currentPlayer;// changing the text content of the clicked cell

}
function changePlayer(){
    currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
    statusText.textContent = `${currentPlayer}'s Turn`;
}
function checkWinner(){
    let roundWon = false; // if someone we flip this to true

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];//storing the win arrays within a temporary variable
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue; // if there is an empty cell contiue and skip the iteration
        }
        // if there are no empty spaces it means all the spaces are full
        // lets make sure the characters are the same
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!!`
        running = false; // game is over
    }
    // if there is no spaces left its a draw
    else if(!options.includes("")){
        statusText.textContent = `Draw!!`
        running = false;
    }
    else{
        changePlayer();
    }
 
}
function restartGame(){
    currentPlayer = "X"
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}