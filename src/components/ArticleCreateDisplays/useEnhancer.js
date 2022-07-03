import { useRef } from 'react';

const useEnhancer = () => {
  const canv = useRef(null);
  const canv2 = useRef(null);
  const img = useRef(null);
  const img2 = useRef(null);

  const downloadImage = (
    canvas,
    image,
    id,
  ) => {
    if (canvas.current !== null) {
      const currentCnavas = canvas.current;
      const ctx = currentCnavas.getContext('2d');
      if (ctx && image.current !== null) {
        const currentImage = image.current;
        currentCnavas.width = currentImage.width;
        currentCnavas.height = currentImage.height;
        ctx.drawImage(currentImage, 0, 0, currentImage.width, currentImage.height);
      }
      const anchor = document.createElement('a');
      currentCnavas.toBlob((blob) => {
        if (anchor !== null && blob) {
          anchor.href = window.URL.createObjectURL(blob);
          anchor.download = `${id}.png`;
          anchor.click();
        }
      });
    }
  };

  return {
    downloadImage,
    canv,
    canv2,
    img,
    img2,
  };
};

export default useEnhancer;