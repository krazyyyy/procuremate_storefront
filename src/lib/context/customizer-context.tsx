import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useCurrentWidth from '../hooks/use-current-width';
import useDebounce from '../hooks/use-debounce';
import useToggleState from '../hooks/use-toggle-state';
import { useCart } from 'medusa-react';
import { useRouter } from 'next/router';
import {
  fetchAllGraphics,
  fetchCategoryCustomStyle,
  fetchColorGroups,
  fetchCustomSize,
  fetchCustomStyleOptions,
  fetchGraphicCategory,
  fetchGraphicPricing,
  fetchGraphicsSettings,
  fetchProductCategory,
  fetchNameSettings,
  fetchProductionMethods,
  fetchCurrencyRates,
  fetchLayerMaterials,

} from '@lib/services/customizer';

import {
  ImageInterface,
  MaterialColor,
  MaterialType,
  FontSettings,
  Flag,
  Graphic,
  GraphicSettings,
  GraphicSize,
  CustomGraphicSettings,
  CustomColorGroup,
  CustomSize,
  CustomStyle,
  Layer,
  AreaSize,
  TextSettings,
  ProductionMethod,
  CurrencyRate,
  Size,
  CurrentLayer,
  CustomName
} from 'types/ffg';
import useLoadingQueue from '../hooks/use-loading-queue';
import { compress } from 'lz-string';
import Medusa from '@lib/services/api'
import { throttle } from 'lodash';
import { makeFile } from '../../modules/customizer/components/fabric-editor';
import { saveDesign } from '../util/customizer';
import { medusaUrl } from '../services/config';

export interface CustomizerItemProps {
  title: string,
  description: string,
  price: number,
  totalPrice?: number,
  color?: MaterialColor,
  font: FontSettings,
  flag?: Flag,
  graphic?: Flag,
  image?: string,
  export?: boolean,
  fightDate: Date | undefined,
  ownGraphic?: ImageInterface,
  imagePrice?: number,
  flagPrice?: number,
  imageSize?: GraphicSize,
  svg: any,
  production?: ProductionMethod,
  size?: Size,
  height?: string,
  width?: string,
  url?: string
}
interface CustomizerContext {
  current: CustomizerItemProps,
  setCurrent: (item: CustomizerItemProps) => void,
  setFontSettings: (settings: FontSettings) => void,
  updateTextSettings: (newSettings: TextSettings) => void,
  textSettings: TextSettings,
  stack: string[],
  setText: (text: string) => void,
  setStack: (list: string[]) => void,
  setColor: (color: MaterialColor) => void,
  visible: boolean,
  open: () => void,
  close: () => void,
  toggle: () => void,
  layers: Layer[],
  setLayers: (layers: Layer[]) => void,
  currentLayer: Layer | undefined,
  setCurrentLayer: (layer: Layer) => void,
  currency: string | undefined,
  graphicSettings: GraphicSettings | undefined,
  setGraphicSettings: (settings: GraphicSettings) => void,
  layerChanges: CustomizerChange[],
  setLayerChanges: React.Dispatch<React.SetStateAction<CustomizerChange[]>>,
  graphics: Graphic[],
  customSizing: CustomSize | undefined,
  materialTypes: MaterialType[],
  colorGroups: CustomColorGroup[],
  customStyle: CustomStyle | undefined,
  isLoading: boolean,
  addChange: (change: CustomizerChange, graphic?: boolean, text?: boolean) => void,
  deleteChange: (change: CustomizerChange) => void,
  deleteBySource: (source: string) => void,
  deleteText: (id: string) => void,
  customGraphicSettings: CustomGraphicSettings[],
  canvasData?: Record<string, any>,
  setCanvasData: (data?: Record<string, any>) => void,
  saved: boolean,
  setSaved: any,
  customDesignId?: string,
  setCustomDesignId: React.Dispatch<React.SetStateAction<string | undefined>>,
  productionMethods: ProductionMethod[],
  getCurrencyRate: () => number,
  addLoading: (str: string) => void,
  removeLoading: (str: string) => void,
  saveOrUpdate: (product_id: string, customer_id?: string, title?: string, data?: any) => Promise<SaveResponse>
  renderAndSaveState: (canvas: fabric.Canvas) => Promise<void>,
  saveChanges: () => void,
  revertChanges: () => void,
  hasChanges: boolean,
  setTempChanges: any,
  customNames: CustomName[],
  textCanvas: string,
  setTextCanvas: any,
  changes: CustomizerChange[],
  showExamples: boolean,
  setShowExample: (val: boolean) => void,
  textIndex: number,
  setTextIndex: (val: number) => void
}

