// generates a random word from the wordsapi
export const getRandomWord = async () => {
  const apiEndpoint = "https://wordsapiv1.p.rapidapi.com/words/?random=true";

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_URI,
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(apiEndpoint, options);
    const resultData = await response.json();

    return resultData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async function handler(req, res) {
  try {
    const resultData = await getRandomWord();
    res.status(200).json(resultData);
    console.log(resultData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
