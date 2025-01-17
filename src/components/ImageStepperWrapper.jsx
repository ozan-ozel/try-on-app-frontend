import React from "react";

export const ImageStepperContext = React.createContext();

export default function ImageStepperWrapper({ children }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [action, setAction] = React.useState(null);
  const [selectedModel, setSelectedModel] = React.useState();
  const modelWidth = 340;
  const modelHeight = 450;

  return (
    <ImageStepperContext.Provider
      value={{
        activeStep,
        setActiveStep,
        action,
        setAction,
        selectedModel,
        setSelectedModel,
        modelWidth,
        modelHeight,
      }}
    >
      {children}
    </ImageStepperContext.Provider>
  );
}
