import { Gif } from "../hooks/useFetch";
import { FaWhatsapp } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";
import { useShareGif } from "../hooks/useShareGif";

interface GifCardProps {
  gif: Gif;
}

export default function GifCard({ gif }: GifCardProps) {
  const { shareGif, shareStatus, isLoading } = useShareGif();

  const handleShare = () => {
    shareGif(gif.url, gif.title);
  };

  return (
    <>
      <figure className='w-full max-w-[350px] bg-white rounded-b overflow-hidden shadow'>
        <img src={gif.url} alt={gif.title} className='w-full object-cover' />
        <figcaption className='relative py-5 px-2 text-base text-background text-center font-medium'>
          {gif.title}
          <button
            onClick={handleShare}
            className='absolute bottom-0 right-0 rounded-tl p-1 bg-green-600 hover:bg-green-700'
            aria-label='Compartir en WhatsApp'
          >
            {isLoading ? (
              <TbRefresh className='text-3xl text-white' />
            ) : (
              <FaWhatsapp className='text-3xl text-white' />
            )}
          </button>
        </figcaption>
      </figure>
      {shareStatus && (
        <p
          className={`py-1 text-sm text-right ${
            shareStatus.includes("error") && "text-error"
          } ${shareStatus.includes("éxito") ? "text-success" : "text-warning"}`}
        >
          {shareStatus}
        </p>
      )}
    </>
  );
}
