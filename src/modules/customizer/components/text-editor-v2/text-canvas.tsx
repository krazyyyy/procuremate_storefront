import React, { useEffect, useRef } from "react";
import { fabric } from "fabric";
import useText from "@lib/hooks/use-fabric-text";
import { useCustomizer } from "@lib/context/customizer-context";
import { useTextCanvas } from "@lib/context/text-canvas-modal-context";

export function TextCanvas() {
  const {
    deleteText,
    setFontSettings: setFont,
    textSettings: settings,
    updateTextSettings: setSettings,
  } = useCustomizer()
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fCanvas = useRef<fabric.Canvas | null>(null);
  useText(fCanvas.current);
  const { closeModal, openModal } = useTextCanvas()

  const reset = () => {
    closeModal();
    var canvas = fCanvas.current;
    if (!canvas) return;
    canvas.clear(); // Clear all objects from the canvas
    canvas.setBackgroundImage('', canvas.renderAll.bind(canvas)); // Clear the background image, if any
    canvas.setViewportTransform([1, 0, 0, 1, 0, 0]); // Reset the zoom and pan
    canvas?.renderAll(); // redraw the canvas
    setFont({ text: '', shadow: false, fontFamily: 'Azonix' })
    setSettings({
      ...settings,
      text: '',
      crystal_color: undefined,
      crystal: false,
      patch: false,
      itext: null,
      finish: undefined,
      addText: false,
      outline: false, outline_color: undefined,
      patch_color: undefined, price: 0,
      shadow: false,
    })
    setTimeout(() => {
      openModal();
    }, 200)
  }


  useEffect(() => {
    if (canvasRef.current && !fCanvas.current) {
      const { clientHeight, clientWidth } = canvasRef.current;
      const canvas = new fabric.Canvas(canvasRef.current, {
        selection: true,
        hoverCursor: 'pointer',
        selectionBorderColor: 'green',
        height: clientHeight,
        width: clientWidth,
      });
      fCanvas.current = canvas;
    }
  }, [canvasRef]);


  return <div className="relative">
    <div className=" bg-gray-300 shadow-sm rounded">
      <button onClick={reset} className="w-20 z-50 absolute right-0 block ml-auto hover:bg-white hover:border hover:text-black h-8 m-1 rounded-xl font-medium text-xs">Reset</button>
      {<canvas
        id="text-canvas"
        className="w-full h-full"
        ref={canvasRef} />}
    </div>
  </div>
}