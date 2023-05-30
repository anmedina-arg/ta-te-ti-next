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

function Square({ children, isSelected, updateBoard = null, index }: any): any {

  const handleClick = () => {
    if (updateBoard) return updateBoard(index)
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
  const [board, setBoard] = useState(Array(9).fill(null))


  //   () => {
  //   const boardFromLocalStorage = window.localStorage.getItem('board');
  //   return boardFromLocalStorage
  //     ? JSON.parse(boardFromLocalStorage)
  //     : Array(9).fill(null)
  // })

  const [turno, setTurno] = useState(TURNOS.X)


  //   () => {
  //   const turnoFromLocalStorage = window.localStorage.getItem('turno');
  //     return turnoFromLocalStorage ? JSON.parse(turnoFromLocalStorage) : TURNOS.X;


  // });

  const [winner, setWinner] = useState<null | boolean>(null);

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
  };

  const checkGame = (boardToCheck: any) => {
    return boardToCheck.every((elements: any) => elements !== null)
  };

  const updateBoard = (index: any) => {

    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turno;
    setBoard(newBoard);

    let nuevoTurno = turno === TURNOS.X ? TURNOS.O : TURNOS.X;
    setTurno(nuevoTurno);

    //window.localStorage.setItem('board', JSON.stringify(newBoard))
    //window.localStorage.setItem('turno', JSON.stringify(nuevoTurno))

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkGame(newBoard)) {
      setWinner(false)
    }
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setTurno(TURNOS.X);
    setWinner(null)
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <h1 className="mb-4">Ta - Te - Ti</h1>

      <button className="border-2 border-solid border-gray-400 rounded-md" onClick={restartGame}>
        Resetear el juego
      </button>

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

      {
        winner !== null &&
        (
          <section className="absolute bg-white border-2 border-black rounded-md p-4 flex flex-col justify-center items-center">
            <div>
              <h2 className="text-center">
                {
                  winner === false
                    ? 'Empate'
                    : 'Ganó: '
                }
              </h2>
              <header className="w-fit m-auto">
                {winner && <Square>{winner}</Square>}
              </header>
              <button onClick={restartGame} className="border-2 border-gray-500 rounded-md p-1">
                Empezar de nuevo
              </button>
            </div>
          </section>
        )
      }

    </main>
  )
}
