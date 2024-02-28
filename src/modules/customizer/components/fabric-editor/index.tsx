import React, { useRef, useState, useEffect, useMemo } from 'react';
import { fabric } from 'fabric';
import { useCustomizer } from "@lib/context/customizer-context"
import ActionMenu from '@modules/layout/components/action-menu';
import useCanvasState from '@lib/hooks/use-fabric-state';
import useFabricColor from '@lib/hooks/use-fabric-colors';
import { useFabricMethods } from '@lib/hooks/use-fabric-methods';
import CustomizerLoader from '../loader';
import { useRouter } from 'next/router';
// import { useTour } from "@reactour/tour";
import { loadDesign } from '@lib/util/customizer';
import { useTextCanvas } from '@lib/context/text-canvas-modal-context';
import useToggleState from '@lib/hooks/use-toggle-state';

export const deleteIcon = "/icons/delete.svg";
export const cloneIcon = "/icons/copy.svg";
export const resizeIcon = "/icons/resize.svg";

export interface CustomControl extends fabric.Control {
  render: (ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride: any, fabricObject: fabric.Object) => void;
  cornerSize: number;
}

type FabricEditorProps = {
  side: string,
  img: string,
}

export const makeFile = async (data: any, type: string): Promise<Blob> => {
  const file = new Blob([data], { type });
  return await convertBlobToBase64(file);
};

