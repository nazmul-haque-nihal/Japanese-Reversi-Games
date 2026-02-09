<div align="center">

  # 🎮 Japanese Reversi Games

  **A modern, bilingual Reversi (Othello) game with intelligent AI and beautiful UI**

  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://www.javascript.com/)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://www.w3.org/html/)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://www.w3.org/css/)

  [Live Demo](#-live-demo) • [Features](#-features) • [Getting Started](#-getting-started) • [Screenshots](#-screenshots) • [Contributing](#-contributing)

</div>

---

## 🌟 About

**Japanese Reversi Games** is a beautifully crafted web-based implementation of the classic Reversi (also known as Othello) board game. Built with pure JavaScript, HTML5, and CSS3, it offers a modern gaming experience with:

- 🤖 **Intelligent AI** with 4 difficulty levels
- 🌍 **Bilingual Support** (English & Japanese)
- 📱 **Responsive Design** that works on all devices
- 🎨 **Modern UI** with smooth animations and effects
- 🔊 **Sound Effects** for immersive gameplay
- ⏱️ **Game Statistics** including moves count and timer

## ✨ Features

### 🎯 Core Gameplay
- Full Reversi rules implementation
- Valid move detection and visualization
- Automatic piece flipping
- Skip turn when no valid moves available
- Game over detection with winner announcement

### 🧠 AI Opponent
| Difficulty | Algorithm | Description |
|------------|-----------|-------------|
| **Easy** | Random | Perfect for beginners |
| **Medium** | Greedy | Maximizes immediate piece capture |
| **Hard** | Positional | Strategic corner and edge control |
| **Expert** | Minimax | Deep lookahead with alpha-beta pruning |

### 🌐 User Interface
- **Bilingual**: Switch between English (EN) and Japanese (日本語)
- **Responsive**: Optimized for desktop, tablet, and mobile
- **Interactive**: Click/tap to make moves
- **Visual Feedback**: Valid move indicators, move animations
- **Modal System**: Game over screens and rules display

### 🎵 Audio Experience
- Move placement sounds
- Invalid move alerts
- Undo/redo feedback
- Game victory sounds
- Mute/unmute functionality

### 📊 Game Statistics
- Move counter
- Game timer
- Valid moves indicator
- Real-time score tracking

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No dependencies or installation required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nazmul-haque-nihal/Japanese-Reversi-Games.git
   cd Japanese-Reversi-Games/web
   ```

2. **Open the game**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000

     # Node.js
     npx serve

     # PHP
     php -S localhost:8000
     ```

3. **Play!**
   - Click on blue dots to place pieces
   - Select difficulty from dropdown
   - Use controls: New Game, Undo, Redo, Skip

### Project Structure

```
web/
├── index.html          # Main game page
├── test.html           # Unit tests
├── css/
│   └── styles.css      # Complete styling
├── js/
│   ├── engine.js       # Game engine & AI
│   ├── game.js         # Game controller
│   ├── ui.js           # User interface
│   └── audio.js        # Sound management
└── assets/
    ├── sounds/         # Audio files (empty - using Web Audio API)
    ├── images/         # Game images (empty)
    └── fonts/          # Custom fonts (empty)
```

---

## 🎨 Screenshots

### Game Board
*(Add screenshots of the game board here)*

### Mobile View
*(Add mobile screenshots here)*

### Rules Modal
*(Add rules modal screenshot here)*

---

## 🎮 How to Play

### Basic Rules

1. **Black** (AI) always moves first, **White** (You) moves second
2. Click on any **blue dot** to place your piece
3. Your piece must **bracket** one or more opponent pieces
4. All bracketed pieces **flip** to your color
5. If you can't make a move, click **Skip**
6. Game ends when neither player can move
7. Player with the most pieces **wins**!

### Strategy Tips

- 🏆 **Control Corners** - They can never be flipped!
- ⚠️ **Avoid Edge Squares** - They give opponents corners
- 📊 **Keep Mobility** - Maintain more valid moves than your opponent
- 🎯 **Balance Aggression** - Don't grab too many pieces early

### Controls

| Action | Button/Key |
|--------|------------|
| New Game | 🔄 New Game button |
| Undo | ↩️ Undo button |
| Redo | ↪️ Redo button |
| Skip | ⏭️ Skip button |
| Make Move | Click/tap blue dots |
| View Rules | 📖 Rules button |
| Switch Language | EN / 日本語 button |

---

## 🧪 Testing

Run the included unit tests:

```bash
# Open test.html in your browser
open test.html

# Or run with Node.js
node -e "
const fs = require('fs');
global.window = global;
eval(fs.readFileSync('js/engine.js', 'utf8'));
// Run tests...
"
```

All tests should pass ✅

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| **JavaScript (ES6+)** | Game logic and AI algorithms |
| **HTML5 Canvas** | Board rendering and animations |
| **CSS3** | Modern styling and responsive design |
| **Web Audio API** | Sound effect generation |
| **LocalStorage** | Preference persistence |

### Key Algorithms

- **Minimax with Alpha-Beta Pruning** for Expert AI
- **Positional Evaluation** for Hard AI
- **Greedy Strategy** for Medium AI
- **Random Selection** for Easy AI

---

## 🌍 Language Support

Currently supported:
- 🇬🇧 English (EN)
- 🇯🇵 Japanese (日本語)

More languages can be added by extending the `translations` object in `js/ui.js`.

---

## 📈 Roadmap

- [ ] Multiplayer mode (online)
- [ ] More AI difficulty levels
- [ ] Game replay functionality
- [ ] Custom board sizes
- [ ] Dark mode theme
- [ ] Leaderboard system
- [ ] Mobile app version

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure responsive design is maintained

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Nazmul Haque Nihal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👤 Author

**Nazmul Haque Nihal**

- GitHub: [@nazmul-haque-nihal](https://github.com/nazmul-haque-nihal)
- Email: [nazmulhaque.green@gmail.com](mailto:nazmulhaque.green@gmail.com)

---

## 🙏 Acknowledgments

- Reversi game rules and strategy guides
- Web Audio API documentation
- Canvas API best practices
- The open-source community

---

## 📞 Support

If you encounter any issues or have questions:

- Open an issue on GitHub
- Email: [nazmulhaque.green@gmail.com](mailto:nazmulhaque.green@gmail.com)
- Check existing issues and discussions

---

<div align="center">

  **⭐ If you like this project, please give it a star! ⭐**

  [Back to Top](#-japanese-reversi-games)

</div>
