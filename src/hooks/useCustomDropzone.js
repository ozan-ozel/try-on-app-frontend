import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const useCustomDropzone = ({ maxFiles, validator, width, height, maxHeight, maxWidth, accept }) => {
  const [files, setFiles] = useState([]);
  const [forms, setForms] = useState("");
  const [base64, setBase64] = useState("");
  const [errors, setErrors] = useState("");
  const [preview, setPreview] = useState("");
  const [previewDimensions, setPreviewDimensions] = useState({});
  const [handleDisable, setHandleDisable] = useState(false);

  const createPreviewDimensions = (originalWidth, originalHeight) => {
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

  const { getRootProps, open, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept,
    maxFiles,
    validator,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length) {
        setErrors(fileRejections[0].errors[0].message);
        return;
      }

      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      setForms(file);

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];

        setBase64(base64String);

        const img = new Image();

        img.src = reader.result;
        img.onload = () => {
          // if (img.width > maxWidth || img.height > maxHeight) {
          //   setErrors(`Çözünürlük ${maxWidth}x${maxHeight} piksel değerlerinden küçük olmalıdır`);
          //   setFiles([]);
          //   setForms("");
          //   return;
          // }

          // if (width && height && !(img.width === width && img.height === height)) {
          //   setErrors(`Çözünürlük ${width}x${height} piksel değerlerine sahip olmalıdır`);

          //   setFiles([]);
          //   setForms("");
          //   return;
          // }

          setErrors("");
          setFiles(acceptedFiles);

          setPreviewDimensions(createPreviewDimensions(img.width, img.height));

          setPreview(URL.createObjectURL(acceptedFiles[0]));
        };
      };
    },
    onFileDialogOpen: () => {
      setFiles([]);
      setForms("");
    },
  });

  const reset = () => {
    setFiles([]);
    setForms("");
    setErrors("");
  };

  return {
    files,
    setFiles,
    getRootProps,
    open,
    getInputProps,
    forms,
    setForms,
    acceptedFiles,
    fileRejections,
    errors,
    setErrors,
    base64,
    reset,
    preview,
    setHandleDisable,
    previewDimensions
  };
};
export default useCustomDropzone;
