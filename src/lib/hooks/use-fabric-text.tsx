import { useEffect, useMemo, useState } from 'react';
import { fabric } from 'fabric';
import { toTitleCase } from '../config';
import { createPatternFromUrl } from './use-fabric-colors';
import { useCustomizer } from '../context/customizer-context';
import { Material } from 'types/ffg';
import { throttle } from 'lodash';

const useText = (canvas: fabric.Canvas | null) => {
  const {
    addChange,
    current,
    textSettings,
    setFontSettings,
    setTextCanvas,
    getCurrencyRate,
    currency,
  } = useCustomizer()

  const { font } = current;
  const [itext, setIText] = useState<fabric.IText | null>(null);


  useEffect(() => {
    if (font.text !== null) {
      throttledOnTextChange(font.text)
    }
  }, [font, textSettings])

  useEffect(() => {
    if (canvas?.getActiveObject()) {
      var object = canvas?.getActiveObject();
      if (object) setIText(object as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas?._activeObject])


  useEffect(() => {
    if (itext) {
      setFontSettings({ ...font, text: itext?.text ?? '' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itext])

  const price = useMemo((): number => {
    var total = 0;
    const settings = { ...textSettings };
    if (settings.patch) {
      var patchPrice = Number(settings?.name_settings?.patch_price ?? 0) * font.text.length;
      total += patchPrice;
    }
    if (settings.crystal) {
      var crystalPrice = Number(settings?.name_settings?.crystal_price ?? 0) * font.text.length;
      total += crystalPrice;
    }
    if (settings.outline) {
      var outlinePrice = Number(settings?.name_settings?.crystal_price ?? 0) * font.text.length;
      total += outlinePrice;
    }
    return (total * getCurrencyRate());
  }, [textSettings, font, getCurrencyRate])

  const updateTextCase = (text: fabric.IText): fabric.IText => {
    switch (font.case) {
      case 1:
        text.set('text', text.text?.toUpperCase())
        return text;
      case 2:
        text.set('text', toTitleCase(text.text ?? ''))
        return text;
      case 3:
        text.set('text', text.text?.toLowerCase())
        return text;
    }
    return text;
  }


  const applyBevelEffect = (text: fabric.IText): fabric.Group => {
    const bevelMatrix = [
      1, 1, 1,
      1, 0.7, -1,
      -1, -1, -1,
    ];

    const bevelFilter = new fabric.Image.filters.Convolute({
      matrix: bevelMatrix,
    });

    const textAsImage = new fabric.Image(text.toCanvasElement(), {
      left: 20,
      top: 20,
      originX: 'left',
      originY: 'top',
    });

    textAsImage.filters?.push(bevelFilter);
    textAsImage.applyFilters();

    const group = new fabric.Group([textAsImage]);
    group.left = text.left;
    group.top = text.top;

    return group;
  };

  const add3DEffect = (text: fabric.IText): fabric.Object => {
    const color = text.fill as any;
    if (!color) return text;
    var bevel = applyBevelEffect(text);
    return bevel;
  };


  const getFillFromMaterial = async (color?: Material) => {
    if (!color) return '#000000'
    var fill: any;
    if (color?.image_url?.startsWith('http')) {
      try {
        fill = await createPatternFromUrl(color.image_url);
      } catch (error) {
        console.error('Failed to create pattern from URL:', error);
        return;
      }
    } else {
      fill = color?.hex_color;
    }
    return fill;
  }

  const addCrystal = (text: any, layer: fabric.Object, fill: fabric.Pattern): fabric.Object => {
    // Get the position, dimensions, and padding of the text
    let { left, top, width, height } = text.getBoundingRect();
    const padding = text.padding || 0;
    // Calculate the radius of the dots
    const radius = 1;

    // Calculate the number of dots based on the text width, height, and padding
    const dotCountX = Math.ceil((width + padding * 2) / (radius * 3));
    const dotCountY = Math.ceil((height + padding * 2) / (radius * 3));
    // Create a fabric.Rect to cover the text area
    const rect = new fabric.Rect({
      left: left,
      top: top,
      width: width,
      height: height,
      fill: fill,
      selectable: false,
      evented: false,
    });
    // Create an off-screen canvas to generate the crystal dots pattern
    const offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width = width + padding * 2;
    offScreenCanvas.height = height + padding * 2;

    // Draw dots on the off-screen canvas
    const ctx = offScreenCanvas.getContext('2d');
    const spacingX = 3;
    const spacingY = 3.1;
    for (let i = 0; i < dotCountX; i++) {
      for (let j = 0; j < dotCountY; j++) {
        const newLeft = i * spacingX + padding;
        const newTop = j * spacingY + padding;
        ctx?.fillRect(newLeft, newTop, radius, radius);
      }
    }

    // Convert the off-screen canvas to an image
    const dotImage = new Image();
    dotImage.src = offScreenCanvas.toDataURL();

    // Create a fabric.Pattern from the dotImage
    const pattern = new fabric.Pattern({
      source: dotImage,
      repeat: 'repeat'
    });
    rect.clipPath = text;
    rect.scaleToHeight(text.height!)
    rect.scaleToWidth(text.width!)
    rect.set('fill', pattern);


    // Create a fabric.Group to contain the text and the crystal dots rect
    const group = new fabric.Group([text, layer, rect,], {
      left: left,
      top: top,
      width: width,
      height: height,
    });
    return group;
  };

  const handleOutline = async (itext: fabric.IText): Promise<fabric.IText> => {
    var fill;
    if (textSettings.outline) {
      const { outline_color } = textSettings;
      fill = await getFillFromMaterial(outline_color);
      itext.set({
        ...(font as any),
        strokeWidth: textSettings.outline_width,
        stroke: fill,
      });
    } else {
      fill = 'transparent'; // Assign a default color when outline is false
      itext.set({
        ...(font as any),
        strokeWidth: 0,
        stroke: fill,
      });
    }
    return itext;
  };

  const applyFilters = async (): Promise<fabric.Object | undefined> => {
    if (!itext) return;
    var newText = await handleOutline(itext)
    newText = await handlePatch(itext)
    newText = updateTextCase(itext)
    newText = handle3DEffect(itext) as any;
    return newText;
  }

  const applyCrystal = async (text: fabric.Object) => {
    if (!textSettings.crystal) return text;
    var crystal = await handleCrystal(text);
    return crystal;
  }

  const centerTextOnCanvas = (text: fabric.IText) => {
    if (!canvas) return;

    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const textWidth = text.getScaledWidth();
    const textHeight = text.getScaledHeight();

    // Calculate the new left and top positions to center the text
    const newLeft = (canvasWidth - textWidth) / 2;
    const newTop = (canvasHeight - textHeight) / 2;

    // Set text top and left.
    text.set('left', newLeft);
    text.set('top', newTop);
    canvas.renderAll();
  };

  const cloneAndSave = async (newText: fabric.Object) => {
    if (!canvas) return;
    return new Promise((resolve, _) => {
      return canvas.clone((clonedCanvas: fabric.Canvas) => {
        // 3. Add the newText to the clone

        clonedCanvas.clear();
        newText.set('left', 0)
        newText.set('top', 0)
        clonedCanvas.add(newText);
        clonedCanvas.renderAll();

        // 4. Resize the clone to fit the text
        const newTextWidth = newText.getScaledWidth();
        const newTextHeight = newText.getScaledHeight();
        clonedCanvas.setWidth(newTextWidth);
        clonedCanvas.setHeight(newTextHeight);

        // 5. Convert the clone to an image
        const dataURL = clonedCanvas.toDataURL({
          format: 'png',
          quality: 1,
          enableRetinaScaling: true,
        });

        // 6. Save the image
        setTextCanvas(dataURL);
        resolve('done')
      });
    })
  }

  const renderText = async (newText: fabric.Object) => {
    if (!canvas) return;
    clearCanvas();

    // Add the newText to the canvas
    // Add the newText to the canvas
    canvas.add(newText);
    centerTextOnCanvas(newText as fabric.IText);
    // 1. Create a clone of the original canvas
    await cloneAndSave(newText);

  }

  const clearCanvas = () => {
    canvas?.clear();
  }

  const handleCrystal = async (text: fabric.Object): Promise<fabric.Object> => {
    const { crystal, crystal_color } = textSettings;
    if (!crystal && itext) return itext;
    var fill = await getFillFromMaterial(crystal_color)
    return addCrystal(itext, text, fill);
  }

  const handle3DEffect = (itext: fabric.IText): fabric.Object => {
    if (!textSettings.shadow) return itext;
    return add3DEffect(itext);
  }

  const handlePatch = async (itext: fabric.IText): Promise<fabric.IText> => {
    if (textSettings.patch) {
      var fill = await getFillFromMaterial(textSettings?.patch_color)
      itext.set('backgroundColor', fill)
      itext.set('padding', 5)
    } else {
      itext.set('padding', 0)
      itext.set('backgroundColor', 'transparent')
    }
    return itext;
  }

  const updateCurrentText = async () => {
    if (!canvas || !itext) return;
    const { color } = font;
    canvas.remove(itext);
    var fill = await getFillFromMaterial(color);
    itext.set({ fill })
    var TEXT = await applyFilters()
    if (TEXT) {
      var result = await applyCrystal(TEXT!)
      renderText(result);
    }
  }



  const onTextChange = async (txt: string) => {

    if (!canvas) return;

    const { color } = font;

    if (itext) {
      updateCurrentText();
      return
    }
    var fill = getFillFromMaterial(color);
    let newText = new fabric.IText(txt, {
      ...(font as any),
      fill,
      fontFamily: font.fontFamily ?? 'Azonix'
    });
    setIText(newText);
    var obj = await applyFilters()
    if (obj) {
      var result = await applyCrystal(obj)
      renderText(result);
    }
  }

  const throttledOnTextChange = throttle(onTextChange, 200);  // Adjust the delay as needed

  return { itext };
};

export default useText;
