import * as React from "react";

import { Grid, useMediaQuery } from "@mui/material";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

import { ImageStepperContext } from "./ImageStepperWrapper";

export default function ImageStepper({ steps, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { activeStep, setActiveStep, selectedModel, setSelectedModel, action, setAction } =
    React.useContext(ImageStepperContext);

  React.useEffect(() => {
    if (action?.type === "NEXT-COMPLETE" || action?.type === "PREV-COMPLETE") {
      setAction("COMPLETE");
    }
  }, [action]);

  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item xs={12} sx={isMobile ? { display: "flex", justifyContent: "center" } : {}}>
        {children}
      </Grid>
      <Grid item xs={12} sx={isMobile ? { display: "flex", justifyContent: "center" } : {}}>
        <MobileStepper
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 320, flexGrow: 1 }}
          nextButton={
            <Button
              size="small"
              onClick={() => setAction({ type: "NEXT-INIT" })}
              disabled={
                activeStep === steps.length - 1 ||
                ["NEXT-INIT", "PREV-INIT"].includes(action?.type) ||
                ![null, undefined].includes(selectedModel)
              }
              sx={{ textTransform: "none" }}
            >
              Next
              {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={() => setAction({ type: "PREV-INIT" })}
              disabled={
                activeStep === 0 ||
                ["NEXT-INIT", "PREV-INIT"].includes(action?.type) ||
                selectedModel
              }
              sx={{ textTransform: "none" }}
            >
              {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </Grid>

      <Grid item xs={12} sx={isMobile ? { display: "flex", justifyContent: "center" } : {}}>
        <Button
          variant="outlined"
          onClick={() => setSelectedModel(null)}
          style={{ width: "320px", textTransform: "none" }}
          disabled={[null, undefined].includes(selectedModel)}
        >
          Reset Selection
        </Button>
      </Grid>
      <Grid item xs={12} sx={isMobile ? { display: "flex", justifyContent: "center" } : {}}>
        <Button
          variant="contained"
          onClick={() => {
            setAction({ type: "TRY-ON" });
          }}
          style={{ width: "320px", marginBottom: "16px", textTransform: "none" }}
          disabled={[null, undefined].includes(selectedModel)}
        >
          Execute Try On!
        </Button>
      </Grid>
    </Grid>
  );
}
