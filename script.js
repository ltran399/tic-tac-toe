const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const reset = document.getElementById('reset');
let currentPlayer = 'X';
gameActive = true;
function handleCellClick(event){
    const cell = event.target;
    if(cell.textContent === ''){
        cell.textContent = currentPlayer;
        cell.style.color = currentPlayer === 'X' ? 'red' : 'green';
        if(checkWin()){
            alert(`${currentPlayer} wins`);
            gameActive = false;
            return
        }

        if(checkDraw()){
            alert('It\'s a draw');
            gameActive = false;
            return
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    }
}

cells.forEach(cell => {cell.addEventListener('click', handleCellClick);});

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
function checkWin() {
    return winningCombinations.some(combination => {
        // Check if all cells in the combination are filled by the current player
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Function to check for a draw
function checkDraw() {
    // Check if all cells are filled and there's no winner
    return [...cells].every(cell => cell.textContent !== '') && !checkWin();
}

reset.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.color = '';
    });
    currentPlayer = 'X';
    gameActive = true;
});
