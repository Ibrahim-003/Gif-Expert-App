import GifCard from "./GifCard";
import { useFetch } from "../hooks/useFetch";
import { capitalizeWords } from "../utils/capitalize";

import { FaRegTrashAlt } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";

interface GifListProps {
  category: string;
  onRemoveCategory: (category: string) => void;
}

export default function GifList({ category, onRemoveCategory }: GifListProps) {
  const { gifs, isLoading, error, refetch } = useFetch(category, true);

  return (
    <article>
      <header className='flex items-center justify-between gap-4 mb-5'>
        <h2 className='text-xl underline underline-offset-4 font-semibold'>
          {capitalizeWords(category)}
        </h2>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => onRemoveCategory(category)}
            aria-label={`Eliminar categoría ${category}`}
            className='p-2 rounded bg-text-muted text-surface hover:text-primary hover:bg-text-muted/10 transition-colors duration-300'
          >
            <FaRegTrashAlt className='text-2xl' />
          </button>
          <button
            onClick={refetch}
            disabled={isLoading}
            aria-label={`Refrescar categoria ${category}`}
            className='p-2 rounded bg-text-muted text-surface hover:text-primary hover:bg-text-muted/10 transition-colors duration-300'
          >
            <TbRefresh className='text-2xl' />
          </button>
        </div>
      </header>
      {isLoading && <p>Cargando...</p>}
      {error && (
        <div className='text-error'>
          <p>Error al cargar gifs: {error.message}</p>
          <button onClick={refetch}>Reintentar</button>
        </div>
      )}
      <ul className='grid sm:grid-cols-2 lg:grid-cols-3 justify-center gap-5 items-start'>
        {gifs?.map((gif) => (
          <li key={gif.id}>
            <GifCard gif={gif} />
          </li>
        ))}
      </ul>
    </article>
  );
}
