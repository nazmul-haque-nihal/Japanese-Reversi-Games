/**
 * Reversi Game UI - User Interface
 */

class ReversiUI {
    constructor() {
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.language = 'en';
        this.translations = {
            en: {
                'player.white': 'White Player',
                'player.black': 'Black Player',
                'score': 'Score:',
                'status.playing': 'Playing',
                'status.whiteWins': 'White Wins!',
                'status.blackWins': 'Black Wins!',
                'status.draw': 'Draw!',
                'difficulty': 'Difficulty:',
                'difficulty.easy': 'Easy',
                'difficulty.medium': 'Medium',
                'difficulty.hard': 'Hard',
                'difficulty.expert': 'Expert',
                'action.newGame': 'New Game',
                'action.undo': 'Undo',
                'action.redo': 'Redo',
                'action.skip': 'Skip',
                'action.rules': '📖 Rules',
                'action.gotIt': 'Got It!',
                'action.playAgain': 'Play Again',
                'action.close': 'Close',
                'stat.moves': 'Moves:',
                'stat.gameTime': 'Time:',
                'stat.validMoves': 'Valid Moves:',
                'gameOver.title': 'Game Over',
                'error.gameStart': 'Failed to start game',
                'error.invalidMove': 'Invalid move',
                'error.aiMove': 'Error making AI move',
                'rules.title': 'How to Play Reversi',
                'rules.objective.title': '🎯 Objective',
                'rules.objective.text': 'Capture more pieces than your opponent. The game ends when neither player can make a move. The player with most pieces wins!',
                'rules.howToPlay.title': '🎮 How to Play',
                'rules.howToPlay.text': '<li><strong>Black</strong> (AI) always moves first</li><li><strong>White</strong> (You) moves second</li><li>Click on any <span class="highlight">blue dot</span> to make a move</li><li>Your piece must <strong>bracket</strong> opponent pieces</li><li>All bracketed pieces <strong>flip</strong> to your color</li><li>If you can\'t move, click "Skip Turn"</li><li>Game ends when both players can\'t move</li>',
                'rules.validMove.title': '✅ Valid Moves',
                'rules.validMove.text': 'A move is valid only if it <strong>flips at least one</strong> opponent piece. You can flip pieces in any of <strong>8 directions</strong> (horizontal, vertical, diagonal).',
                'rules.diagram.caption': 'Click on blue dot to flip all black pieces in a line',
                'rules.strategy.title': '💡 Strategy Tips',
                'rules.strategy.corners.title': 'Control Corners',
                'rules.strategy.corners.text': 'Corners are the most valuable positions - they can never be flipped!',
                'rules.strategy.edges.title': 'Avoid Edge Squares',
                'rules.strategy.edges.text': 'Be careful with squares next to corners - they give your opponent corners!',
                'rules.strategy.mobility.title': 'Keep Mobility',
                'rules.strategy.mobility.text': 'Maintain more legal moves than your opponent - keep options open!',
                'rules.strategy.balance.title': 'Balance Aggression',
                'rules.strategy.balance.text': 'Don\'t grab too many pieces early - mobility is more important!',
                'rules.difficulty.title': '🤖 AI Difficulty Levels',
                'rules.difficulty.easy.text': 'Random moves - Great for beginners learning the basics',
                'rules.difficulty.medium.text': 'Greedy strategy - Always flips the most pieces',
                'rules.difficulty.hard.text': 'Positional play - Prioritizes corners and edges',
                'rules.difficulty.expert.text': 'Minimax algorithm - Looks ahead multiple moves',
                'rules.controls.title': '⌨️ Controls',
                'rules.winning.title': '🏆 Winning',
                'rules.winning.text': 'The game ends when both players pass consecutively or board is full. The player with the most pieces of their color wins!'
            },
            ja: {
                'player.white': '白のプレイヤー',
                'player.black': '黒のプレイヤー',
                'score': '得点:',
                'status.playing': 'プレイ中',
                'status.whiteWins': '白の勝ち!',
                'status.blackWins': '黒の勝ち!',
                'status.draw': '引き分け!',
                'difficulty': '難易度:',
                'difficulty.easy': '簡単',
                'difficulty.medium': '普通',
                'difficulty.hard': '難しい',
                'difficulty.expert': '超難しい',
                'action.newGame': '新規ゲーム',
                'action.undo': '元に戻す',
                'action.redo': 'やり直す',
                'action.skip': 'スキップ',
                'action.rules': '📖 ルール',
                'action.gotIt': 'わかりました!',
                'action.playAgain': 'もう一度プレイ',
                'action.close': '閉じる',
                'stat.moves': '手数:',
                'stat.gameTime': '時間:',
                'stat.validMoves': '有効な手:',
                'gameOver.title': 'ゲームオーバー',
                'error.gameStart': 'ゲームの開始に失敗しました',
                'error.invalidMove': '無効な手です',
                'error.aiMove': 'AIの手の実行中にエラーが発生しました',
                'rules.title': 'リバーシの遊び方',
                'rules.objective.title': '🎯 目的',
                'rules.objective.text': '相手より多くの駒を取ります。どちらのプレイヤーも手がなくなるとゲームが終了し、最も多くの駒を持っているプレイヤーが勝ちです!',
                'rules.howToPlay.title': '🎮 遊び方',
                'rules.howToPlay.text': '<li><strong>黒</strong> (AI) が先手です</li><li><strong>白</strong> (あなた) が後手です</li><li><span class="highlight">青い点</span>をクリックして駒を置きます</li><li>あなたの駒は相手の駒を<strong>挟む</strong>必要があります</li><li>挟まれた駒はすべて<strong>反転</strong>します</li><li>手がない場合は「スキップ」をクリックします</li><li>両方の手がなくなるとゲーム終了です</li>',
                'rules.validMove.title': '✅ 有効な手',
                'rules.validMove.text': '手は少なくとも<strong>1つの</strong>相手の駒を反転させる場合のみ有効です。上下左右斜めの<strong>8方向</strong>すべてで反転できます。',
                'rules.diagram.caption': '青い点をクリックすると、一直線にあるすべての黒の駒が反転します',
                'rules.strategy.title': '💡 戦略のヒント',
                'rules.strategy.corners.title': '角を支配する',
                'rules.strategy.corners.text': '角は最も価値の高い位置です - 反転されることはありません!',
                'rules.strategy.edges.title': '端のマスを避ける',
                'rules.strategy.edges.text': '角の隣のマスには注意しましょう - 相手に角を与えてしまいます!',
                'rules.strategy.mobility.title': '機動力を維持する',
                'rules.strategy.mobility.text': '相手より多くの有効な手を維持しましょう - 選択肢を広げます!',
                'rules.strategy.balance.title': '攻撃をバランスさせる',
                'rules.strategy.balance.text': '早い段階で多くの駒を取りすぎないように - 機動力がより重要です!',
                'rules.difficulty.title': '🤖 AIの難易度レベル',
                'rules.difficulty.easy.text': 'ランダムな手 - 基本を学ぶ初心者に最適',
                'rules.difficulty.medium.text': '欲張り戦略 - 常に最も多くの駒を反転させます',
                'rules.difficulty.hard.text': '位置プレイ - 角と端を優先します',
                'rules.difficulty.expert.text': 'ミニマックスアルゴリズム - 複数の手を先読みします',
                'rules.controls.title': '⌨️ コントロール',
                'rules.winning.title': '🏆 勝利条件',
                'rules.winning.text': '両方のプレイヤーが連続してパスするか、盤面がいっぱいになるとゲームが終了します。自分の色の駒が最も多いプレイヤーが勝ちです!'
            }
        };
    }

