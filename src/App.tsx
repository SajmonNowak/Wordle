import React, { useEffect, useState } from "react";
import Line from "./components/Line";

const API_LINK = "/api/words";

function App() {
  const [solution, setSolution] = useState<String | null>(null);
  const [guesses, setGuesses] = useState<String[] | null[]>(new Array(6).fill(null));

  useEffect(() => {
    const fetchWordsAndSetSolution = async (API_Link: string) => {
      const response = await fetch(API_LINK);
      const words: string[] = await response.json();
      const randomWord: string =
        words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
    };

    fetchWordsAndSetSolution(API_LINK).catch((error) => console.log(error));
  }, []);

  // useEffect(() => {

  //   window.addEventListener("key")

  // }, [])

  return (
    <div className="bord">
      {guesses.map((guess) => {
        return <Line guess={guess} />;
      })}
    </div>
  );
}

export default App;
