import React, { useContext, useEffect, useState } from "react";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import createPreviewDimensions from "../utils/createPreviewDimensions";
import { ImageStepperContext } from "./ImageStepperWrapper";

export default function ImageSelect({ imageUrl, onSelect }) {
  const { action, setAction, selectedModel, activeStep, setActiveStep, modelWidth, modelHeight } =
    useContext(ImageStepperContext);

  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const getImageDimensions = (imageUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imageUrl;

      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };

      img.onerror = (error) => {
        reject(new Error("Failed to load image"));
      };
    });
  };

  useEffect(() => {
    if (!action?.type && imageUrl) {
      getImageDimensions(imageUrl).then(({ width, height }) => {
        const { width: newWidth, height: newHeight } = createPreviewDimensions({
          maxHeight: modelHeight - 100,
          maxWidth: modelWidth - 40,
          originalWidth: width,
          originalHeight: height,
        });

        setWidth(newWidth);
        setHeight(newHeight);
      });
    }

    if (action?.type === "NEXT-INIT" && imageUrl) {
      getImageDimensions(imageUrl).then(({ width, height }) => {
        setTimeout(() => {
          const { width: newWidth, height: newHeight } = createPreviewDimensions({
            maxHeight: modelHeight,
            maxWidth: modelWidth,
            originalWidth: width,
            originalHeight: height,
          });

          setWidth(newWidth);
          setHeight(newHeight);

          setActiveStep((prev) => prev + 1);
          setAction("NEXT-COMPLETE");
        }, 500);
      });
    }

    if (action?.type === "PREV-INIT" && imageUrl) {
      setTimeout(() => {
        getImageDimensions(imageUrl).then(({ width, height }) => {
          const { width: newWidth, height: newHeight } = createPreviewDimensions({
            maxHeight: modelHeight - 20,
            maxWidth: modelWidth - 20,
            originalWidth: width,
            originalHeight: height,
          });

          setWidth(newWidth);
          setHeight(newHeight);

          setActiveStep((prev) => prev - 1);
          setAction("PREV-COMPLETE");
        });
      }, 500);
    }
  }, [action, imageUrl]);

  return (
    <>
      <Card
        variant="outlined"
        sx={(theme) => ({
          width: modelWidth - 20,
          height: modelHeight,
          mb: 2,
          borderRadius: "1rem",
          backgroundColor: selectedModel === activeStep ? theme.palette.grey[100] : "inherit",
          cursor: "pointer",
        })}
        onClick={() => onSelect(activeStep)}
      >
        <CardHeader
          title={
            <Typography textAlign="center" fontSize="18px">
              Choose Model
            </Typography>
          }
        />
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          {(action && action?.type === "NEXT-INIT") || action?.type === "PREV-INIT" ? (
            <Skeleton
              variant="rectangular"
              width={modelWidth - 80}
              height={modelHeight - 80}
              sx={{ borderRadius: "1rem" }}
            />
          ) : (
            <img
              style={{ borderRadius: "1rem" }}
              src={imageUrl}
              loading="lazy"
              width={width}
              height={height}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
