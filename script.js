const cells = document.querySelectorAll('.cell');
const titleHeader = document.querySelector('#titleHeader');
let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];

function choosePlayer(player) {
    currentPlayer = player;
    titleHeader.textContent = `Turno del Jugador ${player}`;
}

function markCell(index) {
    if (boardState[index] === '' && !checkWinner()) {
        boardState[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        if (checkWinner()) {
            titleHeader.textContent = `¡Jugador ${currentPlayer} Gana!`;
        } else if (boardState.every(cell => cell !== '')) {
            titleHeader.textContent = '¡Es un Empate!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            titleHeader.textContent = `Turno del Jugador ${currentPlayer}`;
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return true;
        }
    }
    return false;
}

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    titleHeader.textContent = 'Elige un Jugador';
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => markCell(index));
});
