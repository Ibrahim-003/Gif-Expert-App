import { IoMdSearch } from "react-icons/io";
import { FormEvent, useState } from "react";

interface GifSearchProp {
  onNewCategory: (newCategory: string) => void;
}

export default function GifSearch({ onNewCategory }: GifSearchProp) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (inputValue.trim().length < 2) return;

    onNewCategory(inputValue);
    setInputValue("");
  };

  return (
    <section className='w-full mb-10' aria-label="Buscador de GIFs">
      <form onSubmit={handleSubmit}>
        <div className='relative w-full max-w-[600px] mx-auto '>
            <label htmlFor="search" className="sr-only">Buscador GIF</label>
          <input
            type='text'
            id='search'
            name='search'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Search Gif'
            autoComplete="off"
            className='w-full px-3 py-2 outline-none border-2 border-primary rounded-md focus:border-secondary'
          />
          <button className='absolute right-[2px] top-[2px] hover:text-secondary p-1 rounded-r inline-flex items-center justify-center' aria-label="Buscar" type="submit">
            <IoMdSearch className='text-3xl' />
          </button>
        </div>
      </form>
    </section>
  );
}
