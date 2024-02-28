import React, { useEffect, useState } from 'react'
import clsx from "clsx";
import { Product } from '../../../../types/medusa';


export default function AvailableColors({ product }: { product: Product }) {

  const [colors, setColors] = useState<any>([]);
  const { options } = product;

  useEffect(() => {
    let COLORS: any = [];
    let stack: string[] = [];
    for (var option of options) {
      if (option.title.toLowerCase() === 'color') {
        const { id } = option;
        product.variants.map((v) => {
          v.options.forEach((o) => {
            if (o.option_id == id && !stack.includes(o.value)) {
              stack.push(o.value)
              COLORS.push(o);
            }
          })
        })
      }
    }

    setColors([...new Set(COLORS)]);
  }, [options, product])

  return <div className="my-10">
    <label className='text-sm uppercase font-bold'>Available Colors</label>
    <div className="flex gap-3 my-2 items-center flex-wrap">
      {colors.map((c: any, index: number) => {
        return <div key={index} className='text-center'>
          <div style={{ background: c.value }} className={clsx('h-[100px] w-[100px] rounded border mb-1')} />
          <span className='font-bold text-sm'>{c.value}</span>
        </div>
      })}
    </div>

  </div>
}