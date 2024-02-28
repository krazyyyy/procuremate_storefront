import SidebarItem from '@modules/customizer/components/sidebar-item';
import clsx from "clsx"
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import GeneralEditor from "../components/main-material-editor";
import ImageEditor from "../components/image-editor";
import SizeEditor from "../components/size-editor";
import FlagEditor from "../components/flag-editor";
import WaistBandEditor from "../components/waist-band-editor";
import StyleEditor from "../components/style-editor";
import { useCustomizer } from '@lib/context/customizer-context';
import TasselEditor from '../components/tassel-editor';
import FightDateEditor from '../components/fight-date-editor';
import SaveModal from '../components/save-modal';
import CrystalEditor from '../components/crystal-editor';
import { Layer } from 'types/ffg';
// import { useMeCustomer } from 'medusa-react';
import ProductionEditor from '../components/production-editor';
import GraphicEditor from '../components/graphic-editor';
import useToggleState from '../../../lib/hooks/use-toggle-state';
import dynamic from 'next/dynamic';
import Button from '../../common/components/button';
import TextExamplesPopup from '../components/text-examples-popup';
import ArrowIcon from '../../common/icons/arrow';
import { useTextCanvas } from '../../../lib/context/text-canvas-modal-context';
import TextCanvasModal from '../components/text-canvas-modal';
import { useAccount } from '../../../lib/context/account-context';

const TextEditor = dynamic(() => import("../components/text-editor"));

export type SidebarItemType = {
  href: string,
  layer: Layer,
  id?: string,
}


const defaultLayers: Layer[] = [
  {
    id: 'image',
    name: "Upload Your Own Graphic",
    thai_name: '',
    customizer_area_id: {
      id: 'image',
      optional: true,
      title: 'Add Own Graphic',
      price_adjust: 1,
    }
  },
  {
    id: 'graphic',
    name: "Add Graphic",
    thai_name: '',
    customizer_area_id: {
      id: 'graphic',
      optional: true,
      title: 'Add Graphic',
      price_adjust: 1,
    }
  },
  {
    id: 'flag',
    name: "Add Flag",
    thai_name: '',
    customizer_area_id: {
      id: 'flag',
      optional: true,
      title: 'Add Flag',
      price_adjust: 1,
    }
  },
  {
    id: 'text',
    name: "ADD NAME STYLE",
    thai_name: '',
    customizer_area_id: {
      id: 'text',
      optional: true,
      title: 'ADD NAME STYLE',
      price_adjust: 1,
    }
  },
  {
    id: 'text',
    name: "ADD NAME STYLE",
    thai_name: '',
    customizer_area_id: {
      id: 'text',
      optional: true,
      title: 'ADD NAME STYLE',
      price_adjust: 1,
    }
  },
  {
    id: 'fight',
    name: "Fight Date Request",
    thai_name: '',
    customizer_area_id: {
      id: 'text',
      optional: true,
      title: 'ADD NAME STYLE',
      price_adjust: 1,
    }
  },
  {
    id: 'production',
    name: "Production",
    thai_name: '',
    customizer_area_id: {
      id: 'production',
      optional: false,
      title: 'Production',
      price_adjust: 1,
    }
  }
]

const getEditor = (href: string, title: string | undefined): number => {

  title = title?.toLowerCase()
  if (!href) return 0;
  if (href.includes('style')) {
    return 0;
  }
  if (href.includes('production')) {
    return 10;
  }
  if (href.includes('graphic')) {
    return 11;
  }
  if (href.includes('fight')) {
    return 9;
  }
  if (href.includes('text')) {
    return 6;
  }
  if (href.includes('image')) {
    return 4;
  }
  if (href.includes('flag')) {
    return 3;
  }
  if (href.includes('size')) {
    return 5;
  }
  if (!title) return 1;

  if (title.includes('general simple areas')) {
    return 1;
  }

  if (title.includes('crystal')) {
    return 8;
  }

  if (title.includes('tassel')) {
    return 8;
  }

  return 1;
}



