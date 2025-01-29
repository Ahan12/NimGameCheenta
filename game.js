let remainingSticks = 13;
let maxSticks = 3; // Maximum sticks that can be taken per turn
let canTake = maxSticks; // Tracks how many sticks the player can still take in the current turn
let playerTurn = true; // Indicates whose turn it is
let playerHasTaken = false; // Flag to check if the player has taken at least one stick

const elements = {
    remaining: document.getElementById("remaining"),
    canTake: document.getElementById("can-take"),
    sticksContainer: document.getElementById("sticks-container"),
    computerBtn: document.getElementById("let-computer-play"),
    winnerModal: document.getElementById("winner-modal"),
    winnerText: document.getElementById("winner-text"),
    playAgainBtn: document.getElementById("play-again")
};

function updateUI() {
    elements.remaining.textContent = remainingSticks;
    elements.canTake.textContent = canTake;
    renderSticks();
    
    // Enable computer button as soon as player has taken at least one stick
    elements.computerBtn.disabled = !playerHasTaken || remainingSticks === 0;
}

function renderSticks() {
    elements.sticksContainer.innerHTML = '';
    for (let i = 0; i < remainingSticks; i++) {
        const stick = document.createElement('div');
        stick.className = 'stick';
        // Only add click listener if it's player's turn and they haven't reached max sticks
        if (canTake > 0) {
            stick.addEventListener('click', handlePlayerClick);
            stick.classList.add('clickable');
        }
        elements.sticksContainer.appendChild(stick);
    }
}

function handlePlayerClick(event) {
    if (!event.target.classList.contains('removed')) {
        event.target.classList.add('removed');
        remainingSticks--;
        canTake--;
        playerHasTaken = true; // Set this flag on the first stick taken
        
        updateUI();
        checkGameEnd();
    }
}

function computerTurn() {
    const remove = calculateComputerMove();
    for (let i = 0; i < remove; i++) {
        remainingSticks--;
    }
    canTake = maxSticks; // Reset canTake for player's next turn
    playerHasTaken = false; // Reset the player's taken flag
    
    updateUI();
    checkGameEnd();
}

function calculateComputerMove() {
    // Calculate optimal number of sticks for the computer to take
    const target = remainingSticks % (maxSticks + 1);
    return target === 0 ? Math.min(maxSticks, remainingSticks) : target;
}

function checkGameEnd() {
    if (remainingSticks === 0) {
        showWinner(canTake === maxSticks ? "Computer" : "Player");
    }
}

function showWinner(winner) {
    elements.winnerText.textContent = `${winner} Wins! 🎉`;
    elements.winnerModal.classList.remove('hidden');
}

function resetGame() {
    remainingSticks = 13;
    canTake = maxSticks;
    playerHasTaken = false;
    elements.winnerModal.classList.add('hidden');
    updateUI();
}

// Event Listeners
elements.computerBtn.addEventListener('click', () => {
    if (playerHasTaken && remainingSticks > 0) {
        computerTurn();
    }
});

elements.playAgainBtn.addEventListener('click', resetGame);

// Initialize game
updateUI();