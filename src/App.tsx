import React, { useEffect, useState } from "react";
import Keyboard from "./components/Keyboard";
import Line from "./components/Line";

const API_LINK = "/api/words";

const MESSAGES = {
  NOTFOUND: "No word Found",
};

function App() {
  const [solution, setSolution] = useState<string>("");
  const [wordList, setWordList] = useState<string[] | null>(null);
  const [guesses, setGuesses] = useState<(string | null)[]>(
    new Array(6).fill(null)
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameOver, setGameOver] = useState<string | boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (message: string) => {
    setMessage(message);
    resetMessageInterval();
  };

  const resetMessageInterval = () => {
    setInterval(() => setMessage(null), 2000);
  };

  const checkIfSolution = (word: string) => {
    if (word === solution) return true;
  };

  const handleWordFound = (word: string) => {
    if (currentGuess === solution) setGameOver(true);
    const newArray = guesses;
    newArray[newArray.indexOf(null)] = word;
    setGuesses(newArray);
    resetCurrentGuess();
  };

  const handleEnter = (word: string) => {
    if (checkIfSolution(word)) {
      setGameOver(true);
      return;
    }

    if (wordList?.find((val) => word === val)) {
      handleWordFound(currentGuess);
      return;
    }

    showMessage(MESSAGES.NOTFOUND);
  };

  const resetCurrentGuess = () => {
    setCurrentGuess("");
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
      if (e.key === "Enter" && currentGuess.length === 5) {
        handleEnter(currentGuess);
      }

      if (e.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
      }

      if (!e.key.match(/^[a-z]$/i)) return;

      if (currentGuess.length < 5) {
        setCurrentGuess(currentGuess + e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentGuess]);

  return (
    <div className="container">
      <div className="bord">
        {guesses.map((guess, index) => {
          const isCurrentGuess =
            index === guesses.findIndex((val) => val == null);
          const isFound = guesses[index] !== null;
          return (
            <Line
              guess={isCurrentGuess ? currentGuess : guess}
              isFound={isFound}
              solution={solution}
              key={"line" + index}
            />
          );
        })}
        {gameOver && "You found the Word. Nice!"}
        {message && <div className="message-div">{message}</div>}
      </div>
      <Keyboard guesses={guesses} solution={solution}/>
    </div>
  );
}

export default App;
