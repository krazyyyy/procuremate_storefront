/* eslint-disable react-hooks/exhaustive-deps */
import { fabric } from 'fabric';
import { useCustomizer } from '../context/customizer-context';
import { useCallback, useEffect, useState } from 'react';
import useToggleState from './use-toggle-state';
import Medusa from '@lib/services/api';
import { useRouter } from 'next/router';
import { ImageInterface, Layer } from 'types/ffg';
import { toast } from 'react-toastify';
type LayersResponse = {
  layers: any[],
}

const fetchLayerSettings = async (id: string): Promise<LayersResponse> => {
  var response = await Medusa.customizer.customProductSettings.retrieve(id);
  const { status, custom_product_settings: data } = response.data;
  if (status === 'success') {
    const { custom_product_settings } = data;
    return { layers: custom_product_settings };
  }
  return {
    layers: []
  };
}

type FabricMethodsProps = {
  canvas: fabric.Canvas | null,
  side: string,
  img: string,
  render: () => void,
  isCanvasInitialized: boolean,
}

export const useFabricMethods = ({ canvas, img, render, isCanvasInitialized }: FabricMethodsProps) => {
  const [scale, setScale] = useState<number>(1);
  const { state: backgroundLoading, close: stopBackgroundLoading } = useToggleState(true);
  const { state: loading, close: stopLoading, open: startLoading } = useToggleState(true);
  const {
    setStack,
    canvasData,
    setLayers,
    layers,
    current,
    currentLayer,
    addChange,
    setFontSettings,
    currency,
  } = useCustomizer()
  const { flag, graphic } = current;
  const { query } = useRouter()
  const { state: loadingSettings, close: settingsLoaded, open: loadSettings, } = useToggleState(true);

  const setBackgroundImage = useCallback((image: fabric.Object) => {
    if (!(image instanceof fabric.Object)) return;
    const scaleFactor = Math.min(canvas?.width! / (image.width! * 1.1), canvas?.height! / (image.height! * 1.4));
    image?.scale(scaleFactor);
    // Center the image horizontally and vertically
    const canvasCenter = canvas?.getCenter();
    const imageCenter = image.getCenterPoint();
    const offsetX = canvasCenter!.left - imageCenter!.x;
    const offsetY = canvasCenter!.top - imageCenter!.y;
    let totalOffset = 100;
    if (window.innerWidth < 768) {
      totalOffset = 0;

    }
    var newLeft = image.left! + offsetX - totalOffset;
    canvas?.setBackgroundImage(image as any, canvas.renderAll.bind(canvas), {
      name: 'background',
      lockMovementX: true,
      lockMovementY: true,
      lockRotation: true,
      lockScalingX: true,
      lockScalingY: true,
      selectable: false,
      left: newLeft > 0 ? newLeft : isNaN(newLeft) ? 20 : 0,
      top: image.top! + offsetY,
    })

    // Check if the background image is loaded and visible
    fabric.util.loadImage(image?.toDataURL({}), function (img) {
      if (img) {
        stopBackgroundLoading()
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas])


  const loadImageLayers = useCallback(async () => {
    if (loadingSettings && query.id) {
      var { layers: Layers } = await fetchLayerSettings(query.id as string);
      var lays: Layer[] = [];
      for (var LAYER of Layers) {
        var layer: Layer = { ...LAYER, id: LAYER.name_id };
        if (!layer.id.includes('X') && !layers.find((l) => l.id === layer.id)) {
          lays.push(layer);
        }
      }
      setLayers([...lays, ...layers,]);
      settingsLoaded()
    }
    return null;
  }, [loadingSettings, query.id, layers, setLayers, settingsLoaded])


  const loadBackgroundImage = useCallback(() => {
    if (!canvas || !img) {
      return;
    }
    canvas?.clear();

    if (canvasData && canvas) {
      if (window.innerWidth < 768) {
        const image = canvasData.backgroundImage;
        const scaleFactor = Math.min(canvas?.width! / (image.width! * 1.1), canvas?.height! / (image.height! * 1.4));
        canvasData.backgroundImage.scaleX = scaleFactor;
        canvasData.backgroundImage.scaleY = scaleFactor;
      }
      canvas?.loadFromJSON(canvasData, () => {
        stopLoading()
      });

      return;
    }

    if (img.endsWith('svg')) {
      fabric.loadSVGFromURL(img, function (objects, options) {
        if (!objects || !options) {
          toast.error("Error loading svg template", { toastId: 'eror' })
        }
        let image = fabric.util.groupSVGElements(objects, options);
        setBackgroundImage(image);
        canvas?.renderAll()
      });
    } else {
      fabric.Image.fromURL(img, (image) => {
        setBackgroundImage(image);
      })
    }
  }, [canvas, img, setBackgroundImage]);

  useEffect(() => {
    if (!loadingSettings && layers.length > 0 && !backgroundLoading) {
      stopLoading()
    }
  }, [layers, loadingSettings, stopLoading, backgroundLoading])


  useEffect(() => {
    if (isCanvasInitialized) {
      loadBackgroundImage();
    }
  }, [isCanvasInitialized, loadBackgroundImage]);

  useEffect(() => {
    loadImageLayers();
  }, [isCanvasInitialized, loadImageLayers])

  function cmToPixels(cm: number, dpi: number) {
    // var dpi = 96; // Assuming a screen DPI of 96c
    var inches = cm / 2.54;
    var pixels = inches * dpi;
    return pixels / 2;
  }

  const getDPI = () => {
    // Create an element in the DOM
    const div = document.createElement("div");
    div.style.width = "1in";
    document.body.appendChild(div);

    // Get the DPI
    const dpi = div.offsetWidth;

    // Clean up
    document.body.removeChild(div);

    return dpi;
  };



  const handleUploadImage = (image: ImageInterface) => {
    const { file, size: imageSize, name } = image;
    if (!imageSize || !canvas) return;
    if (file) {
      const loadingText = new fabric.Text('Loading...', {
        top: 0,
        selectable: false,
        fontSize: 12,
        fontFamily: 'Montserrat'
      });

      // Center the loading text horizontally and vertically
      const canvasCenter = canvas.getCenter();
      const loadingTextCenter = loadingText.getCenterPoint();
      const offsetX = canvasCenter.left - loadingTextCenter.x;
      const offsetY = canvasCenter.top - loadingTextCenter.y;
      loadingText.set({
        left: loadingText.left! + offsetX,
        top: loadingText.top! + offsetY,
      });

      canvas?.add(loadingText)
      fabric.Image.fromURL(file, (img: any) => {
        var exists = canvas?.getObjects().find((obj: any) => obj.id == file);
        setScale(1 / 2);
        img.set({
          left: 20,
          top: 20,
        });
        img.id = file;
        if (JSON.stringify(exists) === JSON.stringify(img)) {
          canvas?.remove(loadingText)
          return;
        }
        // Define your limits
        var dpi = getDPI();
        var MIN_SCALE = cmToPixels(3, dpi) / canvas.width!;
        var MAX_SCALE = cmToPixels(50, dpi) / canvas.width!;
        if (current.imageSize!.title.toLowerCase().includes('s')) {
          MIN_SCALE = 0.00001;
        }
        img.on('modified', () => {
          render()
        })

        img.on('scaling', function () {
          // Get the current scale
          var scale = img.scaleX; // Assuming uniform scaling

          // Constrain scaling
          if (scale < MIN_SCALE) {
            img.scaleX = MIN_SCALE;
            img.scaleY = MIN_SCALE;
          } else if (scale > MAX_SCALE) {
            img.scaleX = MAX_SCALE;
            img.scaleY = MAX_SCALE;
          }
        });

        img.scaleToHeight(100)
        img.scaleToWidth(100)
        // Center the flag horizontally and vertically
        const imageCenter = img.getCenterPoint();
        const offsetX = canvasCenter.left - imageCenter.x;
        const offsetY = canvasCenter.top - imageCenter.y;
        img.set({
          left: img.left! + offsetX,
          top: img.top! + offsetY,
        });
        img.centerH()
        img.centerV()
        img.setCoords()

        canvas?.add(img);
        canvas?.renderAll()
        render()
      });
      fabric.util.loadImage(file, function (img) {
        if (img) {
          canvas?.remove(loadingText)
        }
      });
      addChange({
        id: currentLayer!.id,
        image_url: file,
        layer_name: currentLayer!.name,
        name: name,
        area_size: {
          id: currentLayer?.id ?? '',
          price_adjust: current.imageSize!.price,
          title: current.imageSize!.title,
          optional: true,
        },
        price: current.imageSize?.price ?? 0,
        currency: currency,
      },
        true)
    }
  };


  const reset = () => {
    canvas?.clear();
    setStack([])
    loadBackgroundImage();
    canvas?.setZoom(1)
    canvas!.viewportTransform = [1, 0, 0, 1, 0, 0]; // reset the viewport transform
    canvas?.renderAll(); // redraw the canvas

    setFontSettings({
      text: '',
      color: {
        data_uri: '',
        hex_color: '#fff',
        image_url: '',
        id: '',
        price: '',
        thai_name: '',
        title: '',
        material_type: {
          description: "",
          id: '',
          title: '',
        }
      },
      fontFamily: 'Azonix',
      textAlign: 'center',
      fontWeight: 400,
      case: 3,
    });
  }

  const zoomin = (): void => {
    let zoomLevel = scale;
    zoomLevel *= 1.1
    setScale(zoomLevel)
    if (zoomLevel >= 10) zoomLevel = 10;
    canvas?.setZoom(zoomLevel);
    canvas?.renderAll();
    render();
  }
  const zoomout = (): void => {
    let zoomLevel = scale;
    zoomLevel /= 1.1
    setScale(zoomLevel)
    if (zoomLevel >= 10) zoomLevel = 10;
    canvas?.setZoom(zoomLevel);
    canvas?.renderAll();
    render();
  }


  useEffect(() => {
    if (!flag || !canvas) return;

    const loadingText = new fabric.Text('Loading...', {
      top: 10,
      left: 10,
      selectable: false,
      fontSize: 12,
      fontFamily: 'Montserrat'
    });

    // Center the loading text horizontally and vertically
    const canvasCenter = canvas.getCenter();
    const loadingTextCenter = loadingText.getCenterPoint();
    const offsetX = canvasCenter.left - loadingTextCenter.x;
    const offsetY = canvasCenter.top - loadingTextCenter.y;
    loadingText.set({
      left: loadingText.left! + offsetX,
      top: loadingText.top! + offsetY,
    });

    canvas?.add(loadingText);
    fabric.util.loadImage(flag.src, function (img) {
      if (img) {
        canvas?.remove(loadingText);
      }
    });

    fabric.Image.fromURL(flag!.src, (image) => {
      image.set({
        top: 0,
        left: 0,
      });

      var dpi = getDPI();
      var MIN_SCALE = cmToPixels(3, dpi) / canvas.width!;
      var MAX_SCALE = cmToPixels(50, dpi) / canvas.width!;
      if (current.flag?.size.title?.toLowerCase()?.includes('s')) {
        MIN_SCALE = 0.00001;
      }
      image.on('scaling', function () {
        // Get the current scale
        var scale = image.scaleX!; // Assuming uniform scaling

        // Constrain scaling
        if (scale < MIN_SCALE) {
          image.scaleX = MIN_SCALE;
          image.scaleY = MIN_SCALE;
        } else if (scale > MAX_SCALE) {
          image.scaleX = MAX_SCALE;
          image.scaleY = MAX_SCALE;
        }
      });

      image.on('modified', () => {
        render();
      });

      image.scaleToHeight(100);
      image.scaleToWidth(100);

      // Center the flag horizontally and vertically
      const imageCenter = image.getCenterPoint();
      const offsetX = canvasCenter.left - imageCenter.x;
      const offsetY = canvasCenter.top - imageCenter.y;
      var newLeft = image.left! + offsetX - 100;
      image.set({
        left: newLeft > 0 ? newLeft : 0,
        top: image.top! + offsetY,
      });

      image.setCoords();
      image.setControlVisible('v', false);
      image.sendToBack();

      if (canvas?.contains(image)) {
        canvas.remove(image);
      }

      canvas?.add(image);
      addChange({
        id: currentLayer?.id ?? 'flag',
        image_url: flag.src,
        layer_name: 'Flag',
        name: flag.name,
        price: flag.size.price,
        metadata: { size: flag.size },
        area_size: currentLayer?.customizer_area_id,
        currency,
      }, true);

      canvas.renderAll();
    });

    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, flag]);


  useEffect(() => {
    if (!graphic || !canvas) return

    const loadingText = new fabric.Text('Loading...', {
      top: 20,
      left: 20,
      selectable: false,
      fontSize: 12,
      fontFamily: 'Montserrat'
    });


    // Center the loading text horizontally and vertically
    const canvasCenter = canvas.getCenter();
    const loadingTextCenter = loadingText.getCenterPoint();
    const offsetX = canvasCenter.left - loadingTextCenter.x;
    const offsetY = canvasCenter.top - loadingTextCenter.y;
    loadingText.set({
      left: loadingText.left! + offsetX,
      top: loadingText.top! + offsetY,
    });

    canvas?.add(loadingText)
    fabric.util.loadImage(graphic.src, function (img) {
      if (img) {
        canvas?.remove(loadingText)
      }
    });
    fabric.Image.fromURL(graphic.src, (image) => {
      image.set({
        top: 0,
        left: 0,
      })
      var dpi = getDPI();
      var MIN_SCALE = cmToPixels(3, dpi) / canvas.width!;
      var MAX_SCALE = cmToPixels(50, dpi) / canvas.width!;
      if (graphic.size!.title.toLowerCase().includes('s')) {
        MIN_SCALE = 0.00001;
      }
      image.on('scaling', function () {
        // Get the current scale
        var scale = image.scaleX!; // Assuming uniform scaling

        // Constrain scaling
        if (scale < MIN_SCALE) {
          image.scaleX = MIN_SCALE;
          image.scaleY = MIN_SCALE;
        } else if (scale > MAX_SCALE) {
          image.scaleX = MAX_SCALE;
          image.scaleY = MAX_SCALE;
        }
      });
      image.on('modified', () => {
        render()
      })
      image.scaleToHeight(100)
      image.scaleToWidth(100)
      // Center the flag horizontally and vertically
      const imageCenter = image.getCenterPoint();
      const offsetX = canvasCenter.left - imageCenter.x;
      const offsetY = canvasCenter.top - imageCenter.y;
      var newLeft = image.left! + offsetX - 100;
      image.set({
        left: newLeft > 0 ? newLeft : 0,
        top: image.top! + offsetY,
      });

      image.centerH()
      image.centerV()
      image.setCoords()
      image.setControlVisible('v', false);
      image.sendToBack()

      if (canvas?.contains(image)) {
        canvas.remove(image);
      }
      canvas?.add(image);
      canvas.bringForward(image);
      addChange({
        id: currentLayer?.id ?? 'graphic',
        image_url: graphic.src,
        layer_name: currentLayer?.name ?? 'Graphic',
        name: graphic.name,
        price: graphic.size.price,
        metadata: { size: graphic.size },
        area_size: currentLayer?.customizer_area_id,
        currency,
      }, true)
      canvas.renderAll()
    })
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, graphic])

  return {
    setBackgroundImage,
    loadBackgroundImage,
    reset,
    zoomin,
    zoomout,
    handleUploadImage,
    loading,
    startLoading,
    stopLoading,
  }
};
