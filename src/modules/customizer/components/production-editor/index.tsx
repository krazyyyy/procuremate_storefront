import { useCustomizer } from "@lib/context/customizer-context";
import SectionLabel from "../section-label";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ProductionMethod } from "../../../../types/ffg";
import Checkbox from "../../../common/components/checkbox";
import Input from "../../../common/components/input";
import clsx from "clsx";

type FormValues = {
  height: string
  width: string
}


const ProductionEditor = ({ }) => {
  const {
    productionMethods,
    addChange,
    currency,
    deleteChange,
    currentLayer,
    setCurrent,
    getCurrencyRate,
    current,
  } = useCustomizer()
  const [method, setMethod] = useState<ProductionMethod | undefined>()

  const handleInstructionsChange = (text?: string) => {
    if (method) {
      method.instructions = text;
      let newMethod = { ...method };
      newMethod.instructions = text;
      setMethod(newMethod)
    }
  }

  useEffect(() => {
    if (method) {
      setCurrent({ ...current, production: method })
      addChange({
        id: currentLayer?.id ?? 'production',
        image_url: '',
        layer_name: 'Production',
        name: method.title,
        price: method.price,
        metadata: { ...method },
        currency,
      }, false, true)
    }
  }, [method])

  useEffect(() => {
    if (current.production) {
      setMethod(current.production)
    }
  }, [current.production])

  const handleMethodClick = (met: ProductionMethod) => {
    if (met == method) {
      setMethod(undefined)
      deleteChange({
        id: currentLayer?.id ?? 'production',
        image_url: '',
        layer_name: 'Production',
        name: met.title,
        price: met.price,
        currency,
        metadata: {
          ...met,
        }
      })
      return
    } else {
      setMethod(met);
      addChange({
        id: currentLayer?.id ?? 'production',
        image_url: '',
        layer_name: 'Production',
        name: met.title,
        price: met.price,
        currency,
        metadata: {
          ...met,
        }
      })
    }

  }

  const getPrice = useCallback((price: number) => {
    return Number(price * getCurrencyRate()).toFixed(0)
  }, [])

  return <div className="flex flex-col gap-2">
    <SectionLabel>
      Production
    </SectionLabel>
    <div className="flex flex-col gap-3">
      {productionMethods.filter(m => m.title.length > 0).map((met) => {
        return <Checkbox
          reverted
          key={met.id}
          className="text-xs small:text-base text-left items-start"
          label={`${met.title.toUpperCase()} [ Price: ${currency} ${getPrice(Number(met.price))} ], ${met.description}`}
          checked={met.id === method?.id}
          onChange={() => handleMethodClick(met)} />
      })}
    </div>
    <hr className="my-4" />
    <SectionLabel>
      Product Instructions
    </SectionLabel>
    <textarea
      value={method?.instructions}
      name={'instructions'}
      placeholder={"Enter your product instructions"}
      onChange={(e) => handleInstructionsChange(e.target.value)}
      className={clsx(
        "pt-4 pb-2 block w-full px-4 mt-0 min-h-[250px] bg-transparent border appearance-none rounded-[5px]  focus:outline-none focus:ring-0 focus:border-gray-500 border-[#757575]",
      )}
    />

  </div >;
}


export default ProductionEditor;

export const ArrowIcon = ({ ...attributes }) => {
  return <svg {...attributes} width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.5 5.15712L1.13313 0.0872344C1.00996 -0.0291186 0.810255 -0.0291186 0.687127 0.0872345L0.0923877 0.649019C0.0332207 0.704872 -2.71854e-07 0.780666 -2.68401e-07 0.859679C-2.64947e-07 0.938691 0.0332207 1.01448 0.0923877 1.07034L6.277 6.9127C6.40017 7.02906 6.59987 7.02906 6.723 6.9127L12.9076 1.07038C12.9668 1.01452 13 0.93873 13 0.859717C13 0.780705 12.9668 0.704911 12.9076 0.649058L12.3129 0.087274C12.1897 -0.029079 11.99 -0.029079 11.8669 0.087274L6.5 5.15712Z" fill="white" />
  </svg>

}