// card used to generate a random word and description

"use client";
import { useState, useEffect, useRef } from "react";
import { getRandomWord } from "@/app/pages/api/wordService/random";
import { add } from "@/app/pages/api/wordService/dbService";

const RandomCard = () => {
  const [randomWord, setRandomWord] = useState("");
  const [desc, setDesc] = useState("");
  const rendered = useRef(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const resultData = await getRandomWord();

        const message = resultData.word || "ERROR, Reload the page";
        var theDesc = "";
        if (!resultData.results) {
          theDesc = "No description available";
          setDesc(theDesc);
        } else {
          theDesc =
            resultData.results[0].definition || "No description available";
          setDesc(theDesc);
        }

        setRandomWord(message);
      } catch (error) {
        console.log(error);
      }
    };

    // prevents from being rendered twice
    if (!rendered.current) {
      getData();
      rendered.current = true;
    }
  }, []);
  return (
    <a
      href="#"
      cclassName="m-8 block max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <p className="text-4xl font-bold text-gray-900 dark:text-white">
            Random 단어
          </p>
          <div className="font-bold text-xl mb-2">{randomWord}</div>
          <p className="text-white-700 text-base">{desc}</p>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-8  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            onClick={async () => {
              const message = await add(randomWord, desc);
              if (message) {
                console.log("Added to DB");
                alert("Saved Successfully");
                window.location.reload();
              } else {
                console.log("Failed to add to DB");
              }
            }}
          >
            저장
          </button>
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-8 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={async () => {
              window.location.reload();
            }}
          >
            새로운 단어
          </button>
        </div>
      </div>
    </a>
  );
};

export default RandomCard;
