import { useCustomizer } from "@lib/context/customizer-context";
import Image from "next/image";

const StyleEditor = ({ }) => {
  const { customStyle, addChange, currentLayer, currency, } = useCustomizer();
  const { options } = customStyle ?? { options: [] };

  const getUrl = (option: any) => {
    if (option?.image_url?.length > 0) {
      return option.image_url;
    }
    return '/images/cat-1.png';
  }

  return <div className="grid grid-cols-2 gap-5 w-full">
    {options?.map((option, index) => {
      return <div onClick={() => {
        addChange({
          id: currentLayer!.id,
          image_url: option.image_url,
          price: option.price,
          name: option.title,
          layer_name: currentLayer!.name,
          currency,
          metadata: {
            ...option,
          }
        })
      }} className="text-center cursor-pointer text-xs small:text-base" key={index}>
        <Image height={400} width={400} src={getUrl(option)} className="h-24 small:h-32 w-full rounded" alt={option.title} />
        <span className="mt-2 block">{option.title}</span>
      </div>
    })}
  </div >;
}


export default StyleEditor;


export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="white" />
  </svg>

}