import React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function FileUpload({
  fileDropZone,
  label,
  explanation,
  error,
  imageUrl,
  disabled,
  previewDimensions,
}) {
  const { files } = fileDropZone;

  const handleFileOpen = (e) => {
    e.stopPropagation();

    console.log("fileDropZone", fileDropZone);

    fileDropZone.open();
  };

  return (
    <Box>
      <Stack>
        <Typography variant="h6" style={{ borderLeft: "5px solid #83a8ff", paddingLeft: "0.5rem" }}>
          {label}
        </Typography>

        <Box
          {...fileDropZone.getRootProps({ className: "dropzone" })}
          sx={{
            border: `3px dotted ${error ? "#FFA0B3" : "#b9bfcb"}`,
            marginTop: "0rem",
            padding: "1rem",
            borderRadius: "1rem",
          }}
        >
          <input {...fileDropZone.getInputProps({})} disabled={true} />

          <Stack direction="row" justifyContent="center" gap={2}>
            <Stack>
              {/* <Typography variant="body1">
                Dosyayı sürükleyip bırakın yada
                <Button variant="text" color="primary" onClick={handleFileOpen}>
                  dosya seçiniz
                </Button>
              </Typography> */}
              <Typography variant="caption">{explanation}</Typography>
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "none" }}
                onClick={handleFileOpen}
              >
                Click to select or drop a file
              </Button>

              {error && (
                <Alert severity="error" sx={{ marginTop: "1rem" }}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    Bu alan zorunludur
                  </Typography>
                </Alert>
              )}

              {fileDropZone.errors && (
                <Stack sx={{ position: "relative" }}>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    sx={{
                      backgroundColor: "whitesmoke",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                    }}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileDropZone.setForms("");
                      fileDropZone.setFiles([]);
                      fileDropZone.setErrors();
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                  <Alert severity="error">
                    <Typography sx={{ fontWeight: 700 }}>{fileDropZone.errors}</Typography>
                  </Alert>
                </Stack>
              )}
              {fileDropZone.forms && !fileDropZone.errors && (
                <Stack sx={{ position: "relative" }}>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    sx={{
                      backgroundColor: "whitesmoke",
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                    }}
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileDropZone.setForms("");
                      fileDropZone.setFiles([]);
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>
                  <Alert severity="success" sx={{ marginTop: "1rem" }}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      {fileDropZone.forms?.name}
                    </Typography>
                  </Alert>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {files?.[0] && fileDropZone.previewDimensions && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ borderRadius: "1rem", marginTop: "1rem" }}
            src={URL.createObjectURL(files?.[0])}
            loading="lazy"
            {...fileDropZone.previewDimensions}
          />
        </div>
      )}

      {/* {files?.[0] && fileDropZone.previewDimensions && (
        <CustomImageZoom imageUrl={URL.createObjectURL(files?.[0])} previewDimensions={fileDropZone.previewDimensions} />
      )} */}
    </Box>
  );
}
