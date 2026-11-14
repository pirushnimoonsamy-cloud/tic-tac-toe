import { useState } from "react";
import "./App.css";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}

export default function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  function handleClick(index) {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <main className="game">
      <p className="eyebrow">THE CLASSIC, REIMAGINED</p>
      <h1>TIC <span>TAC</span> TOE.</h1>
      <p className="subtitle">Two players. Nine squares. One winner.</p>

      <div className="game-card">
        <div className="game-status">
          {winner
            ? `🏆 Player ${winner} wins!`
            : isDraw
            ? "It's a draw!"
            : `Player ${xIsNext ? "X" : "O"}'s turn`}
        </div>

        <div className="board">
          {squares.map((value, index) => (
            <button
              key={index}
              className={`square ${value === "X" ? "x" : "o"}`}
              onClick={() => handleClick(index)}
              aria-label={`Square ${index + 1}: ${value || "empty"}`}
            >
              {value}
            </button>
          ))}
        </div>

        <button className="reset-btn" onClick={resetGame}>
          ↻ NEW GAME
        </button>
      </div>

      <footer>BUILT WITH REACT · PIRUSHNI MOONSAMY</footer>
    </main>
  );
}