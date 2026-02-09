/**
 * Reversi Game Engine - Pure JavaScript Implementation
 * This replaces the WebAssembly dependency for immediate functionality
 */

class ReversiEngine {
    constructor() {
        this.board = [];
        this.currentPlayer = 1; // 1 = Black, 2 = White
        this.history = [];
        this.redoStack = [];
        this.gameOver = false;
        this.boardSize = 8;
    }

    createGameState(rows, cols) {
        this.boardSize = rows;
        this.initializeBoard();
        return this;
    }

    initializeBoard() {
        // Create empty board
        this.board = [];
        for (let i = 0; i < this.boardSize; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.boardSize; j++) {
                this.board[i][j] = 0;
            }
        }

        // Place initial pieces
        const mid = this.boardSize / 2;
        this.board[mid - 1][mid - 1] = 2; // White
        this.board[mid - 1][mid] = 1;     // Black
        this.board[mid][mid - 1] = 1;     // Black
        this.board[mid][mid] = 2;         // White

        this.currentPlayer = 1; // Black starts
        this.history = [];
        this.redoStack = [];
        this.gameOver = false;
    }

    newGame() {
        this.initializeBoard();
        return true;
    }

    getBoardCell(row, col) {
        if (row < 0 || row >= this.boardSize || col < 0 || col >= this.boardSize) {
            return 0;
        }
        return this.board[row][col];
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    isValidMove(row, col, player) {
        if (this.board[row][col] !== 0) {
            return false;
        }

        const opponent = player === 1 ? 2 : 1;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            let foundOpponent = false;

            while (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize) {
                if (this.board[r][c] === opponent) {
                    foundOpponent = true;
                    r += dr;
                    c += dc;
                } else if (this.board[r][c] === player && foundOpponent) {
                    return true;
                } else {
                    break;
                }
            }
        }

        return false;
    }

    getValidMoves() {
        const moves = [];
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.isValidMove(row, col, this.currentPlayer)) {
                    moves.push({ x: row, y: col });
                }
            }
        }
        return moves;
    }

    getMoveCount(moves) {
        return moves.length;
    }

    makeMove(row, col) {
        if (!this.isValidMove(row, col, this.currentPlayer) || this.gameOver) {
            return false;
        }

        // Save state for undo
        this.saveState();

        const opponent = this.currentPlayer === 1 ? 2 : 1;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        // Place piece and flip opponent's pieces
        this.board[row][col] = this.currentPlayer;

        for (const [dr, dc] of directions) {
            let r = row + dr;
            let c = col + dc;
            let piecesToFlip = [];

            while (r >= 0 && r < this.boardSize && c >= 0 && c < this.boardSize) {
                if (this.board[r][c] === opponent) {
                    piecesToFlip.push({ r, c });
                    r += dr;
                    c += dc;
                } else if (this.board[r][c] === this.currentPlayer) {
                    // Flip all opponent pieces
                    for (const piece of piecesToFlip) {
                        this.board[piece.r][piece.c] = this.currentPlayer;
                    }
                    break;
                } else {
                    break;
                }
            }
        }

        // Switch player
        this.currentPlayer = opponent;
        this.redoStack = []; // Clear redo stack

        // Check if current player has valid moves
        const validMoves = this.getValidMoves();
        if (validMoves.length === 0) {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            const opponentMoves = this.getValidMoves();
            if (opponentMoves.length === 0) {
                this.gameOver = true;
            }
        }

        return true;
    }

    saveState() {
        const state = {
            board: this.board.map(row => [...row]),
            currentPlayer: this.currentPlayer,
            gameOver: this.gameOver
        };
        this.history.push(state);
    }

    undoMove() {
        if (this.history.length === 0) {
            return false;
        }

        const state = this.history.pop();
        this.redoStack.push({
            board: this.board.map(row => [...row]),
            currentPlayer: this.currentPlayer,
            gameOver: this.gameOver
        });

        this.board = state.board;
        this.currentPlayer = state.currentPlayer;
        this.gameOver = state.gameOver;

        return true;
    }

    redoMove() {
        if (this.redoStack.length === 0) {
            return false;
        }

        const state = this.redoStack.pop();
        this.history.push({
            board: this.board.map(row => [...row]),
            currentPlayer: this.currentPlayer,
            gameOver: this.gameOver
        });

        this.board = state.board;
        this.currentPlayer = state.currentPlayer;
        this.gameOver = state.gameOver;

        return true;
    }

    skipTurn() {
        if (this.getValidMoves().length > 0) {
            return false;
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.redoStack = [];

        // Check if both players are stuck
        const validMoves = this.getValidMoves();
        if (validMoves.length === 0) {
            this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
            const opponentMoves = this.getValidMoves();
            if (opponentMoves.length === 0) {
                this.gameOver = true;
            }
        }

        return true;
    }

    getWhiteCount() {
        let count = 0;
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 2) count++;
            }
        }
        return count;
    }

    getBlackCount() {
        let count = 0;
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (this.board[row][col] === 1) count++;
            }
        }
        return count;
    }

    isGameFinished() {
        return this.gameOver;
    }
}

// AI Player
class AIPlayer {
    constructor(player, difficulty) {
        this.player = player;
        this.difficulty = difficulty; // 0=easy, 1=medium, 2=hard, 3=expert
    }

    getBestMove(gameState) {
        const validMoves = gameState.getValidMoves();
        if (validMoves.length === 0) {
            return null;
        }

        switch (this.difficulty) {
            case 0: // Easy - Random
                return this.getRandomMove(validMoves);
            case 1: // Medium - Greedy
                return this.getGreedyMove(gameState, validMoves);
            case 2: // Hard - Positional
                return this.getPositionalMove(gameState, validMoves);
            case 3: // Expert - Minimax
                return this.getMinimaxMove(gameState, validMoves, 3);
            default:
                return this.getGreedyMove(gameState, validMoves);
        }
    }

