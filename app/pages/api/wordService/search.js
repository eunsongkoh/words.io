// searches for a word in the wordsapi
export const search = async (theWord) => {
  const apiEndpoint = `https://wordsapiv1.p.rapidapi.com/words/${theWord}`;

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
    console.log("THE RESULT OF SEARCH", resultData);
    return resultData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default async function handler(req, res) {
  try {
    const resultData = await search();
    res.status(200).json(resultData);
    console.log(resultData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
