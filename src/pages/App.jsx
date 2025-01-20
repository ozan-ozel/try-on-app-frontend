import React, { useContext, useEffect, useState } from "react";

import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Carousel } from "@trendyol-js/react-carousel";

import CustomImageZoom from "../components/CustomImageZoom";
import FileUpload from "../components/FileUpload";
import ImageSelect from "../components/ImageSelect";
import ImageStepper from "../components/ImageStepper";
import { ImageStepperContext } from "../components/ImageStepperWrapper";
import AuthDialog from "../components/PassCodePromptDialog";
import PassCodePromptDialog from "../components/PassCodePromptDialog";
import useCustomDropzone from "../hooks/useCustomDropzone";
import { authenticate } from "../services/AuthService";
import { executeTryOn } from "../services/TryOnService";
import createPreviewDimensions from "../utils/createPreviewDimensions";

import RefreshIcon from '@mui/icons-material/Refresh';

export default function App() {
  const { activeStep, selectedModel, setSelectedModel, action, setAction } =
    useContext(ImageStepperContext);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState();
  const [result, setResult] = useState();
  const [resultDimension, setResultDimension] = useState();
  const [authorized, setAuthorized] = useState(false);

  const validator = (file) => {
    if (["image/png", "image/jpeg", "image/jpg", "image/webp"].indexOf(file.type) === -1) {
      return {
        code: "wrong format",
        message: `Only *.jpeg, *.jpg, *.webp and *.png images will be accepted`,
      };
    }

    if (file.size > 5 * 1000 * 1000) {
      return {
        code: "size-too-large",
        message: `Size is larger than 5 MB `,
      };
    }

    return null;
  };

  const modelImageDropZone = useCustomDropzone({
    maxFiles: 1,
    validator,
    maxWidth: 320,
    maxHeight: 400,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg", ".webp"],
    },
  });

  const garmentImageLinks = [
    "https://tz8yal1szp.ufs.sh/f/pCC8PBM0JDCqpKohhIM0JDCqj1rz6dbuo3ykGfXLEFHNgsIa",
    "https://tz8yal1szp.ufs.sh/f/pCC8PBM0JDCq50u0R3PDe84XlzVjU2H1c7fAJwv0MdEukiyZ",
    "https://utfs.io/f/pCC8PBM0JDCqWTwzghWVQUsSvL3ZncjrXthlwH1ekY8dRCOT",
    "https://utfs.io/f/pCC8PBM0JDCqfsNCYhRMeJsjLFKrBhHiONSg369lVzTxWQum",
  ];

  const onSelect = (step) => {
    if (selectedModel === step) {
      setSelectedModel(null);
      return;
    }

    setSelectedModel(step);
  };

  const execute = async () => {
    return await executeTryOn(modelImageDropZone.files[0], garmentImageLinks[selectedModel]);
  };

  const onAuthSubmit = async (passcode) => {
    try {
      const response = await authenticate(passcode);
  
      if (response?.accessToken) {
        localStorage.setItem("try-on-app:accessToken", response.accessToken);
        
        setAuthorized(true);
  
        return;
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("try-on-app:accessToken");

    if (accessToken) {
      setAuthorized(true);
      return;
    }

    setAuthorized(false);
  }, []);

  useEffect(() => {
    if (action?.type === "TRY-ON") {
      setLoading(true);
      execute()
        .then((response) => {
          console.log(response);
          setResult(response?.data?.images?.[0]);
          setResultDimension(
            createPreviewDimensions({
              maxWidth: window.innerWidth * 0.6,
              maxHeight: window.innerHeight * 0.7,
              originalWidth: response?.data?.images?.[0].width,
              originalHeight: response?.data?.images?.[0].height,
            })
          );
        })
        .finally(() => {
          setLoading(false);
          setAction("COMPLETE");
        });
    }
  }, [action]);

  return (
    <>
      <Button
        variant="text"
        startIcon={<RefreshIcon />}
        sx={{
          textTransform: "none",
          mt: 1,
          ml: 2
        }}
        onClick={() => {
          window.location.reload();
          localStorage.removeItem("try-on-app:accessToken");
          setAuthorized(false);
        }}
      >
        Clear Session
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", // Change direction based on screen size
          margin: "0px 16px 16px 16px",
          padding: "0px",
        }}
      >
        <Grid container sx={{ mt: 1, mr: 3, mb: 2 }} spacing={2}>
          <Grid
            item
            {...isMobile ? { xs: 12 }: {}}
            sx={isMobile ? { display: "flex", justifyContent: "center" } : {}}
          >
            <Card variant="outlined" sx={{ mb: 2, width: "320px", borderRadius: "1rem" }}>
              <CardHeader
                title={
                  <Typography textAlign="center" fontSize="18px">
                    Upload Your Image
                  </Typography>
                }
              />
              <CardContent>
                <FileUpload disabled={loading} fileDropZone={modelImageDropZone} />
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            {...isMobile ? { xs: 12 }: {}}
            sx={isMobile ? { display: "flex", justifyContent: "center" } : {}}
          >
            <ImageStepper steps={garmentImageLinks}>
              <ImageSelect
                imageUrl={garmentImageLinks[activeStep]}
                selected={selectedModel === activeStep}
                onSelect={onSelect}
              />
            </ImageStepper>
          </Grid>
          {result && (
            <Grid
              item
              {...isMobile ? { xs: 12 }: {}}
              sx={isMobile ? { display: "flex", justifyContent: "center" } : {}}
            >
              <Card variant="outlined" sx={{ width: "320px", borderRadius: "1rem" }}>
                <CardHeader
                  title={
                    <Typography textAlign="center" fontSize="18px">
                      Result Image
                    </Typography>
                  }
                />
                <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    style={{
                      borderRadius: "1rem",
                      width: resultDimension.width,
                      height: resultDimension.height,
                    }}
                    src={result.url}
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={loading}
        >
          <CircularProgress color="inherit" />
          <Typography>&nbsp;&nbsp;Please wait, this might take a while...</Typography>
        </Backdrop>
      )}
      {!authorized && <PassCodePromptDialog open={!authorized} onSubmit={onAuthSubmit} />}
    </>
  );
}
