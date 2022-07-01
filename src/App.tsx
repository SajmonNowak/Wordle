import React, { useEffect, useState } from "react";
import Line from "./components/Line";

const API_LINK = "/api/words";

function App() {
  const [solution, setSolution] = useState<String | null>(null);
  const [wordList, setWordList] = useState<String[] | null>(null);
  const [guesses, setGuesses] = useState<String[] | null[]>(new Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState<String | Boolean>(false);

  const checkIfSolution = (word: string) => {
    if (word === solution) return true;
  }

  const handleEnter = (word: string) => {

    if (checkIfSolution(word)){
      setGameOver(true);
      return;
    }

    if(wordList?.find((val) => word === val )){
      setGameOver(true);
      return;
    }

    showMessage("Not Found");
  };

  useEffect(() => {
    const fetchWordsAndSetSolution = async (API_Link: string) => {
      const response = await fetch(API_LINK);
      const words: string[] = await response.json();
      setWordList(words);
      const randomWord: string =
        words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord.toUpperCase());
    };

    fetchWordsAndSetSolution(API_LINK).catch((error) => console.log(error));
  }, []);

  useEffect(() => {

    const handleKeydown = (e: KeyboardEvent) => {

      if(e.key === "Enter" && currentGuess.length === 5 ){
        handleEnter(currentGuess);
      }

      if (e.key === "Backspace"){
        setCurrentGuess(currentGuess.slice(0, -1))
      }

      if(!e.key.match(/^[a-z]$/i)) return;

      if (currentGuess.length < 5){
        setCurrentGuess(currentGuess + e.key.toUpperCase());
    }
  }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    }

  }, [currentGuess])

  console.log(solution);

  return (
    <div className="bord">
      {guesses.map((guess, index) => {
        const isCurrentGuess = index === guesses.findIndex(val => val == null); 
        return <Line guess={isCurrentGuess ? currentGuess : guess}  key={"line" + index} />;
      })}
      {gameOver && "You found the Word. Nice!"}
    </div>
  );
}

export default App;
