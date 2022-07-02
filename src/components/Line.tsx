import React from 'react'
import "../style/main.css"

interface Props {
  guess: string | null;
  solution: string ;
  isFound: boolean;
}

const Line:React.FC<Props> = ({guess, solution, isFound}) => {
  const tiles = [];

  for(let i = 0; i < 5; i++){
    let char;
    if(guess){
      char = guess[i];
    } else {
       char = "";
    }

    tiles.push(char);

  }

  const getColor = (solution: string, char: string, index: number) => {
    let color = "grey";
    switch(true){
      case solution[index] === char:
        color = "green";
        break;
      case solution.includes(char):
        color = "yellow";
        break;
        default:
        color = "grey";
    }

    return color;
  }

  return (
    <div className="line">
      {tiles.map((char, index) => {
        return <div className="cell" style={{backgroundColor: isFound ?  getColor(solution, char, index) : "lightgrey"}} key={"linediv" + index} > {char} </div>
      })}
    </div>
  )
}

export default Line