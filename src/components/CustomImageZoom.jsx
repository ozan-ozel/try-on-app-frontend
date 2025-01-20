import React, { Fragment, useState } from "react";

import { Dialog, DialogContent } from "@mui/material";

export default function CustomImageZoom({ imageUrl, previewDimensions }) {
  const [open, setOpen] = useState();

  return (
    <Fragment>
      <img
        style={{ width: "55px", cursor: "pointer", ...previewDimensions }}
        src={imageUrl}
        loading="lazy"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      />
      {open && (
        <Dialog
          className="zoom-image-modal"
          open={open}
          maxWidth="lg"
          onClose={() => setOpen(false)}
          fullScreen
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        >
          <DialogContent 
            sx={{ justifyContent: "center" }}
          >
            <img 
              style={{
                maxWidth: "80vw",
                maxHeight: "80vh",
                objectFit: "contain"
              }}
              src={imageUrl} 
              loading="lazy" />
          </DialogContent>
        </Dialog>
      )}
    </Fragment>
  );
}
