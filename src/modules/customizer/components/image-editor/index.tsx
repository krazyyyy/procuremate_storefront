import { useEffect, useState } from "react";
import ExpandableItem from "../exapandable-item";
import Checkbox from "@modules/customizer/components/checkbox";
import FileUploader from "../drag-and-drop";
import { useCustomizer } from "@lib/context/customizer-context";
import { CustomGraphicSettings } from "types/ffg";


interface ImageEditorProps {
  groups: any[];
}

const ImageEditor = ({ groups }: ImageEditorProps) => {
  const [size, setSize] = useState<any>(null);

  const { currency, customGraphicSettings, getCurrencyRate } = useCustomizer()
  const [instructions, setInstructions] = useState<string>('');

  const checkCustom = (s: CustomGraphicSettings) => {
    return s.type.toLowerCase().includes('custom graphic') || s.type.toLowerCase()?.includes('graphic');
  }

  useEffect(() => {
    setSize(customGraphicSettings.find((s) => checkCustom(s))?.graphic_sizes?.at(0))
  }, [customGraphicSettings])

  const getPrice = (price: number) => {
    return Math.ceil(price * getCurrencyRate())
  }

  return (
    <div className="flex flex-col overflow-y-scroll text-xs small:text-base w-full pb-14">
      <ExpandableItem expandedInitially title="Select Image Size">
        <div className="w-full flex flex-col gap-2">
          {customGraphicSettings.find((s) => checkCustom(s))?.graphic_sizes?.map((s) => {
            return <Checkbox
              key={s.id}
              label={`${s.title}, ${s.description} [${currency} ${getPrice(Number(s.price))}]`}
              onChange={() => setSize(s)}
              checked={s === size}
            />;
          })}

          <div className="bg-white text-black h-[200px] p-3 text-center flex  flex-col items-center justify-center">
            <FileUploader instructions={instructions} imageSize={size} />
          </div>

          <span>
            Logos or images will normally be printed. We may not be able to use low quality images. If there is a problem we will email you.
          </span>
          {/* <Checkbox
            label="Remove background."
          // onChange={handleCheckChange}
          // checked={checked}
          /> */}
          <span>
            Special instructions about your logo or image.
          </span>
          <textarea
            name="description"
            onChange={(e) => setInstructions(e.target.value)}
            cols={30}
            rows={10}
            value={instructions}
            className="bg-c-black border rounded p-2"
            placeholder="Enter your text here"
          />
        </div>
      </ExpandableItem>
    </div>
  );
};

export default ImageEditor;

export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="white" />
  </svg>

}