const CustomizerSidebar = () => {
  const { customer } = useAccount();
  const { query, replace, asPath } = useRouter()
  const { state: showLayer, toggle, open, close: closeView } = useToggleState(false);
  const { visible: showText, openModal } = useTextCanvas()
  const [index, setIndex] = useState<number>(0);
  const {
    layers,
    visible,
    close: closeVisible,
    currentLayer,
    customStyle,
    customSizing,
    setLayers,
    setCurrentLayer,
    saveChanges,
    hasChanges,
    revertChanges,
    showExamples,
    setShowExample,
  } = useCustomizer()



  useEffect(() => {
    let isLayersUpdated = false;
    const updatedLayers = [...layers]; // clone current layers

    // Function to check if a layer already exists in updatedLayers
    const layerExists = (id: any) => updatedLayers.some(layer => layer.id === id);

    defaultLayers.forEach(defaultLayer => {
      if (!layerExists(defaultLayer.id)) {
        updatedLayers.push(defaultLayer);
        isLayersUpdated = true;
      }
    });

    // If customStyle or customSizing exist and not included in updatedLayers, add them
    if (customStyle && !layerExists('custom_style')) {
      updatedLayers.unshift({
        id: 'custom_style',
        name: customStyle.title,
        thai_name: '',
      });
      isLayersUpdated = true;
    }

    if (customSizing && !layerExists('size')) {
      updatedLayers.unshift({
        id: 'size',
        name: 'Size',
        thai_name: '',
      });
      isLayersUpdated = true;
    }

    if (isLayersUpdated) {
      setLayers(updatedLayers); // if any layer was added, update the state
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layers, customStyle, customSizing]);


  let { title } = currentLayer?.material_group ?? { title: undefined };


  const initializeSidebarItems = (data: any[]): SidebarItemType[] => {
    let sidebarItems: SidebarItemType[] = [...data,];

    return sidebarItems;
  }

  const [sidebarItems, setSidebarItems] = useState<SidebarItemType[]>([]);

  useEffect(() => {
    if (layers.length > 0) {
      const data = layers.map((l) => {
        return {
          href: '/customizer/' + l.id.toLowerCase(),
          layer: l,
        };
      });

      const sidebarItems = initializeSidebarItems(data);
      setSidebarItems(sidebarItems);
    }
  }, [layers, customStyle, customSizing]);

  useEffect(() => {
    if (sidebarItems.length > 0 && !currentLayer) {
      var href = window.location.pathname
      var layer = sidebarItems.find((s) => s.href === href)?.layer;
      if (layer) {
        setCurrentLayer(layer);
        if (layer.id === 'text') {
          openModal()
        } else {

          open();
        }
        setTimeout(() => {
          closeView();
        }, 100)
      }
    }
  }, [currentLayer, sidebarItems])


  const tabs = [
    <StyleEditor key="Style editor" />,//0
    <GeneralEditor key="General editor" />, //1
    <WaistBandEditor key="Waist band editor" />, //2
    <FlagEditor key='flag editor' />, //3
    <ImageEditor groups={[]} key="image editor" />, //4
    <SizeEditor key="Size Editor" />, //5
    <div key="text"></div>,
    // <TextEditor key={'Text editor'} />, //6
    <TasselEditor key='tassel editor' />, //7
    <CrystalEditor key='crystal editor' />, //8
    <FightDateEditor key='date editor' />, //9
    <ProductionEditor key='production editor' />, //10
    <GraphicEditor key='graphic editor' />, //3
  ];


  useEffect(() => {
    const condition = query.customizer && query.customizer[0];
    setIndex(getEditor(condition!, title));
    return () => setIndex(0);
  }, [currentLayer?.name, query])

  const filterFunction = (layer: SidebarItemType) => {
    return !layer.layer?.name.toLowerCase().includes('hidden')
  }
  const handleClick = (href: string, layer: Layer): void => {
    var params: any = { id: query.id }
    if (query.design_id) params['design_id'] = query.design_id;
    if (query.customer_id) params['customer_id'] = query.customer_id;
    replace({
      pathname: href, query: params
    });
    closeView();
    setTimeout(() => {
      if (layer.id !== 'text') open();
      else openModal()
    }, 100)
    setCurrentLayer(layer);
  };

  const changed = useMemo(() => {
    if (asPath.includes('graphic')) return false;
    if (asPath.includes('text')) return false;
    if (asPath.includes('flag')) return false;
    if (asPath.includes('flag')) return false;
    return hasChanges;
  }, [asPath, hasChanges])

  return (
    <div className={clsx("flex fixed bottom-0 flex-col-reverse small:flex-row font-montserrat small:relative no-scrollbar h-full w-full small:w-auto", showLayer ? 'z-20' : 'z-10')}>
      <TextCanvasModal visible={showText} />
      {changed && <div className="fixed text-xs small:text-sm z-10 small:left-[265px] flex small:mx-2 small:max-w-[320px] w-full bottom-[130px] small:bottom-4">
        <Button onClick={() => {
          revertChanges();
          closeVisible();
          closeView();
        }} className="rounded !bg-gray-500 focus:bg-gray-600 small:text-base font-semibold">
          Cancel
        </Button>
        <Button onClick={async () => {
          saveChanges()
          closeVisible()
          closeView();
        }} className="rounded !bg-green-500 focus:bg-green-600 small:text-base font-semibold">
          Apply
        </Button>
      </div>}
      <TextExamplesPopup visible={showExamples} onClose={() => setShowExample(false)} />
      <aside id="sidebar1" className={clsx("relative no-scrollbar min-h-[120px]  py-2 px-1 overflow-x-scroll small:h-full mx-auto w-full small:w-[263px] transition-colors small:overflow-x-hidden small:overflow-y-scroll duration-200 bg-c-black border-[5px] border-opacity-90 border-c-black-2 text-white group-hover:bg-white group-hover:border-gray-200",)}>
        <div className="flex relative flex-row small:flex-col gap-y-[5px] w-full">
          {sidebarItems.filter(filterFunction).map((item, index) => {
            return <SidebarItem
              key={item.href}
              id={item.layer.id}
              onClick={() => handleClick(item.href, item.layer)}
              {...item} />
          })}
          {<SaveModal customer={customer} />}
        </div>
      </aside>
      {showLayer &&
        <aside
          className={clsx(
            "min-h-[calc(100vh-300px)] h-full pt-[172px] small:pt-4 py-4 px-2 mx-auto font-montserrat",
            "w-full small:w-[340px] small:overflow-x-hidden no-scrollbar overflow-y-scroll border-transparent",
            "duration-200 bg-c-black border-[5px] border-opacity-90 border-c-black-2 text-white group-hover:bg-white group-hover:border-gray-200")}>
          <div
            onClick={() => {
              closeVisible()
              closeView()
            }}
            className='my-5 shadow left-4  gap-2 absolute top-[86px] z-20 w-40 justify-between flex items-center border small:hidden cursor-pointer bg-white text-black hover:text-primary border-green-500 hover:bg-gray-100 p-4 rounded-full'>
            <span className='text-xs'>BACK</span>
            <ArrowIcon />
          </div>
          {showLayer && tabs[index]}
        </aside>}
    </div >
  )
}

export default CustomizerSidebar;