import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useCustomizer } from '../context/customizer-context';
import { MaterialColor } from 'types/ffg';

type UseFabricColorProps = {
  canvas: fabric.Canvas | null;
  color: MaterialColor | undefined,
  render: () => void,
  stopLoading: () => void,
};

const useFabricColor = ({ canvas, color, render, stopLoading }: UseFabricColorProps) => {
  const { addChange, currentLayer, currency } = useCustomizer();

  useEffect(() => {
    if (color?.code) {
      updateColors(color.group ?? '', color.code, true);
      saveLayerUpdate(color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color?.code, color?.group])

  const saveLayerUpdate = (color: MaterialColor) => {
    const changedLayer = {
      id: color.group!,
      image_url: color.code,
      name: color.name,
      layer_name: color.layerName,
      price: color.price,
      area_size: currentLayer?.customizer_area_id,
      currency: currency!,
    }
    addChange(changedLayer)
  }

  const updateColors = async (text: string, color: string, shouldRender = false) => {
    if (!canvas) return;
    var fill;
    if (color.includes('linear')) {
      fill = cssGradientToFabricGradient(color ?? 'black');
    } else if (color.startsWith('http') || color.startsWith('url')) {
      try {
        fill = await createPatternFromUrl(color);
      } catch (error) {
        console.error('Failed to create pattern from URL:', error);
        return;
      }
    } else {
      fill = color;
    }

    var { backgroundImage } = canvas as any;
    try {
      var objects = backgroundImage?.getObjects();
      for (var index in objects) {
        var obj = objects[index];
        if (obj?.id?.toLowerCase() === text?.toLowerCase() || obj?.name?.toLowerCase() === text.toLowerCase()) {
          obj.set({ fill });
        }
      }
      canvas?.renderAll()
      if (shouldRender) render();
    } catch (error) {
      stopLoading()
      console.info('not an svg ', error)
    }
  }



  return {
    updateColors,
  };
};

export default useFabricColor;

export const createPatternFromUrl = async (url: string): Promise<fabric.Pattern> => {
  return new Promise((resolve, reject) => {
    // Download the image from the URL
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to download image from ${url}`);
        }
        return response.blob();
      })
      .then((blob) => {
        // Convert the image to a base64 encoded data URL
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          // Pass the base64 encoded data URL to fabric.Image.fromURL
          fabric.Image.fromURL(dataUrl, (img: fabric.Image) => {
            img.width = 10000
            img.height = 10000
            var image = img.getElement() as HTMLImageElement;
            const pattern = new fabric.Pattern({
              source: image,
              repeat: 'no-repeat',
              offsetX: 0, // Adjust the X-axis offset to 0
              offsetY: 0, // Adjust the Y-axis offset to 0
            });

            resolve(pattern);
          });
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error('Failed to create pattern from URL:', error);
        reject(error);
      });
  });
};

export function cssGradientToFabricGradient(cssGradient: string): fabric.Gradient | fabric.Color | null {
  const hexColorRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  const namedColorRegex = /^(?:(?:rgb|hsl)a?\([^)]*\))|(?:[a-z]+)$/;

  if (hexColorRegex.test(cssGradient)) {
    return new fabric.Color(cssGradient);
  }

  if (namedColorRegex.test(cssGradient)) {
    return new fabric.Color(cssGradient);
  }

  const match = cssGradient.match(/^linear-gradient\((.*)\)$/);
  if (!match) {
    return null;
  }

  const [direction, ...colorStops] = match[1]?.split(',');
  const [startColor, endColor] = colorStops.map((colorStop) => colorStop.trim());

  const gradient = new fabric.Gradient({
    type: 'linear',
    coords: {
      x1: direction.includes('right') ? 0 : 1,
      y1: direction.includes('bottom') ? 0 : 1,
      x2: direction.includes('left') ? 0 : 1,
      y2: direction.includes('top') ? 0 : 1,
    },
    colorStops: [
      { offset: 0, color: startColor },
      { offset: 1, color: endColor },
    ],
  });

  return gradient;
}
