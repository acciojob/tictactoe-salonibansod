//your JS code here. If required.
let currentPlayer = 'player1';
let player1Name = '';
let player2Name = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

document.getElementById('submit').addEventListener('click', startGame);

function startGame() {
    player1Name = document.getElementById('player-1').value;
    player2Name = document.getElementById('player-2').value;
    
    if (!player1Name || !player2Name) {
        alert("Please enter names for both players!");
        return;
    }

    document.getElementById('playerInput').classList.add('hidden');
    document.getElementById('gameBoard').classList.remove('hidden');

    document.querySelector('.message').textContent = `${player1Name}, you're up!`;
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', function() {
        if (gameOver || cell.textContent !== '') return;
        if (currentPlayer === 'player1') {
            cell.textContent = 'X';
            board[cell.id - 1] = 'X';
            checkWinner();
            currentPlayer = 'player2';
            document.querySelector('.message').textContent = `${player2Name}, you're up!`;
        } else {
            cell.textContent = 'O';
            board[cell.id - 1] = 'O';
            checkWinner();
            currentPlayer = 'player1';
            document.querySelector('.message').textContent = `${player1Name}, you're up!`;
        }
    });
});

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameOver = true;
            const winner = currentPlayer === 'player1' ? player2Name : player1Name;
            document.querySelector('.message').textContent = `${winner}, congratulations you won!`;
            break;
        }
    }

    if (!board.includes('') && !gameOver) {
        document.querySelector('.message').textContent = "It's a tie!";
        gameOver = true;
    }
}
