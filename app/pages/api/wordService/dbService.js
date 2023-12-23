export const getWords = async () => {
  const url = process.env.NEXT_PUBLIC_APIURL;
  try {
    const res = await fetch(`${url}/pages/api/words`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch words");
    }
    return res.json();
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const add = async (word, description) => {
  const url = process.env.NEXT_PUBLIC_APIURL;
  try {
    const res = await fetch(`${url}/pages/api/words`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ word, description }),
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

// deleting a word
export const deleteWord = async (id) => {
  const url = process.env.NEXT_PUBLIC_APIURL;
  try {
    const res = await fetch(`${url}/pages/api/words?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      return res.json();
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};
