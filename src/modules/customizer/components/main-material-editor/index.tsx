/* eslint-disable @next/next/no-img-element */
import ExpandableItem from "../exapandable-item";
import { useCustomizer } from "../../../../lib/context/customizer-context";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Material, MaterialColor } from 'types/ffg'
import Image from "next/image";

type TypeItem = {
  title: string,
  colors: any[]
}

type GroupItem = {
  title: string,
  types: TypeItem[]
}


const MainMaterialEditor = ({ }) => {
  const { setColor, materialTypes, colorGroups, } = useCustomizer()
  const [groups, setGroups] = useState<GroupItem[]>([])

  useEffect(() => {
    var group: GroupItem[] = [];

    for (var index in colorGroups) {
      var g = colorGroups[index];
      var groupId = g.id;
      var typeItems: TypeItem[] = [];
      for (var i in materialTypes) {
        var type = materialTypes[i];
        var colors: any[] = [];
        type.materials?.forEach((mat) => {
          if (mat.customColor?.find((c) => c.title === g.title || c.id === groupId)) {
            colors.push(mat);
          }
        })
        if (colors.length > 0) {
          typeItems.push({
            title: type.title,
            colors,
          })
        }
      }
      if (typeItems.length > 0) {
        group.push({
          title: g.title,
          types: typeItems
        })
      }
    }
    setGroups(group);

  }, [materialTypes, colorGroups])


  return <div className="flex flex-col">
    <>
      {groups.map((g, index) => {
        return <div key={index}>
          <ExpandableItem title={g?.title} expandedInitially={false} >
            <>
              {g.types.map((material: TypeItem) => {
                return <ColorGroupItem title={material.title} colors={material.colors} setColor={setColor} key={material.title} />
              })}
            </>
          </ExpandableItem>
        </div>
      })}
    </>
  </div>
}


export default MainMaterialEditor;


export const MaterialPreview = ({ setColor, material, }: { setColor: (value: MaterialColor) => void, material: Material }) => {
  const router = useRouter()
  const { currency, currentLayer, getCurrencyRate, } = useCustomizer()

  const price = useMemo(() => {
    if (currentLayer) {
      return Number(currentLayer?.customizer_area_id?.price_adjust ?? 0) * Number(material?.price ?? 0) * getCurrencyRate()
    }
    return 0;
  }, [currency, currentLayer, getCurrencyRate, material?.price])


  const getUrl = () => {
    if (material?.image_url.length > 0) return `url(${material.image_url})`
    return material.hex_color;
  }
  const handleClick = () => {
    const { query } = router;
    let path = (query.customizer?.at(0)) ?? ''
    var code = material.image_url.length > 0 ? material.image_url : material.hex_color;
    setColor({
      code,
      name: material.title,
      group: path,
      layerName: currentLayer!.name,
      price,
    })
  }

  return <div className="text-xs small:text-base text-center">
    {material.hex_color.startsWith('#') && <button onClick={handleClick} style={{ background: getUrl() }} className="h-20 w-full rounded" />}
    {material.image_url.startsWith('http') &&
      <button onClick={handleClick} className="w-full">
        <Image height={300} width={300} alt={material.image_url} src={material.image_url} className="h-20 w-full object-cover rounded" />
      </button>
    }
    <span className="block mt-2">
      {material.title}
    </span>
    <span className="block small:text-[20px] font-bold mt-0">
      {(price).toFixed(1)} {currency}
    </span>
  </div>
}

const ColorGroupItem = ({ title = '', colors = [], setColor }: { title: string, colors: any[], setColor: any }) => {
  return <>
    <span className="block font-bold italic mb-2 text-xs small:text-sm">{title}</span>
    <div className="grid grid-cols-2 gap-3">
      {colors?.map((c: Material, index) => {
        if (c.hex_color.length === 0) {
          c.hex_color = c.image_url;
        }
        return <MaterialPreview
          key={index}
          material={c}
          setColor={setColor} />
      })}
    </div>
  </>;
}




export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="white" />
  </svg>

}