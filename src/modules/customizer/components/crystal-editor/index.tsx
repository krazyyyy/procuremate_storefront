import { useCustomizer } from "@lib/context/customizer-context";
import ExpandableItem from "../exapandable-item";
import { useEffect, useMemo, useState } from "react";
import { MaterialPreview } from "../main-material-editor";
import { Material } from "types/ffg";
import SkeletonColorCategory from "@modules/skeletons/components/skeleton-line-item";
import repeat from "@lib/util/repeat";

const CrystalEditor = ({ }) => {
  const { materialTypes } = useCustomizer()
  const [colors, setColors] = useState<Material[]>([]);

  useEffect(() => {
    var clrs: Material[] = [];
    if (materialTypes?.length > 0)
      for (var type of materialTypes) {
        type?.materials?.forEach(mat => {
          clrs.push(mat);
        });
      }
    setColors(clrs);
  }, [materialTypes])



  return <div className="flex flex-col overflow-y-scroll w-full">
    <CrystalCategory colors={colors} side="" loading={false} />
  </div >;
}


export default CrystalEditor;


const CrystalCategory = ({ side, colors, loading }: any) => {
  const { setColor } = useCustomizer()
  return <>
    <ExpandableItem expandedInitially={true} title={`Select ${side} Crystal Color`}  >
      <div className="w-full  grid-cols-2 grid gap-2">
        {loading ? repeat(8).map((index) => (<SkeletonColorCategory key={index} />)) :
          colors?.map((item: Material, index: number) => {
            if (item.hex_color === '') {
              item.hex_color = item.image_url
            }
            return <MaterialPreview setColor={setColor} key={index} material={item} />
          })}
      </div>
    </ExpandableItem>
  </>
}

export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="white" />
  </svg>

}