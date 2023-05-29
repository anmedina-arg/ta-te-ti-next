'use client';

import { useState } from "react";

const TURNOS = {
  X: 'x',
  O: 'o'
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function Square({ children, isSelected, updateBoard, index }: any): any {

  const handleClick = () => {
    updateBoard(index)
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center border-black border-2 rounded-md m-1 p-8 h-5 w-5 ${isSelected ? 'bg-blue-300' : ''}`}>
      {children}
    </div>
  )
};


export default function Home() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turno, setTurno] = useState(TURNOS.X);
  const [winner, setWinner] = useState(null);

  const checkWinner = (checkBoard: any) => {

    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        checkBoard[a] &&
        checkBoard[a] === checkBoard[b] &&
        checkBoard[a] === checkBoard[c]
      ) {
        return checkBoard[a]
      }
    }
    return null
  }

  const updateBoard = (index: any) => {

    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turno;
    setBoard(newBoard);

    let nuevoTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(nuevoTurno);

    const newWinner = checkWinner(newBoard);
    setWinner(newWinner)
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-4">Ta - Te - Ti</h1>

      <section className="grid grid-cols-3">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="flex">
        <Square isSelected={turno === TURNOS.X} >{TURNOS.X}</Square>
        <Square isSelected={turno === TURNOS.O} >{TURNOS.O}</Square>
      </section>

    </main>
  )
}
