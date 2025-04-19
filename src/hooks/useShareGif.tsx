import { useState } from "react";

export const useShareGif = () => {
  const [shareStatus, setShareStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Comprobar si el navegador soporta la API de Web Share
  const isWebShareSupported = () => {
    return navigator.canShare;
  };

  const shareOnWhatsApp = (url: string, title: string) => {
    const message = `Mira este Gif: ${title}`;
    const encodeUrl = encodeURIComponent(url);
    const textToShare = encodeURIComponent(message) + "%20" + encodeUrl;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${textToShare}`;

    window.open(whatsappUrl, "_blank");
  };

  const shareGif = async (url: string, title: string) => {
    if (!isWebShareSupported()) {
      shareOnWhatsApp(url, title);
      return;
    }

    try {
      setIsLoading(true);
      setShareStatus("Preparando gif...");

      //Descargar el gif
      const response = await fetch(url);

      if (!response.ok) throw new Error("No se pudo descargar el gif");

      //Convertir la respuesta a un blob
      const gifBlob = await response.blob();

      //Crear un objeto File desde el blob
      const gifFile = new File([gifBlob], `${title.replace(/\s+/g, "-")}.gif`, {
        type: gifBlob.type,
      });

      //Verificar si se puede compartir el archivo
      if (!navigator.canShare({ files: [gifFile] })) {
        throw new Error(
          "Tu navegador no permite compartir este tipo de archivo"
        );
      }

      //Configurar datos a compartir
      const shareData = {
        title: title,
        text: "Mira este gif",
        files: [gifFile],
      };

      //Compartir usando la API nativa
      await navigator.share(shareData);
      setShareStatus("¡Compartido con éxito!");

      // Limpiar el mensaje después de un tiempo
      setTimeout(() => setShareStatus(""), 3000);
    } catch (error) {
      console.error("Error al compartir:", error);
      if (error instanceof Error) {
        setShareStatus(`Error: ${error.message}`);
      } else {
        setShareStatus("Error al compartir el gif");
      }

      // Limpiar el mensaje de error después de un tiempo
      setTimeout(() => setShareStatus(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return { shareGif, shareStatus, isLoading };
};
