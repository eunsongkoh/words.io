"use client";
import { getWords } from "@/app/pages/api/wordService/dbService";
import { deleteWord } from "@/app/pages/api/wordService/dbService";

export default async function Card() {
  const resultData = await getWords();
  const words = resultData.totalWords || [];

  if (Array.isArray(words)) {
    return (
      <>
        {words.map((word) => (
          <a
            href="#"
            className="m-8 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{word.word}</div>
              <p className="text-white-700 text-base">{word.description}</p>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-8 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                id={word._id}
                onClick={async () => {
                  const message = await deleteWord(word._id);
                  if (message) {
                    console.log("Deleted");
                    window.location.reload();
                  } else {
                    alert("ERROR, Failed to Delete");
                  }
                }}
              >
                삭제
              </button>
            </div>
          </a>
        ))}
      </>
    );
  } else {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">
            아직 추가된 단어가 없습니다
          </div>
          <p className="text-gray-700 text-base">단어를 추가하십시오</p>
        </div>
      </div>
    );
  }
}
