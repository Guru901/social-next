"use client";

import Nav from "@/Components/Nav";
import Spinner from "@/Components/Spinner";
import axios from "axios";
import { useEffect, useState } from "react";

const Memes = () => {
  const [meme, setMeme] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMeme = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://meme-api.com/gimme");
      setMeme(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError("An error occured! try to reload");
    }
  };

  useEffect(() => {
    getMeme();
  }, []);

  if (loading) return <Spinner />;
  if (error) return error;

  return (
    <div className="flex flex-col gap-4">
      <Nav />
      <p className="px-3">Reload for another meme</p>
      <div className="flex flex-col justify-start items-center h-screen">
        <img src={meme.url} className="max-w-[100svw] w-100vw max-h-[90vh] " />
        <h1>Author - {meme.author}</h1>
      </div>
    </div>
  );
};

export default Memes;
