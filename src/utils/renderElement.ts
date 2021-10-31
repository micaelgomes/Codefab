export const renderHTMLImageElement = (imageSrc: string) => {
  const image = new window.Image();
  image.src = imageSrc;

  return image;
};
