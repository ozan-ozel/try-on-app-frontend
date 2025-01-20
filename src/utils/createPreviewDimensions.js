const createPreviewDimensions = ({ maxWidth, maxHeight, originalWidth, originalHeight }) => {
  console.log({ maxWidth, maxHeight, originalWidth, originalHeight });

  const aspectRatio = originalWidth / originalHeight;

  // If the image is within constraints, return original dimensions
  if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
    return { width: originalWidth, height: originalHeight };
  }

  let newWidth, newHeight;

  // Portrait or square orientation
  newWidth = maxWidth;
  newHeight = (1 / aspectRatio) * newWidth;

  return { width: Math.round(newWidth), height: Math.round(newHeight) };
};

export default createPreviewDimensions;
