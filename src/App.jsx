import React, { useState, useEffect } from "react";
import classes from "./App.module.css";
import Square from "./components/Square";

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState({ winner: "none", state: "none" });

  const Patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const checkWinner = () => {
    Patterns.forEach((currPattern) => {
      const firstPlayer = board[currPattern[0]];
      if (firstPlayer == "") return;
      let foundWinner = true;
      currPattern.forEach((idx) => {
        if (board[idx] != firstPlayer) {
          foundWinner = false;
        }
      })
      if (foundWinner) {
        setResult({ winner: firstPlayer, state: "won" })
      }
    })
  }

  const checkDraw = () => {
    let filled = true;
    board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    })
    if (filled) {
      setResult({ winner: "none", state: "draw" })
    }
  }

  const resetHandler = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setResult({ winner: "none", state: "none" })
  }

  useEffect(() => {
    checkDraw();
    checkWinner();
  }, [board]);

  useEffect(() => {
    if (result.state == "won") {
      alert(`Player ${result.winner} won!`)
    }
    else if (result.state == "draw") {
      alert("It's a draw!")
    }
    setBoard(["", "", "", "", "", "", "", "", ""]);
  }, [result]);

  const chooseSquare = (square) => {
    setBoard(board.map((val, idx) => {
      if (idx == square && val == "") {
        return player
      }
      return val
    }))
    setPlayer(player == "X" ? "O" : "X")
  };

  return (
    <div className={classes.App}>
      <h1>Tic Tac Toe</h1>
      <div className={classes.board}>
        <div className={classes.row}>
          <Square val={board[0]} chooseSquare={() => { chooseSquare(0) }} />
          <Square val={board[1]} chooseSquare={() => { chooseSquare(1) }} />
          <Square val={board[2]} chooseSquare={() => { chooseSquare(2) }} />
        </div>
        <div className={classes.row}>
          <Square val={board[3]} chooseSquare={() => { chooseSquare(3) }} />
          <Square val={board[4]} chooseSquare={() => { chooseSquare(4) }} />
          <Square val={board[5]} chooseSquare={() => { chooseSquare(5) }} />
        </div>
        <div className={classes.row}>
          <Square val={board[6]} chooseSquare={() => { chooseSquare(6) }} />
          <Square val={board[7]} chooseSquare={() => { chooseSquare(7) }} />
          <Square val={board[8]} chooseSquare={() => { chooseSquare(8) }} />
        </div>
      </div>
      <button onClick={resetHandler}>Reset</button>
    </div>
  );
}

export default App;