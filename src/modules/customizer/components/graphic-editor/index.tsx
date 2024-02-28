import { useEffect, useState } from "react";
import ExpandableItem from "../exapandable-item";
import CheckBox from "../checkbox";
import { useCustomizer } from "@lib/context/customizer-context";
import { GraphicSize, } from 'types/ffg'
import ThumbnailImage from "../../../products/components/thumbnail-image";
import Button from "@modules/common/components/button";


const GraphicEditor = () => {
  const {
    setCurrent,
    current,
    graphicSettings,
    close: closeVisible,
    currency,
    graphics,
    customGraphicSettings,
    getCurrencyRate,
  } = useCustomizer();

  const [size, setSize] = useState<GraphicSize | undefined>()

  const getPrice = (price: string | number) => {
    return Math.ceil((Number(price) * getCurrencyRate()))
  }
  const [selectedGraphicId, setSelectedGraphicId] = useState<string | null>(null);

  const [selectedGraphic, setSelectedGraphic] = useState({
    src: "",
    size: undefined as GraphicSize | undefined,
    name: "",
  });
  useEffect(() => {
    setSize(customGraphicSettings?.find((g) => g.type.toLowerCase() === 'custom graphic')?.graphic_sizes?.at(0));
  }, [customGraphicSettings])


  return <div className="flex flex-col overflow-y-scroll text-xs small:text-base w-full">
    <ExpandableItem expandedInitially={true} title="Select Graphic Size"  >
      <div className="w-full flex flex-col gap-2">
        {
          customGraphicSettings.find((g) => g.type.toLowerCase() === 'custom graphic')?.graphic_sizes?.map((s) => {
            return <CheckBox
              key={s.id}
              label={`${s.title}, ${s.description} [${currency} ${(getPrice(s?.price) * Number(graphicSettings?.flag_price)).toLocaleString()}]`}
              onChange={(event) => setSize({ ...s, price: getPrice(s?.price) * Number(graphicSettings?.flag_price) })}
              checked={size?.id === s.id} />
          })
        }
      </div>
    </ExpandableItem>

    <ExpandableItem expandedInitially={false} title="Choose Graphic"  >
      <div className="w-full grid grid-cols-2 gap-4">
        {graphics.filter(g => g.type.toLowerCase().includes('graphic')).map((g) => {
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
                className={`rounded h-24 ${isSelected ? "selected" : ""}`}
              >
                <ThumbnailImage
                  objectFit="contain"
                  height={100}
                  width={100}
                  src={g.image_url}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ExpandableItem>
    <div className={"flex font-montserrat no-scrollbar w-full small:w-auto"}>
      <div className="absolute bottom-28 small:bottom-4 left-0 small:left-[265px] small:w-full flex gap-1 w-full small:max-w-[330px] ">
        <Button className="rounded focus:bg-grey-600 text-base font-semibold" onClick={() => {
          if (selectedGraphic.src && selectedGraphic.name) {
            setCurrent({
              ...current,
              graphic: {
                src: selectedGraphic.src,
                size: selectedGraphic.size!,
                name: selectedGraphic.name,
              },
            });
            closeVisible()
          }
        }}>
          Add Graphic
        </Button>
      </div>
    </div>
    {/* <div className={"flex font-montserrat no-scrollbar w-full small:w-auto"}>
      <div className="left-[50vw]  fixed z-10 small:left-[265px] small:w-full flex gap-1 bottom-2 w-[50vw] small:max-w-[300px] ">
        <Button className="rounded  focus:bg-grey-600 text-base font-semibold" onClick={() => {
          if (selectedGraphic.src && selectedGraphic.name) {
            setCurrent({
              ...current,
              graphic: {
                src: selectedGraphic.src,
                size: selectedGraphic.size!,
                name: selectedGraphic.name,
              },
            });
            closeVisible()
          }
        }}>
          Add Graphic
        </Button>
      </div>
    </div> */}
  </div>
}


export default GraphicEditor;
