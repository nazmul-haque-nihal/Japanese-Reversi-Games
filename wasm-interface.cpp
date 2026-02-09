/**
 * Reversi Game - WebAssembly Interface
 *
 * This file provides the C++ to JavaScript interface for the WebAssembly module.
 */

#include <emscripten.h>
#include <emscripten/bind.h>
#include <emscripten/val.h>

#include "model/GameState.h"
#include "model/AI/AIPlayer.h"

using namespace reversi;
using namespace emscripten;

// GameState interface
EMSCRIPTEN_BINDINGS(reversi_gamestate) {
    enum_<Player>("Player")
        .value("NONE", Player::NONE)
        .value("BLACK", Player::BLACK)
        .value("WHITE", Player::WHITE);
    
    enum_<GameStatus>("GameStatus")
        .value("PLAYING", GameStatus::PLAYING)
        .value("WHITE_WIN", GameStatus::WHITE_WIN)
        .value("BLACK_WIN", GameStatus::BLACK_WIN)
        .value("DRAW", GameStatus::DRAW);
    
    value_object<Position>("Position")
        .field("x", &Position::x)
        .field("y", &Position::y);
    
    class_<GameState>("GameState")
        .constructor<int, int>()
        .function("newGame", &GameState::newGame)
        .function("isGameFinished", &GameState::isGameFinished)
        .function("getCurrentPlayer", &GameState::getCurrentPlayer)
        .function("getGameStatus", &GameState::getGameStatus)
        .function("getBoard", &GameState::getBoard, allow_raw_pointers())
        .function("getMoveHistory", &GameState::getMoveHistory)
        .function("getWhiteCount", &GameState::getWhiteCount)
        .function("getBlackCount", &GameState::getBlackCount)
        .function("getValidMoves", &GameState::getValidMoves)
        .function("makeMove", &GameState::makeMove)
        .function("undoMove", &GameState::undoMove)
        .function("redoMove", &GameState::redoMove)
        .function("skipTurn", &GameState::skipTurn);
    
    class_<GameState::Move>("Move")
        .constructor<Position, Player, int>()
        .field("position", &GameState::Move::position)
        .field("player", &GameState::Move::player)
        .field("piecesFlipped", &GameState::Move::piecesFlipped);
    
    class_<Board>("Board")
        .constructor<int, int>()
        .function("initialize", &Board::initialize)
        .function("clear", &Board::clear)
        .function("getCell", &Board::getCell)
        .function("setCell", &Board::setCell)
        .function("isValidPosition", &Board::isValidPosition)
        .function("isValidMove", &Board::isValidMove)
        .function("getValidMoves", &Board::getValidMoves)
        .function("makeMove", &Board::makeMove)
        .function("countPieces", &Board::countPieces)
        .function("getWidth", &Board::getWidth)
        .function("getHeight", &Board::getHeight);
}

// AIPlayer interface
EMSCRIPTEN_BINDINGS(reversi_aiplayer) {
    enum_<AIDifficulty>("AIDifficulty")
        .value("EASY", AIDifficulty::EASY)
        .value("MEDIUM", AIDifficulty::MEDIUM)
        .value("HARD", AIDifficulty::HARD)
        .value("EXPERT", AIDifficulty::EXPERT);
    
    class_<AIPlayer>("AIPlayer")
        .constructor<Player, AIDifficulty>()
        .function("getPlayer", &AIPlayer::getPlayer)
        .function("getDifficulty", &AIPlayer::getDifficulty)
        .function("setDifficulty", &AIPlayer::setDifficulty)
        .function("getName", &AIPlayer::getName)
        .function("getBestMove", &AIPlayer::getBestMove);
    
    class_<GreedyAI, base<AIPlayer>>("GreedyAI")
        .constructor<Player, AIDifficulty>();
    
    class_<AlphaBetaAI, base<AIPlayer>>("AlphaBetaAI")
        .constructor<Player, AIDifficulty>();
    
    class_<MonteCarloAI, base<AIPlayer>>("MonteCarloAI")
        .constructor<Player, AIDifficulty>();
    
    function("createAIPlayer", &AIPlayer::create);
}

// Utility functions
EMSCRIPTEN_BINDINGS(reversi_utils) {
    function("createGameState", [] (int width, int height) {
        return std::make_unique<GameState>(width, height);
    });
    
    function("createBoard", [] (int width, int height) {
        return std::make_unique<Board>(width, height);
    });
    
    function("getPlayerName", [] (Player player) {
        switch(player) {
            case Player::BLACK: return "Black";
            case Player::WHITE: return "White";
            default: return "None";
        }
    });
    
    function("getPlayerOpponent", [] (Player player) {
        return (player == Player::BLACK) ? Player::WHITE : Player::BLACK;
    });
}

// Main entry point
int main() {
    return 0;
}