    getRandomMove(moves) {
        return moves[Math.floor(Math.random() * moves.length)];
    }

    getGreedyMove(gameState, moves) {
        let bestMove = moves[0];
        let bestScore = -Infinity;

        for (const move of moves) {
            const score = this.evaluateMove(gameState, move);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    }

    getPositionalMove(gameState, moves) {
        // Position weights for Reversi
        const weights = [
            [100, -20, 10,  5,  5, 10, -20, 100],
            [-20, -50, -2, -2, -2, -2, -50, -20],
            [ 10,  -2, -1, -1, -1, -1,  -2,  10],
            [  5,  -2, -1, -1, -1, -1,  -2,   5],
            [  5,  -2, -1, -1, -1, -1,  -2,   5],
            [ 10,  -2, -1, -1, -1, -1,  -2,  10],
            [-20, -50, -2, -2, -2, -2, -50, -20],
            [100, -20, 10,  5,  5, 10, -20, 100]
        ];

        let bestMove = moves[0];
        let bestScore = -Infinity;

        for (const move of moves) {
            const score = weights[move.x][move.y];
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    }

    getMinimaxMove(gameState, moves, depth) {
        let bestMove = moves[0];
        let bestScore = -Infinity;

        for (const move of moves) {
            const newGameState = this.cloneGameState(gameState);
            newGameState.makeMove(move.x, move.y);
            const score = this.minimax(newGameState, depth - 1, -Infinity, Infinity, false);
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        }

        return bestMove;
    }

    minimax(gameState, depth, alpha, beta, maximizing) {
        if (depth === 0 || gameState.isGameFinished()) {
            return this.evaluateGameState(gameState);
        }

        const validMoves = gameState.getValidMoves();
        if (validMoves.length === 0) {
            const newGameState = this.cloneGameState(gameState);
            newGameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
            return this.minimax(newGameState, depth, alpha, beta, maximizing);
        }

        if (maximizing) {
            let maxScore = -Infinity;
            for (const move of validMoves) {
                const newGameState = this.cloneGameState(gameState);
                newGameState.makeMove(move.x, move.y);
                const score = this.minimax(newGameState, depth - 1, alpha, beta, false);
                maxScore = Math.max(maxScore, score);
                alpha = Math.max(alpha, score);
                if (beta <= alpha) break;
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            for (const move of validMoves) {
                const newGameState = this.cloneGameState(gameState);
                newGameState.makeMove(move.x, move.y);
                const score = this.minimax(newGameState, depth - 1, alpha, beta, true);
                minScore = Math.min(minScore, score);
                beta = Math.min(beta, score);
                if (beta <= alpha) break;
            }
            return minScore;
        }
    }

    cloneGameState(gameState) {
        const clone = new ReversiEngine();
        clone.boardSize = gameState.boardSize;
        clone.board = gameState.board.map(row => [...row]);
        clone.currentPlayer = gameState.currentPlayer;
        clone.gameOver = gameState.gameOver;
        clone.history = [];
        clone.redoStack = [];
        return clone;
    }

    evaluateMove(gameState, move) {
        // Simple evaluation: count pieces that would be flipped
        const opponent = gameState.getCurrentPlayer() === 1 ? 2 : 1;
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],           [0, 1],
            [1, -1],  [1, 0],  [1, 1]
        ];

        let flipped = 0;
        for (const [dr, dc] of directions) {
            let r = move.x + dr;
            let c = move.y + dc;
            let foundOpponent = false;
            let tempFlipped = 0;

            while (r >= 0 && r < gameState.boardSize && c >= 0 && c < gameState.boardSize) {
                if (gameState.getBoardCell(r, c) === opponent) {
                    foundOpponent = true;
                    tempFlipped++;
                    r += dr;
                    c += dc;
                } else if (gameState.getBoardCell(r, c) === gameState.currentPlayer && foundOpponent) {
                    flipped += tempFlipped;
                    break;
                } else {
                    break;
                }
            }
        }

        return flipped;
    }

    evaluateGameState(gameState) {
        const whiteCount = gameState.getWhiteCount();
        const blackCount = gameState.getBlackCount();
        const positionWeights = [
            [100, -20, 10,  5,  5, 10, -20, 100],
            [-20, -50, -2, -2, -2, -2, -50, -20],
            [ 10,  -2, -1, -1, -1, -1,  -2,  10],
            [  5,  -2, -1, -1, -1, -1,  -2,   5],
            [  5,  -2, -1, -1, -1, -1,  -2,   5],
            [ 10,  -2, -1, -1, -1, -1,  -2,  10],
            [-20, -50, -2, -2, -2, -2, -50, -20],
            [100, -20, 10,  5,  5, 10, -20, 100]
        ];

        let positionalScore = 0;
        for (let row = 0; row < gameState.boardSize; row++) {
            for (let col = 0; col < gameState.boardSize; col++) {
                if (gameState.getBoardCell(row, col) === 1) {
                    positionalScore += positionWeights[row][col];
                } else if (gameState.getBoardCell(row, col) === 2) {
                    positionalScore -= positionWeights[row][col];
                }
            }
        }

        // Combine piece count and positional score
        const pieceScore = blackCount - whiteCount;
        return pieceScore * 2 + positionalScore;
    }
}

// Export for use in game.js
window.ReversiEngine = ReversiEngine;
window.AIPlayer = AIPlayer;
