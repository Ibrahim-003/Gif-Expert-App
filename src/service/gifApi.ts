import { API_KEY, BASE_URL } from "../config/config";
import { Gif } from "../hooks/useFetch";

interface GifAPI {
  id: string;
  title: string;
  images: {
    downsized_medium: {
      url: string;
    };
  };
}

/**
 * Obtiene gifs desde la API de Giphy según una categoría
 * @param category - Categoría para buscar
 * @param offset - Posición desde donde empezar en los resultados (para paginación)
 * @returns Array de objetos Gif
 */
export const getGif = async (category: string, offset = 0): Promise<Gif[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}?api_key=${API_KEY}&q=${encodeURIComponent(
        category
      )}&limit=6&offset=${offset}`
    );
    const { data } = await response.json();

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((images: GifAPI) => ({
      id: images.id,
      title: images.title,
      url: images.images.downsized_medium.url,
    }));
  } catch (error) {
    console.error("Error al obtener gifs:", error);
    throw error;
  }
};
