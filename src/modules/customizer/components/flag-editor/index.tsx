import { useEffect, useState } from "react";
import ExpandableItem from "../exapandable-item";
import CheckBox from "../checkbox";
import { useCustomizer } from "@lib/context/customizer-context";
import { GraphicSize, } from 'types/ffg'
import Image from "next/image";
import Button from "@modules/common/components/button";


const FlagEditor = () => {
  const {
    setCurrent,
    current,
    close: closeVisible,
    graphicSettings,
    currency,
    graphics,
    customGraphicSettings,
    getCurrencyRate
  } = useCustomizer();
  const [size, setSize] = useState<GraphicSize | undefined>()
  useEffect(() => {
    setSize(customGraphicSettings?.find((g) => g.type.toLowerCase() === 'flag')?.graphic_sizes?.at(0));
  }, [customGraphicSettings])

  const [selectedGraphicId, setSelectedGraphicId] = useState<string | null>(null);

  const [selectedGraphic, setSelectedGraphic] = useState({
    src: "",
    size: undefined as GraphicSize | undefined,
    name: "",
  });

  const getPrice = (price: number) => {
    return Math.ceil(price * getCurrencyRate())
  }


  return <div className="flex flex-col overflow-y-scroll text-xs small:text-base w-full">
    <ExpandableItem expandedInitially={true} title="Select Flag Size"  >
      <div className="w-full flex flex-col gap-2">
        {
          customGraphicSettings.find((g) => g.type.toLowerCase() === 'flag')?.graphic_sizes?.map((s) => {
            return <CheckBox
              key={s.id}
              label={`${s.title}, ${s.description} [${currency} ${(getPrice(Number(s?.price)) * Number(graphicSettings?.flag_price)).toLocaleString()}]`}
              onChange={(event) => setSize({ ...s, price: getPrice(Number(s?.price)) * Number(graphicSettings?.flag_price) })}
              checked={size?.id === s.id} />
          })
        }
      </div>
    </ExpandableItem>

    <ExpandableItem expandedInitially={false} title="Choose Flag"  >
      <div className="w-full grid grid-cols-2 gap-4">
        {graphics.filter(g => g.type.toLowerCase().includes('flag')).map((g) => {
          const isSelected = selectedGraphicId === g.id;

          return (
            <div
              key={g.id}
              className={`text-center ${isSelected ? "border-4" : ""}`}
            >
              <div
                title={g.name}
                onClick={() => {
                  setSelectedGraphicId(isSelected ? null : g.id);
                  setSelectedGraphic({
                    src: g.image_url,
                    size: size!,
                    name: g.name,
                  });
                }}
                className={`rounded relative w-full h-24 ${isSelected ? "selected" : ""}`}
              >
                <Image
                  alt={g.name}
                  objectFit="contain"
                  layout="fill"
                  src={g.image_url} />
              </div>
            </div>
          );
        })}
      </div>
    </ExpandableItem>

    {/* <ExpandableItem expandedInitially={false} title="Choose Flag"  >
      <div className="w-full grid grid-cols-2 gap-4">
        {graphics.filter((g) => g.type.toLowerCase() === 'flag')?.map((g) => {
          return <div key={g.id} className="text-center">
            <div
              title={g.name}
              onClick={() => {
                setCurrent({ ...current, flag: { src: g.image_url, size: size!, name: g.name } })
              }}
              className="rounded relative w-full h-24" >
              <Image
                alt={g.name}
                objectFit="contain"
                layout="fill"
                src={g.image_url} />
            </div>
          </div>
        })}
      </div>
    </ExpandableItem> */}
    <div className={"flex font-montserrat no-scrollbar w-full small:w-auto"}>
      <div className="absolute bottom-28 small:bottom-4 left-0 small:left-[265px] small:w-full flex gap-1 w-full small:max-w-[330px] ">
        <Button className="rounded focus:bg-grey-600 text-base font-semibold" onClick={() => {
          if (selectedGraphic.src && selectedGraphic.name) {
            setCurrent({
              ...current,
              flag: {
                src: selectedGraphic.src,
                size: selectedGraphic.size!,
                name: selectedGraphic.name,
              },
            });
            closeVisible()
          }
        }}>
          Add Flag
        </Button>
      </div>
    </div>
  </div>
}


export default FlagEditor;


export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="white" />
  </svg>

}