const CustomizerContext = React.createContext<CustomizerContext | null>(null);

export const useCustomizer = () => {
  const context = React.useContext<CustomizerContext | null>(CustomizerContext);
  if (context == null) {
    throw new Error("useCustomizer must be used within a CustomizerProvider")
  }
  return context;
}

export const defaultTextSettings: TextSettings = {
  materials: [],
}

const defaultState = {
  title: '',
  description: '',
  fightDate: new Date(),
  font: {
    text: '',
    fontFamily: 'Azonix',
  },
  price: 0,
  svg: ''
}

interface CustomizerProps {
  children: React.ReactNode,
}

type CustomizerChange = {
  id: string
  name?: string
  image_url?: string
  layer_name: string
  price?: string | number
  area_size?: AreaSize,
  metadata?: Record<string, unknown>
  type?: 'added' | 'updated',
  currency: string | undefined,
}

export const handleUpload = async (file?: string, product_id?: string): Promise<string | undefined> => {
  if (!file) return;
  var formdata = new FormData();
  var blobResp = await fetch(file);
  var blob = await blobResp.blob()
  formdata.append("file", blob, (product_id ?? "file") + '.svg');

  var requestOptions: any = {
    method: 'POST',
    body: formdata,
    headers: {
      'mime-type': 'image/svg+xml'
    },
    redirect: 'follow'
  };
  try {
    var response = await fetch(medusaUrl + "/store/upload/svg", requestOptions)
    const result = await response.json();
    const { url } = result;
    return url;
  } catch (error) {
  }
};
export const handleDeleteImage = async (url?: string): Promise<boolean> => {
  if (!url) return false;
  var requestOptions: RequestInit = {
    method: 'DELETE',
    redirect: 'follow',
  };
  var params = new URLSearchParams();
  params.append('url', url);
  try {
    var response = await fetch(medusaUrl + "/store/upload?url=" + params.toString(), requestOptions)
    await response.json();
    return true;
  } catch (error) {
    console.error('error', error)
    return false;
  }
};

type SaveResponse = {
  design_id?: string
  url?: string
}

