import { useMediaQuery } from "@mui/material";
import React from "react";

export const LayoutContext = React.createContext();

export default function LayoutWrapper({ children }) {
  const [layout, setLayout] = React.useState("default");

  const isMobile = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <LayoutContext.Provider
      value={{
        layout,
        setLayout,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}