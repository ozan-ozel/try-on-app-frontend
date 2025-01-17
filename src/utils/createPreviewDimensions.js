const createPreviewDimensions = ({ maxWidth, maxHeight, originalWidth, originalHeight }) => {
  console.log({ maxWidth, maxHeight, originalWidth, originalHeight });  

  const aspectRatio = originalWidth / originalHeight;

  // If the image is within constraints, return original dimensions
  if (originalWidth <= maxWidth && originalHeight <= maxHeight) {
    return { width: originalWidth, height: originalHeight };
  }

  let newWidth, newHeight;

  // Scale based on the aspect ratio
  if (aspectRatio > 1) {
    // Landscape orientation
    newWidth = maxWidth;
    newHeight = Math.min(maxHeight, newWidth / aspectRatio);
  } else {
    // Portrait or square orientation
    newHeight = maxHeight;
    newWidth = Math.min(maxWidth, newHeight * aspectRatio);
  }

  return { width: Math.round(newWidth), height: Math.round(newHeight) };
};

export default createPreviewDimensions;
