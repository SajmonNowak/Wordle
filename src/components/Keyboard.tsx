import React from "react";

const topKeys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const middleKeys = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomKeys = ["Enter","Z", "X", "C", "V", "B", "N", "M", "Back"];

interface Props {
  guesses: (string | null)[],
  solution: string
}

const Keyboard:React.FC<Props> = ({guesses, solution}) => {

  const chars: {[char:string]: string} = {};

  guesses.forEach((guess) => {
    const charsOfGuess = guess?.split("");
    charsOfGuess?.forEach((char, index) => {
        if(char === solution[index]){
          chars[char] = "green";
          return;
        }
        if(solution.split("").find((val) => val === char)){
          chars[char] = "yellow"
          return
        }
        chars[char] = "grey";
    })
  })

  const selectColor = (char: string) => {
    
    if (chars[char]){
      return chars[char]
    }
  
    return "lightgrey";
  }

  return (
    <div className="keyboard">
      <div className="keyboard__row keyboard__top">
        {topKeys.map((k) => {
          return <div className="key" style={{backgroundColor: selectColor(k)}}>{k}</div>;
        })}
      </div>
      <div className="keyboard__row keyboard__mid">
        {middleKeys.map((k) => {
          return <div className="key" style={{backgroundColor: selectColor(k)}}>{k}</div>;
        })}
      </div>
      <div className="keyboard__row keyboard__bottom">
        {bottomKeys.map((k) => {
          return <div className={`key ${k === "Enter" || k === "Back" ? "specialKey" : ""}`} style={{backgroundColor: selectColor(k)}}>{k}</div>;
        })}
      </div>
    </div>
  );
};

export default Keyboard;