export const CustomizerProvider = ({ children }: CustomizerProps) => {
  const { query } = useRouter()
  const { cart } = useCart()
  const { state: visible, close, open, toggle } = useToggleState(false);
  const [textIndex, setTextIndex] = useState<number>(0);
  const [state, setState] = useState<CustomizerItemProps | undefined>();
  const [productionMethods, setProductionMethods] = useState<ProductionMethod[]>([])
  const [textSettings, setTextSettings] = useState<TextSettings>({})
  const [customDesignId, setCustomDesignId] = useState<string | undefined>()
  const [canvasData, setData] = useState<Record<string, string>>();
  const [customNames, setCustomNames] = useState<CustomName[]>([]);
  const [colorGroups, setColorGroups] = useState<CustomColorGroup[]>([])
  const [currentLayer, setLayer] = useState<CurrentLayer | undefined>();
  const [graphicSettings, setSettings] = useState<GraphicSettings | undefined>()
  const [categoryCustomStyle, setCustomStyle] = useState<CustomStyle | undefined>()
  const [customSizing, setCustomSizing] = useState<CustomSize | undefined>()
  const [stack, setStack] = useState<string[]>([]);
  const [allGraphics, setAllGraphics] = useState<Graphic[]>([]);
  const [customGraphicSettings, setCustomGraphicSettings] = useState<CustomGraphicSettings[]>([]);
  const [saved, setSaved] = useState<boolean>(false);
  const [layers, setLayers] = useState<Layer[]>([]);
  const [rates, setRates] = useState<CurrencyRate[]>([])
  const { isLoading, addToLoadingQueue, removeFromLoadingQueue } = useLoadingQueue()

  const [changes, setChanges] = useState<CustomizerChange[]>([]);
  const [tempChanges, setTempChanges] = useState<CustomizerChange[]>([]);
  const [textCanvas, setTextCanvas] = useState<string>('');
  const [allmaterials, setAllMaterials] = useState<any>(null)
  const [showExamples, setShowExample] = useState(false);

  const windowWidth = useCurrentWidth()
  const debouncedWith = useDebounce(windowWidth, 200);

  const setCanvasData = (data?: Record<string, any>) => {
    setData(data);
  }

  const loadCustomStylesAndSizing = useCallback(async () => {
    if (!query.id) return;
    addToLoadingQueue('custom_styles_and_sizing');
    var category = await fetchProductCategory(query.id as string);

    if (category) {
      let [catStyle, sizing, graphic_category_settings, custom_names] = await Promise.all([
        fetchCategoryCustomStyle(category.id),
        fetchCustomSize(category.id),
        fetchGraphicCategory(category.id),
        fetchNameSettings(category.id)
      ])
      setCustomNames(custom_names);
      if (custom_names.length > 0) {
        setTextSettings({ ...textSettings, name_settings: custom_names[0] });
      }
      let promises = [];
      for (var g of graphic_category_settings) {
        promises.push(fetchGraphicPricing(g.id));
      }
      let responses = await Promise.all(promises);
      for (var i in responses) {
        graphic_category_settings[i].graphic_sizes = responses[i];
      }
      setCustomGraphicSettings(graphic_category_settings);
      setCustomSizing(sizing);
      if (catStyle) {
        var [styleOptions] = await Promise.all([
          fetchCustomStyleOptions(catStyle.id)
        ])
        catStyle.options = styleOptions;
        setCustomStyle(catStyle)
      }
    }
    removeFromLoadingQueue('custom_styles_and_sizing');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id])

  const loadAllGraphics = useCallback(async () => {
    addToLoadingQueue('graphics');
    var graphics = await fetchAllGraphics();
    setAllGraphics(graphics);
    var temp: string[] = []
    var allMethods: ProductionMethod[] = [];
    var productionMethds = await fetchProductionMethods();
    for (var pm of productionMethds) {
      if (!temp.includes(pm.title)) {
        temp.push(pm.title);
        allMethods.push(pm)
      }
    }
    setProductionMethods(allMethods)
    removeFromLoadingQueue('graphics');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    for (var change of changes) {
      if (change.layer_name === currentLayer?.name) {
        setCurrentLayer({ ...currentLayer, temp_value: change })
      }
    }
  }, [changes])

  const saveChanges = useCallback(async () => {
    setTempChanges([...changes]);
  }, [changes]);

  const deleteLayerChange = useCallback(
    (change: CustomizerChange) => {
      var found = changes.find((ch) => ch.id === change.id);

      if (!found) return;
      var index = changes.indexOf(found);
      if (index !== -1) {
        var newChanges = [...changes];
        newChanges.splice(index, 1);
        setChanges(newChanges);
        setLayers((layers) =>
          layers.map((l) =>
            l.id === currentLayer?.id ? { ...currentLayer, selected_value: null } : l
          )
        );
      }

    },
    [changes, currentLayer]
  );

  const revertChanges = useCallback(() => {
    if (currentLayer) {
      deleteLayerChange({
        id: currentLayer?.id,
        layer_name: currentLayer?.name,
        currency,
      });
      const addedChanges = tempChanges.filter(tempChange => !changes.find(change => change.id === tempChange.id && change.name !== tempChange.name && change.area_size !== tempChange.area_size));
      setChanges([...tempChanges]);
      if (addedChanges.length > 0) {
        var change = addedChanges.find((c) => {
          return c.id === currentLayer.id.toLowerCase();
        });

        if (state && change) {
          setCurrent({
            ...state, color: {
              layerName: currentLayer.name,
              code: change.image_url!,
              price: change.price!,
              name: change.name!,
              group: change.id,
            }
          })
        } else if (state) {
          setCurrent({
            ...state, color: {
              layerName: currentLayer?.name!,
              code: 'rgba(0,0,0,0)',
              price: 0,
              name: '',
              group: currentLayer!.id.toLowerCase(),
            }
          })
        }
        if (change) updateAllLayers(change);
      }
    }
  }, [currentLayer, deleteLayerChange, tempChanges]);

  const hasChanges = useMemo(() => {
    return JSON.stringify(changes) !== JSON.stringify(tempChanges)
  }, [changes, tempChanges])

  const loadFlagsAndGraphicsSettings = useCallback(async () => {
    addToLoadingQueue('flag');
    try {
      const { graphics } = await fetchGraphicsSettings()
      if (graphics.length > 0) {
        setGraphicSettings(graphics[0])
      }
    } catch (error) {

    }
    removeFromLoadingQueue('flag');
  }, [])

  const loadAllMaterials = useCallback(async () => {
    addToLoadingQueue('all-mats')
    var all: any = {};
    var data = await fetchLayerMaterials(layers);
    all = data;
    if (JSON.stringify(all) !== '{}') {
      setAllMaterials(all);
    }
    removeFromLoadingQueue('all-mats')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers])

  const loadCurrencies = useCallback(async () => {
    addToLoadingQueue('rates')
    var currencies = await fetchCurrencyRates();
    setRates(currencies)
    removeFromLoadingQueue('rates')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setCurrentLayer = (layer: CurrentLayer) => {
    setLayer(layer);
  }

  useEffect(() => {
    if (visible && debouncedWith >= 1024) {
      close();
    }
  }, [debouncedWith, visible, close])

  useEffect(() => {
    // first time load callback
    loadCurrencies();
    loadAllGraphics();
    loadCustomStylesAndSizing();
    loadFlagsAndGraphicsSettings()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    loadCustomStylesAndSizing,
    loadFlagsAndGraphicsSettings,
    loadAllGraphics,
    loadCurrencies
  ])

  const materialTypes = useMemo(() => {
    if (!currentLayer || !allmaterials) return [];
    return allmaterials[currentLayer.id!] ?? [];
  }, [currentLayer])

  useEffect(() => {
    if (layers.length > 0 && allmaterials === null) {
      loadAllMaterials();
    }
  }, [layers])


  useEffect(() => {
    const fetchColors = async () => {
      if (colorGroups.length === 0) {
        var groups = await fetchColorGroups();
        setColorGroups(groups);
      }
    }
    if (currentLayer) {
      fetchColors();
    }
  }, [currentLayer?.id])

  const updateAllLayers = (change: CustomizerChange) => {
    setLayers((layers) =>
      layers.map((l) =>
        l.id === currentLayer?.id ? { ...currentLayer, selected_value: change } : l
      )
    );
  }

  const addLayerChange = useCallback(
    (change: CustomizerChange, graphic = false, text = false) => {
      var exists: any = false;
      if (saved) setSaved(false);
      if (graphic) {
        exists = changes.find((l) => l.id === change.id && l.image_url === change.image_url);
      } else if (text) {
        exists = changes.find((l) => l.id === change.id);
      } else {
        exists = changes.find((l) => l.id === change.id);
      }

      if (!exists) {
        // If change doesn't exist, it is an added change
        setChanges([...changes, { ...change, type: 'added' }]);
      } else if (!graphic) {
        // If change exists and not a graphic change, it is an updated change
        var newChanges = [...changes.map((c) => (c.id === change.id ? { ...change, type: 'updated' } : c))];
        setChanges(newChanges as any);
      }

      updateAllLayers(change);
    },
    [changes, currentLayer]
  );

  const saveOrUpdate = async (product_id: string, customer_id?: string, title?: string, data?: any): Promise<SaveResponse> => {
    if (!state && !data) return { url: undefined, design_id: undefined };
    addToLoadingQueue('saving')
    if (state?.svg?.startsWith('http')) await handleDeleteImage(state?.svg);
    var url = await handleUpload(state?.svg, product_id);
    let payload: any = data ? data : {
      customer_id,
      product_id,
      design_data: {
        fight_date: state?.fightDate,
        svg: url,
        title: title ?? state?.title,
        canvas: canvasData,
        design: changes,
        textSettings,
        layers,
      },
      template_url: state?.image,
    }
    await saveDesign(product_id, payload)
    if (customer_id) {
      let p = compress(JSON.stringify(payload))
      try {
        if (customDesignId && customDesignId !== 'temp') {
          let { data: response } = await Medusa.customizer.customDesign.update(customDesignId, { data: p })
          const { result: design } = response;
          setSaved(true);
          setCustomDesignId(design.id);
          payload.id = design.id;
          removeFromLoadingQueue('saving')
          return { design_id: design.id, url };
        }

        let { data: response } = await Medusa.customizer.customDesign.create({ data: p })
        const { result: design } = response;
        setCustomDesignId(design.id);
        setSaved(true);
        removeFromLoadingQueue('saving')
        payload.id = design.id;
        return { design_id: design.id, url };
      } catch (error) {
        console.error(error)
        removeFromLoadingQueue('saving')
      }
      removeFromLoadingQueue('saving')
      return { url, };
    }
    removeFromLoadingQueue('saving')
    setSaved(true);
    return { url }
  }



  const setCurrent = (item: CustomizerItemProps) => {
    setState(item);
  }

  const setGraphicSettings = (settings: GraphicSettings) => {
    setSettings(settings);
  }

  const currency = useMemo(() => {
    return cart?.region?.currency_code?.toUpperCase();
  }, [cart])

  useEffect(() => {
    if (currency) {
      var newChanges = changes.map((change) => {
        var nextRate = getCurrencyRate(currency);
        var prevPrice = Number(change.price);
        if (change.currency === currency) return change;
        var rate = getCurrencyRate(change.currency?.toLowerCase());
        var result = Math.round((prevPrice / rate) * nextRate);
        var newChange = { ...change, price: result, currency: currency! };
        return newChange;
      });
      setChanges(newChanges);
    }
  }, [currency]);



  const setColor = (color: MaterialColor) => {
    if (state) {
      setCurrent({ ...state, color })
    }
  }

  const setFontSettings = (settings: FontSettings) => {
    if (state) {
      setCurrent({ ...state, font: settings })
    }
  }

  const setText = (text: string) => {
    if (!state) return;
    setCurrent({ ...state, font: { ...state.font, text } });
  }

  const updateTextSettings = (newSettings: TextSettings) => {
    setTextSettings(newSettings);
  }

  const getCurrencyRate = (newCurrency?: string): number => {
    var curr = newCurrency?.toLowerCase() ?? currency?.toLowerCase()
    if (curr?.toLowerCase() === 'usd') return 1
    var c = rates.find(c => c.code === curr || c.name === curr)
    if (c) return Number(c.rate)
    return 1;
  }

  const deleteBySource = useCallback((src: string) => {
    var item = changes.find((c) => c.image_url === src);
    if (item) {
      var index = changes.indexOf(item);
      var newChanges = [...changes];
      newChanges.splice(index, 1);
      setChanges(newChanges);
    }
  }, [changes])

  const renderAndSaveState = async (canvas: fabric.Canvas): Promise<void> => {
    if (!state) return
    setCanvasData(canvas.toJSON())
    try {
      var svg = await makeFile(canvas?.toSVG(), 'image/svg+xml');
      setState({ ...state, svg })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteText = useCallback((id: string) => {
    var change = changes.find(c => c.id === id)
    if (change) deleteLayerChange(change)
    setTimeout(() => {
      var items = changes.filter((c) => c.id !== id);
      setChanges(items);
    }, 1000);
  }, [changes])

  return <CustomizerContext.Provider
    value={{
      current: state ?? defaultState,
      stack,
      visible,
      setCurrent,
      setFontSettings,
      setText,
      setStack,
      setColor,
      layers,
      setLayers,
      toggle,
      open,
      currency,
      close,
      graphicSettings,
      setGraphicSettings,
      currentLayer,
      setCurrentLayer,
      materialTypes,
      colorGroups,
      customStyle: categoryCustomStyle,
      isLoading,
      customSizing,
      graphics: allGraphics,
      layerChanges: changes,
      addChange: throttle(addLayerChange, 200),
      deleteChange: deleteLayerChange,
      customGraphicSettings,
      canvasData,
      setCanvasData: setCanvasData,
      deleteBySource,
      deleteText,
      saved,
      setSaved,
      textSettings,
      updateTextSettings,
      customDesignId,
      setCustomDesignId,
      setLayerChanges: setChanges,
      productionMethods,
      getCurrencyRate,
      addLoading: addToLoadingQueue,
      removeLoading: removeFromLoadingQueue,
      saveOrUpdate,
      renderAndSaveState,
      saveChanges,
      revertChanges,
      hasChanges,
      setTempChanges,
      customNames,
      textCanvas,
      setTextCanvas,
      changes,
      showExamples,
      textIndex,
      setTextIndex: (value: number) => {
        setTextIndex(value);
      },
      setShowExample(val) {
        setShowExample(val);
      },
    }}>
    {children}
  </CustomizerContext.Provider>
}

