import { useState, useEffect, useRef, useCallback } from "react";
import { getGif } from "../service/gifApi";

export interface Gif {
  id: string;
  title: string;
  url: string;
}

interface UseFetchResult {
  gifs: Gif[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Custom hook para cargar gifs segun una categoria especifica
 * @param category - categoria para la busqueda de gifs
 * @param initialFetch - Indica si se debe iniciar una carga inicial (por defecto: true)
 * @returns Un objeto de los gifs, estado de carga, error y funcion para recargar nuevos gifs
 */

export const useFetch = (
  category: string,
  initialFetch: true
): UseFetchResult => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Utilizamos un ref para mantener la categoría actual y evitar problemas con el useCallback
  const categoryRef = useRef(category);

  // Contador para el offset, se ira incrementando en cada refetch
  const offsetRef = useRef(0);

  useEffect(() => {
    categoryRef.current = category;
    // Resetear el offset cuando cambia la categoria
    offsetRef.current = 0;
  }, [category]);

  const fetchGifs = useCallback(async (): Promise<void> => {
    if (!categoryRef.current.trim()) {
      setGifs([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const newGifs = await getGif(categoryRef.current, offsetRef.current);
      setGifs(newGifs);

      offsetRef.current += 6;
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error
          : new Error("Error desconocido al cargar el gif");
      setError(errorMessage);
      setGifs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (initialFetch) {
      offsetRef.current = 0;
      fetchGifs();
    }
  }, [category, initialFetch, fetchGifs]);

  return { gifs, isLoading, error, refetch: fetchGifs };
};