    initialize() {
        this.setupEventListeners();
        this.setupCanvasEvents();
        this.setupLanguageSwitcher();
        this.setupResponsiveDesign();
        this.loadLanguage();
    }

    setupEventListeners() {
        // Game controls
        document.getElementById('new-game').addEventListener('click', () => this.handleNewGame());
        document.getElementById('undo').addEventListener('click', () => this.handleUndo());
        document.getElementById('redo').addEventListener('click', () => this.handleRedo());
        document.getElementById('skip').addEventListener('click', () => this.handleSkip());

        // Rules button
        document.getElementById('rules-btn').addEventListener('click', () => this.showRules());
        document.getElementById('close-rules').addEventListener('click', () => this.hideRules());
        document.getElementById('close-rules-btn').addEventListener('click', () => this.hideRules());

        // Close rules modal on backdrop click
        document.getElementById('rules-modal').addEventListener('click', (e) => {
            if (e.target.id === 'rules-modal') {
                this.hideRules();
            }
        });

        // Difficulty selector
        document.getElementById('difficulty').addEventListener('change', (e) => {
            reversiGame.newGame(e.target.value);
        });

        // Game over modal
        document.getElementById('play-again').addEventListener('click', () => {
            document.getElementById('game-over-modal').classList.remove('show');
            reversiGame.newGame();
        });
        document.getElementById('close-modal').addEventListener('click', () => {
            document.getElementById('game-over-modal').classList.remove('show');
        });
    }