async function convertBlobToBase64(blob: Blob) {
  return new Promise<any>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

}
const FabricEditor = ({ img, side }: FabricEditorProps) => {
  // const { setIsOpen } = useTour()
  const { state: showTextPopup, open: showPopup, close: hidePopup } = useToggleState(false);
  const { state: textShown, open: markAsDone } = useToggleState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const {
    current,
    setCurrent,
    setCanvasData,
    setFontSettings,
    deleteBySource,
    deleteText,
    isLoading,
    renderAndSaveState,
    layers,
    customDesignId,
    saved,
    hasChanges,
    textSettings,
    textIndex,
    textCanvas,
  } = useCustomizer()
  const { closeModal } = useTextCanvas()

  const { color, font } = current;
  const [update, setUpdate] = useState(false);
  const [isCanvasInitialized, setIsCanvasInitialized] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const isPanningRef = useRef(false)
  const router = useRouter();

  const render = React.useCallback(async () => {
    setUpdate(prevUpdate => !prevUpdate);
    if (fabricCanvasRef.current) {
      renderAndSaveState(fabricCanvasRef.current)
    }
  }, [fabricCanvasRef.current])

  useEffect(() => {
    isPanningRef.current = isPanning;
  }, [isPanning])

  useEffect(() => {
    if (fabricCanvasRef.current) {
      if (isPanningRef.current) {
        var canvas = fabricCanvasRef.current;
        fabricCanvasRef.current.isDrawingMode = false;
        fabricCanvasRef.current.selection = false;
        fabricCanvasRef.current.forEachObject((o) => (o.selectable = false));

        fabricCanvasRef.current.on("mouse:move", (event) => {
          const delta = new fabric.Point(event.e.movementX, event.e.movementY);
          fabricCanvasRef.current?.relativePan(delta);
        });

        fabricCanvasRef.current.on('touch:drag', function (opt: any) {
          if (isPanning) {
            var e = opt.e;
            var delta = new fabric.Point(e.touches[0].clientX - e.touches[0].target.lastX, e.touches[0].clientY - e.touches[0].target.lastY);
            e.touches[0].target.lastX = e.touches[0].clientX;
            e.touches[0].target.lastY = e.touches[0].clientY;
            fabricCanvasRef.current?.relativePan(delta);
          }
        });
      } else {
        fabricCanvasRef.current.selection = true;
        fabricCanvasRef.current.forEachObject((o) => (o.selectable = true));
        fabricCanvasRef.current.off("mouse:move");
      }
    }
  }, [isPanning]);

  useEffect(() => {
    return () => {
      setCanvasData(undefined);
      setFontSettings({
        text: '',
      })
    }
  }, [])


  useEffect(() => {
    const handleResize = () => {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;
      const parentElement = canvasElement.parentNode?.parentNode?.parentNode as any;
      const width = parentElement?.clientWidth;
      const height = parentElement?.clientHeight;

      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      fabricCanvasRef.current?.setDimensions({ width, height })
    };

    handleResize(); // Set initial dimensions

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (textSettings?.addText) {
      fabric.Image.fromURL(textCanvas, (image: any) => {
        image.id = 'text-' + textIndex;
        var exists = fabricCanvasRef.current?.getObjects().find((o: any) => o.id === 'text');
        if (exists) fabricCanvasRef.current?.remove(exists);
        // Calculate center coordinates of the canvas
        const canvasWidth = fabricCanvasRef.current?.width || 0;
        const canvasHeight = fabricCanvasRef.current?.height || 0;
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;
        // Set the image in the center
        const imageWidth = image.width || 0;
        const imageHeight = image.height || 0;
        image.set({
          top: centerY - imageHeight / 2,
          left: (centerX - imageWidth / 2) - 200,
        });
        if (window.innerWidth < 768) {
          image.scale(0.25);
          const canvasCenter = fabricCanvasRef.current!.getCenter();
          const imageCenter = image.getCenterPoint();
          const offsetX = canvasCenter.left - imageCenter.x;
          const offsetY = canvasCenter.top - imageCenter.y;
          image.set({
            left: image.left! + offsetX,
            top: image.top! + offsetY,
          });
        }

        image.on('modified', () => {
          render();
        });
        image.id = textSettings.text;
        fabricCanvasRef.current?.add(image);
        closeModal()
        fabricCanvasRef?.current?.renderAll();
      });
    }
  }, [textSettings?.addText, textCanvas]);

  const {
    loadBackgroundImage,
    handleUploadImage,
    reset,
    zoomin,
    zoomout,
    loading,
    stopLoading,
  } = useFabricMethods({ canvas: fabricCanvasRef.current, side, img, render, isCanvasInitialized })

  const {
    isUndoEnabled,
    isRedoEnabled,
    undo,
    redo } = useCanvasState({
      canvas: fabricCanvasRef.current,
      flag: update
    });

  const { updateColors } = useFabricColor({ canvas: fabricCanvasRef.current, color, render, stopLoading });

  useEffect(() => {
    if (img) {
      loadBackgroundImage();
    }
  }, [img, loadBackgroundImage])

  const [isInitialChange, setIsInitialChange] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (isInitialChange && layers.length > 0 && fabricCanvasRef.current?.backgroundImage) {
        var optionals: any = [];
        layers.forEach((layer) => {
          if (layer.customizer_area_id?.optional === true) {
            optionals.push(layer.id)
          }
        });
        var hasLocal = loadDesign(router?.query?.id as string);
        setTimeout(() => {
          if (router.query && !customDesignId && !saved && !hasLocal && !router.query.customer_id)
            for (var id of optionals) {
              updateColors(id, 'rgba(0,0,0,0)', false)
            }
        }, 1500)

        setIsInitialChange(false); // Set the flag to false after the initial change
      }
    }
    loadData()
  }, [isInitialChange, customDesignId, layers, fabricCanvasRef?.current?.backgroundImage]);


  const initCustomControls = () => {
    const deleteImg = new Image();
    deleteImg.src = deleteIcon;

    const cloneImg = new Image();
    cloneImg.src = cloneIcon;
    const resizeImg = new Image();
    resizeImg.src = resizeIcon;
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = 'blue';
    fabric.Object.prototype.cornerSize = 13;
    fabric.Object.prototype.padding = 2;
    fabric.Object.prototype.cornerStyle = 'circle';



    fabric.Object.prototype.toObject = (function (toObject) {
      return function (this: any, propertiesToInclude?: string[]): any {
        const object = toObject.call(this, propertiesToInclude);
        return {
          ...object,
          id: this.id,
          name: this.name
        };
      };
    })(fabric.Object.prototype.toObject);

    const renderIcon = (icon: HTMLImageElement) => (ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride: any, fabricObject: fabric.Object) => {
      const size = 32;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle!));
      ctx.drawImage(icon, -size! / 2, -size! / 2, size!, size!);
      ctx.restore();
    };

    fabric.Object.prototype.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: deleteObject,
      render: renderIcon(deleteImg),
    }) as CustomControl;

    const originalControl = fabric.Object.prototype.controls.mtr;

    fabric.Object.prototype.controls.mtr = new fabric.Control({
      x: 0,
      y: -0.5,
      offsetY: -40,
      cursorStyle: originalControl.cursorStyle,
      actionHandler: originalControl.actionHandler,
      actionName: 'rotate',
      render: renderIcon(resizeImg),
      withConnection: true
    });
    fabric.Object.prototype.controls.clone = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: cloneObject,
      render: renderIcon(cloneImg),
    }) as CustomControl;
  };

  const exportToSvg = () => {
    var svg = fabricCanvasRef.current?.toSVG()
    setCurrent({ ...current, export: false, svg: svg });
  }
  const getTour = () => {
    return window.localStorage.getItem('tour')
  }


  useEffect(() => {
    if (current.ownGraphic)
      handleUploadImage(current.ownGraphic)
  }, [current.ownGraphic])


  function deleteObject(eventData: MouseEvent, transform: fabric.Transform, x: number, y: number) {
    const target = transform.target;
    handleDeleteLayer(target as any);
    fabricCanvasRef.current?.remove(target);
    fabricCanvasRef.current?.requestRenderAll();
    render();
    return true;
  }

  const handleDeleteLayer = (target: any) => {
    if (target.type === 'image') {
      var src = target.getElement().src;
      deleteBySource(src);
    }
    if (target.type === 'i-text' || target.type === 'text' || target.id === 'text') {
      deleteText(target.id);
    }
  }

  useEffect(() => {
    if (textIndex === 1 && !textShown) {
      showPopup()
      markAsDone()
      setTimeout(() => {
        hidePopup()
      }, 5000)
    }
  }, [textIndex])

  function cloneObject(eventData: MouseEvent, transform: fabric.Transform, x: number, y: number) {
    const target = transform.target;
    if (target) {
      target.clone(function (cloned: any) {
        cloned.left += 10;
        cloned.top += 10;
        fabricCanvasRef.current?.add(cloned);
      });
      return true
    }
    return false;
  }
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      initCustomControls()
      const parentElement = canvasRef?.current.parentNode?.parentNode?.parentNode as any;

      const width = parentElement?.clientWidth;
      const height = parentElement?.clientHeight;

      const canvas = new fabric.Canvas(canvasRef.current, {
        selection: true,
        hoverCursor: 'pointer',
        selectionBorderColor: 'green',
        height: height,
        width: width,
        backgroundColor: '#fafefe',
      });
      fabricCanvasRef.current = canvas;

      canvas.on('mouse:down', (event) => {
        if (event.e.shiftKey) {
          setIsPanning(true);
        }
      })
      canvas.on('mouse:up', () => {
        setIsPanning(false);
      })

      canvas.on('touch:gesture', function (opt: any) {
        if (opt.e.touches && opt.e.touches.length == 2) {
          setIsPanning(true);
        }
      });

      canvas.on('touch:gesture:release', function () {
        setIsPanning(false);
      });
      setIsCanvasInitialized(true);

    }
  }, [canvasRef]);


  useEffect(() => {
    if (current.export) {
      exportToSvg();
    }
  }, [current.export])

  const changed = useMemo(() => {
    return hasChanges;
  }, [router, hasChanges])

  useEffect(() => {
    if (loading || isLoading) return;
    render();
  }, [changed, loading, isLoading])

  return (
    <div className='pt-12 small:p-4 z-10 small:z-auto h-fit small:min-h-[580px]'>
      {showTextPopup && <div className='fixed right-0 bg-black h-[120px] bottom-32 small:bottom-1 small:left-64 left-0 z-50 bg-opacity-60 flex text-center items-center justify-center text-xl font-montserrat text-white'>
        <p>
          To add multiple name styles, simply click on
          <span className="text-primary font-bold">{'"Add name style"'}</span> again. <br />
          This allows you to create and customize additional name styles as needed.
        </p>
      </div>
      }
      <CustomizerLoader isLoading={loading || isLoading} />
      <ActionMenu
        undo={undo}
        undoEnabled={isUndoEnabled}
        redoEnabled={isRedoEnabled}
        zoomin={zoomin}
        zoomout={zoomout}
        redo={redo}
        reset={reset} />
      <canvas
        id="canvas"
        ref={canvasRef}
      />
    </div >
  );
};

export default FabricEditor;