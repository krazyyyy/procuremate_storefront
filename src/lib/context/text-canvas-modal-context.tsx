import React, { createContext, useContext } from "react"
import useToggleState from "../hooks/use-toggle-state"

interface TextCanvasContext {
  visible: boolean,
  closeModal: () => void,
  openModal: () => void,
}

const TextCanvasContext = createContext<TextCanvasContext | null>(null)

export const TextCanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const { state: visible, open: openModal, close: closeModal, toggle } = useToggleState(false);


  return (
    <TextCanvasContext.Provider
      value={{
        visible,
        openModal,
        closeModal,
      }}>
      {children}
    </TextCanvasContext.Provider>
  )
}

export const useTextCanvas = () => {
  const context = useContext(TextCanvasContext)
  if (context === null) {
    throw new Error("useTextCanvas must be used within a TextCanvasProvider")
  }
  return context
}
