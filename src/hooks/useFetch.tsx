import { useState, useEffect } from "react";
import { getGif } from "../service/gifApi";

interface Gif {
  id: string;
  title: string;
  url: string;
}

export const useFetch = (category: string) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getNewGifs = async () => {
    setIsLoading(true);
    try {
        const newGifs = await getGif(category);
        setGifs(newGifs);
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
    }finally{
        setIsLoading(false);
    }
  };

  useEffect(() => {
    getNewGifs();
  }, []);

  return { gifs, isLoading };
};
