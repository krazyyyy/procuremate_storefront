import { useCustomizer } from "@lib/context/customizer-context";
import ExpandableItem from "../exapandable-item";
import CheckBox from "../checkbox";
import { useState } from "react";
import SectionLabel from "../section-label";
import { MaterialPreview } from "../main-material-editor";

const TasselEditor = ({ }) => {
  const [size, setSize] = useState(0)
  const { currency } = useCustomizer()
  const colors = [
    { color: 'yellow', name: 'White', price: 30, currency },
    { color: 'orange', name: 'Black to White', price: 30, currency },
  ];

  return <div className="flex flex-col overflow-y-scroll w-full text-xs small:text-base">
    <TasselCategory colors={colors} setSize={setSize} size={size} side="Front" />
    <TasselCategory colors={colors} setSize={setSize} size={size} side="Back" />
  </div >;
}


export default TasselEditor;


const TasselCategory = ({ size, setSize, side, colors }: any) => {

  const { setColor } = useCustomizer()

  return <>
    <SectionLabel>Add Tassel</SectionLabel>
    <div className="w-full flex flex-col gap-2">
      <span className="my-2 block">Select {side} Tassel Size</span>
      <CheckBox
        label="Small, 5-7 cm [THB 200]"
        onChange={(event) => setSize(0)}
        checked={size == 0} />
      <CheckBox
        label="Medium, 8-10 cm [THB 300]"
        onChange={(event) => setSize(1)}
        checked={size == 1} />
      <CheckBox
        label="Large, 11-14 cm [THB 400]"
        onChange={(event) => setSize(2)}
        checked={size == 2} />
    </div>
    <ExpandableItem expandedInitially={true} title={`Select ${side} Crystal Color`}  >
      <div className="w-full  grid-cols-2 grid gap-2">
        {colors.map((item: any, index: number) => {
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