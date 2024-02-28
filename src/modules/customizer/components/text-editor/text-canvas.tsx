import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
import useText from "@lib/hooks/use-fabric-text";
import { useCustomizer } from "@lib/context/customizer-context";

export function TextCanvas() {
  const {
    textSettings: settings,
    updateTextSettings: setSettings,
    setFontSettings: setFont,
    deleteText,
    current,
  } = useCustomizer()
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fCanvas = useRef<fabric.Canvas | null>(null);

  useText(fCanvas.current);


  const reset = () => {
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
  }


  useEffect(() => {
    if (canvasRef.current && !fCanvas.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        selection: true,
        hoverCursor: 'pointer',
        selectionBorderColor: 'green',
        height: 130,
        width: 300,
      });
      fCanvas.current = canvas;
    }
  }, [canvasRef]);


  return <div className="relative w-full h-[140px] -mt-2">
    <div className="h-[130px] bg-gray-300 small:w-[320px] shadow-sm rounded">
      <button onClick={reset} className="w-20 z-50 absolute right-0 block ml-auto bg-black hover:bg-white hover:border hover:text-black h-8 m-1 rounded-xl font-medium text-xs">Reset</button>
      {<canvas
        id="text-canvas"
        ref={canvasRef} />}
    </div>
  </div>

}