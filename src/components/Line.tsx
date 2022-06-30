import React from 'react'
import "../style/main.css"

interface Props {
  guess: String | null;
}

const Line:React.FC<Props> = ({guess}) => {
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

  return (
    <div className="line">
      {tiles.map((char) => {
        return <div className="cell"> {char} </div>
      })}
    </div>
  )
}

export default Line