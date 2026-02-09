/**
 * Reversi Game Engine - WebAssembly Interface
 */

class ReversiGame {
    constructor() {
        this.engine = null;
        this.aiPlayer = null;
        this.currentDifficulty = 'medium';
        this.isGameActive = false;
        this.moveCount = 0;
        this.gameStartTime = null;
        this.gameTimer = null;
        this.validMoves = [];
    }

    async initialize() {
        try {
            // Create game engine
            this.engine = new ReversiEngine();
            this.engine.createGameState(8, 8);
            this.engine.newGame();
            
            // Initialize AI player
            this.aiPlayer = new AIPlayer(1, 1); // Black player, medium difficulty
            
            // Start game
            this.isGameActive = true;
            this.moveCount = 0;
            this.gameStartTime = Date.now();
            this.startGameTimer();
            
            // Load initial valid moves
            this.updateValidMoves();
            
            console.log('Game initialized successfully');
        } catch (error) {
            console.error('Failed to initialize game:', error);
            this.showError('Failed to initialize game. Please refresh the page.');
        }
    }

    startGameTimer() {
        this.gameTimer = setInterval(() => {
            const elapsed = Date.now() - this.gameStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            document.getElementById('game-time').textContent = timeString;
        }, 1000);
    }

    stopGameTimer() {
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }
    }

    updateValidMoves() {
        try {
            this.validMoves = this.engine.getValidMoves();
            document.getElementById('valid-moves').textContent = this.validMoves.length;
            return this.validMoves;
        } catch (error) {
            console.error('Error updating valid moves:', error);
            return [];
        }
    }

    async makeMove(x, y) {
        try {
            if (!this.isGameActive) {
                return false;
            }
            
            // Check if move is valid
            const isValid = this.validMoves.some(move => move.x === x && move.y === y);
            if (!isValid) {
                console.warn('Invalid move:', x, y);
                return false;
            }
            
            // Make the move
            const result = this.engine.makeMove(x, y);
            if (!result) {
                return false;
            }
            
            // Update game state
            this.moveCount++;
            document.getElementById('move-count').textContent = this.moveCount;
            
            // Update scores
            const whiteCount = this.engine.getWhiteCount();
            const blackCount = this.engine.getBlackCount();
            document.getElementById('white-score').textContent = whiteCount;
            document.getElementById('black-score').textContent = blackCount;
            
            // Check if game has finished
            if (this.engine.isGameFinished()) {
                this.isGameActive = false;
                this.stopGameTimer();
                this.showGameOver();
            } else {
                // Update valid moves for next player
                this.updateValidMoves();
                
                // If AI's turn, make AI move
                if (this.engine.getCurrentPlayer() === 1) {
                    await this.makeAIMove();
                }
            }
            
            // Refresh board
            this.refreshBoard();
            return true;
        } catch (error) {
            console.error('Error making move:', error);
            this.showError('Error making move');
            return false;
        }
    }

    async makeAIMove() {
        try {
            // Show thinking indicator
            const statusText = document.getElementById('status-text');
            statusText.textContent = 'AI is thinking...';
            
            // Get AI move (timeout after 5 seconds)
            const movePromise = new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('AI move timeout'));
                }, 5000);
                
                // Get best AI move
                const aiMove = this.aiPlayer.getBestMove(this.engine);
                clearTimeout(timeout);
                resolve(aiMove);
            });
            
            const aiMove = await movePromise;
            
            if (!aiMove) {
                statusText.textContent = 'AI has no valid moves';
                return;
            }
            
            // Make AI move
            const result = this.engine.makeMove(aiMove.x, aiMove.y);
            if (!result) {
                statusText.textContent = 'AI has no valid moves';
                return;
            }
            
            // Update game state
            this.moveCount++;
            document.getElementById('move-count').textContent = this.moveCount;
            
            // Update scores
            const whiteCount = this.engine.getWhiteCount();
            const blackCount = this.engine.getBlackCount();
            document.getElementById('white-score').textContent = whiteCount;
            document.getElementById('black-score').textContent = blackCount;
            
            // Check if game has finished
            if (this.engine.isGameFinished()) {
                this.isGameActive = false;
                this.stopGameTimer();
                this.showGameOver();
            } else {
                // Update valid moves for next player
                this.updateValidMoves();
                statusText.textContent = 'Your turn';
            }
            
            // Refresh board
            this.refreshBoard();
        } catch (error) {
            console.error('Error making AI move:', error);
            document.getElementById('status-text').textContent = 'Error making AI move';
        }
    }

    undo() {
        try {
            if (!this.isGameActive || this.moveCount === 0) {
                return false;
            }
            
            const result = this.engine.undoMove();
            if (result) {
                this.moveCount--;
                document.getElementById('move-count').textContent = this.moveCount;
                
                // Update scores
                const whiteCount = this.engine.getWhiteCount();
                const blackCount = this.engine.getBlackCount();
                document.getElementById('white-score').textContent = whiteCount;
                document.getElementById('black-score').textContent = blackCount;
                
                // Update valid moves
                this.updateValidMoves();
                
                // Refresh board
                this.refreshBoard();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error undoing move:', error);
            return false;
        }
    }

    redo() {
        try {
            if (!this.isGameActive) {
                return false;
            }
            
            const result = this.engine.redoMove();
            if (result) {
                this.moveCount++;
                document.getElementById('move-count').textContent = this.moveCount;
                
                // Update scores
                const whiteCount = this.engine.getWhiteCount();
                const blackCount = this.engine.getBlackCount();
                document.getElementById('white-score').textContent = whiteCount;
                document.getElementById('black-score').textContent = blackCount;
                
                // Check if game has finished
                if (this.engine.isGameFinished()) {
                    this.isGameActive = false;
                    this.stopGameTimer();
                    this.showGameOver();
                } else {
                    // Update valid moves
                    this.updateValidMoves();
                }
                
                // Refresh board
                this.refreshBoard();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error redoing move:', error);
            return false;
        }
    }

    skip() {
        try {
            if (!this.isGameActive || this.validMoves.length > 0) {
                return false;
            }
            
            const result = this.engine.skipTurn();
            if (result) {
                // Update valid moves
                this.updateValidMoves();
                
                // If AI's turn, make AI move
                if (this.engine.getCurrentPlayer() === 1) {
                    this.makeAIMove();
                }
                
                // Refresh board
                this.refreshBoard();
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error skipping turn:', error);
            return false;
        }
    }

    newGame(difficulty = this.currentDifficulty) {
        try {
            // Stop timer
            this.stopGameTimer();
            
            // Reset game state
            this.engine.newGame();
            
            // Update difficulty
            this.currentDifficulty = difficulty;
            const difficultyLevels = {
                'easy': 0,
                'medium': 1,
                'hard': 2,
                'expert': 3
            };
            const level = difficultyLevels[difficulty];
            this.aiPlayer = new AIPlayer(1, level);
            
            // Reset counters
            this.isGameActive = true;
            this.moveCount = 0;
            this.gameStartTime = Date.now();
            document.getElementById('move-count').textContent = '0';
            
            // Update scores
            const whiteCount = this.engine.getWhiteCount();
            const blackCount = this.engine.getBlackCount();
            document.getElementById('white-score').textContent = whiteCount;
            document.getElementById('black-score').textContent = blackCount;
            
            // Start timer
            this.startGameTimer();
            
            // Update valid moves
            this.updateValidMoves();
            
            // Refresh board
            this.refreshBoard();
            
            console.log('New game started with difficulty:', difficulty);
            return true;
        } catch (error) {
            console.error('Error starting new game:', error);
            this.showError('Error starting new game');
            return false;
        }
    }

    refreshBoard() {
        try {
            const canvas = document.getElementById('game-board');
            const ctx = canvas.getContext('2d');
            const boardSize = 600;
            const cellSize = boardSize / 8;
            
            // Clear canvas
            ctx.clearRect(0, 0, boardSize, boardSize);
            
            // Draw board
            ctx.fillStyle = '#2E7D32';
            ctx.fillRect(0, 0, boardSize, boardSize);
            
            // Draw grid lines
            ctx.strokeStyle = '#1B5E20';
            ctx.lineWidth = 2;
            for (let i = 0; i <= 8; i++) {
                ctx.beginPath();
                ctx.moveTo(i * cellSize, 0);
                ctx.lineTo(i * cellSize, boardSize);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(0, i * cellSize);
                ctx.lineTo(boardSize, i * cellSize);
                ctx.stroke();
            }
            
            // Draw pieces
            for (let x = 0; x < 8; x++) {
                for (let y = 0; y < 8; y++) {
                    const piece = this.engine.getBoardCell(x, y);
                    if (piece !== 0) {
                        const centerX = x * cellSize + cellSize / 2;
                        const centerY = y * cellSize + cellSize / 2;
                        const radius = cellSize / 2 - 4;
                        
                        // Draw piece
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                        ctx.fillStyle = piece === 1 ? '#000000' : '#FFFFFF';
                        ctx.fill();
                        
                        // Draw piece border
                        ctx.strokeStyle = piece === 1 ? '#333333' : '#DDDDDD';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                        
                        // Draw highlight for current player's pieces
                        if ((piece === 1 && this.engine.getCurrentPlayer() === 1) ||
                            (piece === 2 && this.engine.getCurrentPlayer() === 2)) {
                            ctx.beginPath();
                            ctx.arc(centerX, centerY, radius + 2, 0, 2 * Math.PI);
                            ctx.strokeStyle = '#4A90E2';
                            ctx.lineWidth = 3;
                            ctx.stroke();
                        }
                    }
                }
            }
            
            // Draw valid moves
            this.validMoves.forEach(move => {
                const centerX = move.x * cellSize + cellSize / 2;
                const centerY = move.y * cellSize + cellSize / 2;
                const radius = cellSize / 4;
                
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                ctx.fillStyle = 'rgba(74, 144, 226, 0.4)';
                ctx.fill();
                
                // Draw indicator
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius - 4, 0, 2 * Math.PI);
                ctx.fillStyle = '#4A90E2';
                ctx.fill();
            });
            
            // Update current player indicator
            const currentPlayer = this.engine.getCurrentPlayer();
            const whitePlayer = document.querySelector('.white-player');
            const blackPlayer = document.querySelector('.black-player');
            
            whitePlayer.classList.toggle('active', currentPlayer === 2);
            blackPlayer.classList.toggle('active', currentPlayer === 1);
            
            // Update status text
            const statusText = document.getElementById('status-text');
            if (this.isGameActive) {
                statusText.textContent = currentPlayer === 2 ? 'Your turn' : 'AI is thinking...';
            }
        } catch (error) {
            console.error('Error refreshing board:', error);
        }
    }

    showGameOver() {
        try {
            const whiteCount = this.engine.getWhiteCount();
            const blackCount = this.engine.getBlackCount();
            
            document.getElementById('final-white-score').textContent = whiteCount;
            document.getElementById('final-black-score').textContent = blackCount;
            
            const resultDiv = document.getElementById('game-result');
            if (whiteCount > blackCount) {
                resultDiv.textContent = 'You win!';
                resultDiv.style.color = '#51CF66';
            } else if (blackCount > whiteCount) {
                resultDiv.textContent = 'AI wins!';
                resultDiv.style.color = '#FF5252';
            } else {
                resultDiv.textContent = 'Draw!';
                resultDiv.style.color = '#FFC107';
            }
            
            // Show modal
            document.getElementById('game-over-modal').classList.add('show');
        } catch (error) {
            console.error('Error showing game over:', error);
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #FF5252;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(255, 82, 82, 0.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Remove after 3 seconds
        setTimeout(() => {
            errorDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(errorDiv);
            }, 300);
        }, 3000);
    }
}

// Global instance
const reversiGame = new ReversiGame();
