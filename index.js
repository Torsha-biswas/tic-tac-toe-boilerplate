// Initialize the game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Function to check for a winner
function checkWinner() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }

  return null;
}

// Function to check if the board is full (tie)
function isBoardFull() {
  return !gameBoard.includes('');
}

// Function to handle a player's move
function handleMove(index) {
  if (!gameBoard[index] && gameActive) {
    gameBoard[index] = currentPlayer;

    // Update the UI
    updateUI();

    // Check for a winner
    const winner = checkWinner();
    if (winner) {
      endGame(`Player ${winner} wins!`);
    } else if (isBoardFull()) {
      endGame('It\'s a tie!');
    } else {
      // Switch to the next player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Function to update the UI based on the game state
function updateUI() {
  for (let i = 0; i < gameBoard.length; i++) {
    const box = document.getElementById(String(i + 1));
    box.textContent = gameBoard[i];
  }
}

// Function to end the game
function endGame(message) {
  gameActive = false;
  document.getElementById('message').textContent = message;
  document.getElementById('result').style.visibility = 'visible';
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.getElementById('result').style.visibility = 'hidden';
  updateUI();
}

// Event listener for box clicks
document.querySelectorAll('.box').forEach((box, index) => {
  box.addEventListener('click', () => handleMove(index));
});

// Event listener for the "Play again" button
document.getElementById('button').addEventListener('click', resetGame);
