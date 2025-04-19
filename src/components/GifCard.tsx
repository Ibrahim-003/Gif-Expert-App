import { useState } from "react";
import { Gif } from "../hooks/useFetch";
import { FaWhatsapp } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";

interface GifCardProps {
  gif: Gif;
}

export default function GifCard({ gif }: GifCardProps) {
  const [shareStatus, setShareStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Comprobar si el navegador soporta la API de Web Share
  const isWebShareSupported = () => {
    return navigator.canShare;
  };

  const shareOnWhatsApp = () => {
    const message = `Mira este Gif: ${gif.title}`;
    const encodeUrl = encodeURIComponent(gif.url);
    const textToShare = encodeURIComponent(message) + "%20" + encodeUrl;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${textToShare}`;

    window.open(whatsappUrl, "_blank");
  };

  const shareGif = async () => {
    if (!isWebShareSupported()) {
      shareOnWhatsApp();
      return;
    }

    try {
      setIsLoading(true);
      setShareStatus("Preparando gif...");

      //Descargar el gif
      const response = await fetch(gif.url);

      if (!response.ok) throw new Error("No se pudo descargar el gif");

      //Convertir la respuesta a un blob
      const gifBlob = await response.blob();

      //Crear un objeto File desde el blob
      const gifFile = new File(
        [gifBlob],
        `${gif.title.replace(/\s+/g, "-")}.gif`,
        {
          type: gifBlob.type,
        }
      );

      //Verificar si se puede compartir el archivo
      if (!navigator.canShare({ files: [gifFile] })) {
        throw new Error(
          "Tu navegador no permite compartir este tipo de archivo"
        );
      }

      //Configurar datos a compartir
      const shareData = {
        title: gif.title,
        text: "Mira este gif",
        files: [gifFile],
      };

      //Compartir usando la API nativa
      await navigator.share(shareData);
      setShareStatus("¡Compartido con éxito!");

      // Limpiar el mensaje después de un tiempo
      setTimeout(() => setShareStatus(""), 4000);
    } catch (error) {
      console.error("Error al compartir:", error);
      if (error instanceof Error) {
        setShareStatus(`Error: ${error.message}`);
      } else {
        setShareStatus("Error al compartir el gif");
      }

      // Limpiar el mensaje de error después de un tiempo
      setTimeout(() => setShareStatus(""), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <figure className='w-full max-w-[350px] bg-white rounded-b overflow-hidden shadow'>
        <img src={gif.url} alt={gif.title} className='w-full object-cover' />
        <figcaption className='relative py-5 px-2 text-base text-background text-center font-medium'>
          {gif.title}
          <button
            onClick={shareGif}
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
          className={`py-1 text-sm text-right ${shareStatus.includes("error") && "text-error"} ${shareStatus.includes(
            "éxito"
          ) ? "text-success" : "text-warning"}`}
        >
          {shareStatus}
        </p>
      )}
    </>
  );
}
