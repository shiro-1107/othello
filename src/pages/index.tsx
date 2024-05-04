import { useState } from 'react';
import styles from './index.module.css';
const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
];

function newBalude(x: number, y: number) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 0, 0, 2, 2, 0, 0],
    [0, 0, 0, 1, 2, 2, 0, 0],
    [0, 0, 1, 2, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  function sameColor(x: number, y: number) {
    return board[y][x] === turnColor;
  }
  function antherColor(x: number, y: number) {
    return board[y][x] === 3 - turnColor;
  }

  function zeroColor(x: number, y: number) {
    return board[y][x] === 0;
  }
  const newBoard = structuredClone(board);

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
    console.log(turnColor);
    for (const direction of directions) {
      const dx = direction[0];
      const dy = direction[1];

      if (newBoard[y][x] === 0) {
      for (let i = 1; i < 8; i++) {
        if (newBalude(x + dx * i, y + dy * i) && antherColor(x + dx * i, y + dy * i)) {
          if (newBalude(x + dx * (i + 1), y + dy * (i + 1)) && sameColor(x + dx * (i + 1), y + dy * (i + 1))) {
            for (let a = 1; a <= i; a++) {
              newBoard[y][x] = turnColor;
              newBoard[y + dy * a][x + dx * a] = turnColor;
              setTurnColor(3 - turnColor);
              console.log("AAA");
            }
          }
        }

        if (newBalude(x + dx * i, y + dy * i) && zeroColor(x + dx * i, y + dy * i)) {
          console.log("BBB");
          break;
        }
        if (newBalude(x + dx * i, y + dy * i) && sameColor(x + dx * i, y + dy * i)) {
          console.log("CCC");
          break;
        }
      }
    }
  }
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <div className={styles.boardStyle}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cellStyle} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stoneStyle}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          )),
        )}
      </div>
    </div>
  );
};

export default Home;
