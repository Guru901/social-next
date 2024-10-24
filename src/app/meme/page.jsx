"use client";

import axios from "axios";

const Memes = async () => {
  const { data: meme } = await axios.get("https://meme-api.com/gimme");

  return (
    <div className="flex flex-col gap-4">
      <p className="px-3">Reload for another meme</p>
      <div className="flex flex-col justify-start items-center h-screen">
        <img src={meme.url} className="max-w-[100svw] w-100vw max-h-[90vh] " />
        <h1>Author - {meme.author}</h1>
      </div>
    </div>
  );
};

export default Memes;
