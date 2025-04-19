import GifCard from "./GifCard";
import { useFetch } from "../hooks/useFetch";
import { FaRegTrashAlt } from "react-icons/fa";


interface GifListProps {
  category: string;
  onRemoveCategory: (category: string) => void;
}

export default function GifList({ category, onRemoveCategory }: GifListProps) {
  const { gifs, isLoading } = useFetch(category);

  return (
    <section>
      <header className='flex items-center gap-4 mb-5'>
        <h2 className='text-2xl underline font-semibold'>
          {category}
        </h2>
        <button
          onClick={() => onRemoveCategory(category)}
          className='p-2 rounded bg-white/90 hover:text-blue-500'
        >
          <FaRegTrashAlt className="text-2xl" />
        </button>
      </header>
      {isLoading && <p>Cargando...</p>}
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-start'>
        {gifs &&
          gifs.map((gif) => (
            <GifCard key={gif.id} title={gif.title} url={gif.url} />
          ))}
      </div>
    </section>
  );
}
