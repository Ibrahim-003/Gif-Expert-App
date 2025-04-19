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
    <div className='w-full mb-10'>
      <form onSubmit={handleSubmit}>
        <div className='relative w-full max-w-[600px] mx-auto '>
          <input
            type='text'
            name='search'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            id='search'
            placeholder='Search Gif'
            className='w-full px-3 py-2 outline-none border-2 border-stone-800 rounded-md focus:border-blue-400'
          />
          <button className='absolute right-[2px] top-[2px] hover:bg-white hover:text-blue-500 p-1 rounded-r inline-flex items-center justify-center' type="submit">
            <IoMdSearch className='text-3xl' />
          </button>
        </div>
      </form>
    </div>
  );
}
