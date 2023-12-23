"use client";

import { useState, useEffect } from "react";
import { add } from "@/app/pages/api/wordService/dbService";
import { search } from "@/app/pages/api/wordService/search";

const Search = () => {
  const [searchWord, setSearchWord] = useState("");
  const [resultWord, setResultWord] = useState("");
  const [resultDesc, setResultDesc] = useState("");
  const [searched, setSearched] = useState(false);

  const makeSearch = async (event) => {
    event.preventDefault();

    try {
      const resultData = await search(searchWord);
      if (!resultData.results) {
        setResultWord("No word found");
        setResultDesc("No description available");
        return;
      }
      setResultWord(resultData.word);
      setResultDesc(resultData.results[0].definition);
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-sm mx-auto">
      <form onSubmit={makeSearch}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          검색
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="단어 검색"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            검색
          </button>
        </div>
      </form>

      {searched && (
        <a
          href="#"
          className="mt-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            검색 결과 : {resultWord}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {resultDesc}
          </p>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-8  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
            onClick={async () => {
              const message = await add(resultWord, resultDesc);
              if (message) {
                console.log("Added to DB");
                window.location.reload();
              } else {
                alert("ERROR, Failed to Delete");
              }
            }}
          >
            저장
          </button>

          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => setSearched(false)}
          >
            X
          </button>
        </a>
      )}
    </section>
  );
};

export default Search;