    setupCanvasEvents() {
        const canvas = document.getElementById('game-board');
        
        // Click event
        canvas.addEventListener('click', (e) => {
            if (!reversiGame.isGameActive) {
                return;
            }
            
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const cellSize = rect.width / 8;
            const boardX = Math.floor(x / cellSize);
            const boardY = Math.floor(y / cellSize);
            
            this.handleCellClick(boardX, boardY);
        });
        
        // Touch events for mobile
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (!reversiGame.isGameActive) {
                return;
            }
            
            const touch = e.touches[0];
            const rect = canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            
            const cellSize = rect.width / 8;
            const boardX = Math.floor(x / cellSize);
            const boardY = Math.floor(y / cellSize);
            
            this.handleCellClick(boardX, boardY);
        }, { passive: false });
    }

    setupLanguageSwitcher() {
        const languageButtons = document.querySelectorAll('.language-btn');
        languageButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });
    }

    setupResponsiveDesign() {
        window.addEventListener('resize', () => this.updateCanvasSize());
        this.updateCanvasSize();
    }

    updateCanvasSize() {
        const canvas = document.getElementById('game-board');
        const container = canvas.parentElement;
        
        if (window.innerWidth < 768) {
            canvas.width = 300;
            canvas.height = 300;
        } else if (window.innerWidth < 1024) {
            canvas.width = 400;
            canvas.height = 400;
        } else {
            canvas.width = 600;
            canvas.height = 600;
        }
        
        // Refresh board
        if (reversiGame.gameState) {
            reversiGame.refreshBoard();
        }
    }

    handleCellClick(x, y) {
        if (reversiGame.makeMove(x, y)) {
            this.playMoveSound();
        } else {
            this.playInvalidMoveSound();
        }
    }

    handleNewGame() {
        const difficulty = document.getElementById('difficulty').value;
        if (reversiGame.newGame(difficulty)) {
            this.playNewGameSound();
        } else {
            this.showError('error.gameStart');
        }
    }

    handleUndo() {
        if (reversiGame.undo()) {
            this.playUndoSound();
        }
    }

    handleRedo() {
        if (reversiGame.redo()) {
            this.playRedoSound();
        }
    }

    handleSkip() {
        if (reversiGame.skip()) {
            this.playSkipSound();
        } else {
            this.showError('error.invalidMove');
        }
    }

    switchLanguage(lang) {
        if (lang === this.language) {
            return;
        }
        
        this.language = lang;
        localStorage.setItem('language', lang);
        
        // Update active button
        document.querySelectorAll('.language-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update all translated elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            if (this.translations[lang] && this.translations[lang][key]) {
                if (element.tagName === 'INPUT') {
                    element.placeholder = this.translations[lang][key];
                } else if (element.tagName === 'OPTION') {
                    element.textContent = this.translations[lang][key];
                } else if (element.classList.contains('rules-list')) {
                    element.innerHTML = this.translations[lang][key];
                } else {
                    element.textContent = this.translations[lang][key];
                }
            }
        });
    }

    loadLanguage() {
        const savedLang = localStorage.getItem('language');
        const browserLang = navigator.language.split('-')[0];
        const initialLang = savedLang || (['en', 'ja'].includes(browserLang) ? browserLang : 'en');
        
        this.switchLanguage(initialLang);
    }

    showError(key) {
        const message = this.translations[this.language][key] || 'An error occurred';
        reversiGame.showError(message);
    }

    showRules() {
        document.getElementById('rules-modal').classList.add('show');
    }

    hideRules() {
        document.getElementById('rules-modal').classList.remove('show');
    }

    // Sound effects
    playMoveSound() {
        if (audioManager) {
            audioManager.playSound('move');
        }
    }

    playInvalidMoveSound() {
        if (audioManager) {
            audioManager.playSound('invalid');
        }
    }

    playNewGameSound() {
        if (audioManager) {
            audioManager.playSound('newgame');
        }
    }

    playUndoSound() {
        if (audioManager) {
            audioManager.playSound('undo');
        }
    }

    playRedoSound() {
        if (audioManager) {
            audioManager.playSound('redo');
        }
    }

    playSkipSound() {
        if (audioManager) {
            audioManager.playSound('skip');
        }
    }

    playGameOverSound() {
        if (audioManager) {
            audioManager.playSound('gameover');
        }
    }

    // Animation effects
    animateMove(x, y) {
        const canvas = document.getElementById('game-board');
        const rect = canvas.getBoundingClientRect();
        const cellSize = rect.width / 8;
        const centerX = x * cellSize + cellSize / 2;
        const centerY = y * cellSize + cellSize / 2;
        
        const indicator = document.createElement('div');
        indicator.className = 'move-indicator';
        indicator.style.cssText = `
            position: absolute;
            left: ${centerX}px;
            top: ${centerY}px;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(74, 144, 226, 0.6);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 100;
            animation: pulse 0.6s ease-out;
        `;
        
        canvas.appendChild(indicator);
        
        setTimeout(() => {
            canvas.removeChild(indicator);
        }, 600);
    }

    // Progress indicator for AI moves
    showProgress(progress) {
        const statusText = document.getElementById('status-text');
        if (progress === 0) {
            statusText.textContent = this.translations[this.language]['status.thinking'] || 'Thinking...';
        } else if (progress < 100) {
            statusText.textContent = `Thinking... ${progress}%`;
        } else {
            statusText.textContent = this.translations[this.language]['status.yourTurn'] || 'Your turn';
        }
    }

    // Highlight for valid moves
    highlightValidMoves(moves) {
        // This is handled in the canvas drawing
    }

    // Show win animation
    showWinAnimation() {
        const canvas = document.getElementById('game-board');
        const overlay = document.getElementById('board-overlay');
        
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(81, 207, 102, 0.3), rgba(74, 144, 226, 0.3));
            pointer-events: none;
            animation: winPulse 1.5s ease-in-out infinite;
            z-index: 50;
        `;
        
        setTimeout(() => {
            overlay.style.cssText = '';
        }, 4500);
    }
}

// CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        50% {
            opacity: 0.8;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    @keyframes winPulse {
        0%, 100% {
            opacity: 0.3;
        }
        50% {
            opacity: 0.6;
        }
    }
    
    .move-indicator {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        z-index: 100;
    }
    
    .error-notification {
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
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const reversiUI = new ReversiUI();
    window.reversiUI = reversiUI;
    reversiUI.initialize();

    // Initialize game
    reversiGame.initialize().then(() => {
        reversiGame.refreshBoard();
        console.log('Game initialized and ready!');
    }).catch(error => {
        console.error('Failed to initialize game:', error);
        reversiUI.showError('Failed to start game. Please refresh the page.');
    });
});
