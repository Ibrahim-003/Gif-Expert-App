import { API_KEY, BASE_URL } from "../config/config";

interface GifAPI {
  id: string;
  title: string;
  images: {
    downsized_medium: {
      url: string;
    };
  };
}

export const getGif = async (category: string) => {
  const response = await fetch(
    `${BASE_URL}?api_key=${API_KEY}&q=${encodeURIComponent(category)}&limit=6`
  );
  const { data } = await response.json();

  const gifs = data.map((images: GifAPI) => ({
    id: images.id,
    title: images.title,
    url: images.images.downsized_medium.url,
  }));

  return gifs;
};
