import React, { useEffect, useState } from 'react'
import clsx from "clsx";
import { ProductOptionValue } from '@medusajs/medusa';
import { PricedProduct, PricedVariant } from '@medusajs/medusa/dist/types/pricing';
import { useQuery } from '@tanstack/react-query';
import { fetchProductCategory } from '@lib/services/customizer';
import { fetchAllSizes } from '../../../../pages/size-chart';

enum QUANTITY_ACTION {
  INCREASE,
  DECREASE,
}

// const rows = []

type SizeTableProps = {
  product: PricedProduct
  amount?: boolean
  title: string
  current: any
  updateOption: any
  option: any
  height?: number
  weight?: number
  className?: string
}

type Guide = {
  height: string
  weight: string
  type: string
  size: string
}



export default function SizeTable({
  product,
  amount = false,
  title = "",
  current,
  updateOption,
  option,
  height,
  weight,
  ...props }: SizeTableProps) {

  const { data: productCategory, } = useQuery(['fetch_product_cat', product?.id], () => fetchProductCategory(product.id!), { keepPreviousData: true })
  const { data: categorySizes } = useQuery(['fetch-category-sizes'], () => fetchAllSizes(), { keepPreviousData: true })
  const [sizeGuides, setSizeGuides] = useState<Guide[]>([])

  useEffect(() => {
    const guides: Guide[] = [];
    if (productCategory && categorySizes) {
      for (var cat of categorySizes) {
        if (cat?.category_id?.id === productCategory?.id) {
          if (cat.column_one.toLowerCase().includes('size') && cat.column_three.toLowerCase().includes('length') && cat.column_four.toLowerCase().includes('weight')) {
            for (const val of (cat?.values ?? [])) {
              var guide = { size: val.column_one, height: val.column_three, weight: val.column_four, type: cat.type }
              if (!guides.includes(guide))
                guides.push(guide)
            }
          }
        }
      }
    }
    setSizeGuides(guides)
  }, [categorySizes, productCategory])


  const { options } = product ?? {};

  useEffect(() => {
    if (!options) return;
    let SIZES: ProductOptionValue[] = [];
    const { id } = option ?? {};
    let values: any = [];
    product.variants?.map((v: PricedVariant) => {
      v.options?.forEach((o) => {
        if (o.option_id == id && !values?.includes(o.value)) {
          values.push(o.value);
          SIZES.push(o);
        }
      })
    })
    var sizes = new Set([...SIZES])
    setSizes([...sizes])
    if (option) {
      updateOption({ [option.id]: SIZES[0].value })
    }
  }, [options, product, option])

  const [sizes, setSizes] = useState<ProductOptionValue[]>([]);

  const [selected, setSelected] = useState<any>({ x: 0, y: 0 })
  const [amounts, setAmounts] = useState<number[][]>([Array(sizes.length).fill(0), Array(sizes.length).fill(0), Array(sizes.length).fill(0)]);

  const handleQuantityChange = (index: number, x: number, y: number, action: QUANTITY_ACTION) => {
    const currentAmount = amounts[x][y];
    let updatedAmount;

    if (action === QUANTITY_ACTION.INCREASE) {
      updatedAmount = currentAmount + 1;
    } else {
      updatedAmount = Math.max(currentAmount - 1, 0);
    }

    handleAmountChange(x, y, updatedAmount);
  };


  const handleAmountChange = (x: number, y: number, value: number) => {
    const updatedAmounts = [...amounts];
    updatedAmounts[x][y] = value;
    setAmounts(updatedAmounts);
  };


  const getActive = (x: number, y: number): string => {
    if (x === selected.x && y == selected.y) return ' bg-primary';
    return '';
  }

  const getCol = (type: string): number => {
    type = type.toLowerCase();
    if (type.includes('child')) {
      return 0;
    }
    if (type.includes('women')) {
      return 2;
    }
    if (type.includes('men')) {
      return 1;
    }
    return 0
  }

  const calculateSize = (height: number, weight: number) => {
    for (var guide of sizeGuides) {
      var cm = Number(guide.height.replace('"', '')) * 2.54;
      const weightRange = guide?.weight?.replaceAll('kg', '')?.split('-');
      const weightMin = parseFloat(weightRange[0]);
      const weightMax = parseFloat(weightRange[1]);
      if (weight >= weightMin && weight <= weightMax) {
        return [guide.size, getCol(guide.type)];
      }
    }
    return ['', 0]
  };

  useEffect(() => {
    if (height && weight) {
      // Logic to auto-select size based on height and weight
      const [autoSelectedSize, column] = calculateSize(height, weight);
      if (autoSelectedSize) {
        // If the selected size matches the auto-selected size, update the option
        updateOption({ [option.id]: autoSelectedSize });
      }
      const selectedIndex = sizes.findIndex((s) => s.value === autoSelectedSize);
      if (selectedIndex !== -1) {
        setSelected({ x: column, y: selectedIndex });
      }
    }

  }, [height, weight]);


  const handleCellClick = (x: number, y: number) => {
    // var item = `${rows[x]} ${sizes[y]}`
    updateOption({ [option.id]: sizes[y].value })
    setSelected({ x, y })
  };



  return <div {...props}>
    <span className='font-bold my-3 block uppercase'>{title}</span>
    <table className='bg-black w-full rounded-lg border-collapse'>
      {/* <thead className='text-white'>
        <tr>
          <th className='py-3'>Size</th>
        </tr>
      </thead> */}
      <tbody className='bg-white border rounded-b select-none'>
        {sizes.map((s: ProductOptionValue, index) => {
          var cls = 'text-center h-10 border-2 cursor-pointer border-black';
          return (
            <tr key={index}>
              <td onClick={() => handleCellClick(0, index)} className={clsx(cls + getActive(0, index))}>
                <div className='flex items-center'>
                  <span className='block w-full'> {s.value}</span>
                  {amount && <AmountInput
                    value={amounts[0][index]}
                    onChange={(value) => handleAmountChange(0, index, parseInt(value))} />}
                </div>
              </td>
              {/* <td onClick={() => handleCellClick(1, index)} className={clsx(cls + getActive(1, index))}>
                <div className='flex items-center'>
                  <span className='block w-full'> {s.value}</span>
                  {amount && <AmountInput
                    value={amounts[1][index]}
                    onChange={(value) => handleAmountChange(1, index, parseInt(value))} />}
                </div>
              </td>
              <td onClick={() => handleCellClick(2, index)} className={clsx(cls + getActive(2, index))}>
                <div className='flex items-center'>
                  <span className='block w-full'> {s.value}</span>
                  {amount && <AmountInput
                    value={amounts[2][index]}
                    onChange={(value) => handleAmountChange(2, index, parseInt(value))} />}
                </div>
              </td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
}

const AmountInput = ({ value, onChange }: { value: any, onChange: (value: any) => void }) => {
  return <div className='group bg-black h-10 text-white flex items-center justify-center'>
    {/* {value} */}
    <input
      type="number"
      value={value}
      className='[appearance:textfield] select-none outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-[40px]  h-10 bg-black text-white text-center'
      onChange={(e) => onChange(e.target.value)}
    />
    <div className='px-1'>
      <ArrowTop onClick={() => {
        onChange(value + 1)
      }}
      />

      <ArrowBottom onClick={() => {
        if (value > 0) {
          onChange(value - 1)
        }
      }} />

    </div>
  </div>
}

const ArrowTop = ({ size = 12, ...props }) => {
  return <svg {...props} width={size} height={size} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/1200/svg">
    <path d="M3.86293 1.22059L7.05302 4.57857C7.12624 4.65563 7.24494 4.65563 7.31813 4.57857L7.67165 4.20647C7.70682 4.16948 7.72656 4.11928 7.72656 4.06695C7.72656 4.01461 7.70682 3.96441 7.67165 3.92742L3.99548 0.0577987C3.92227 -0.0192664 3.80356 -0.0192664 3.73037 0.0577986L0.0542052 3.92739C0.0190361 3.96439 -0.000710663 4.01459 -0.000710665 4.06692C-0.000710667 4.11925 0.0190361 4.16945 0.0542052 4.20645L0.407722 4.57854C0.480935 4.6556 0.59964 4.6556 0.672828 4.57854L3.86293 1.22059Z" fill="white" />
  </svg>;
}
const ArrowBottom = ({ size = 12, ...props }) => {
  return <svg width={size} height={size} {...props} viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.86364 3.77941L0.673538 0.421436C0.600326 0.34437 0.48162 0.34437 0.408432 0.421436L0.0549157 0.793527C0.0197466 0.83052 -1.80059e-07 0.880722 -1.77772e-07 0.933054C-1.75484e-07 0.985387 0.0197466 1.03559 0.0549158 1.07258L3.73108 4.9422C3.8043 5.01927 3.923 5.01927 3.99619 4.9422L7.67236 1.07261C7.70753 1.03561 7.72727 0.985413 7.72727 0.93308C7.72727 0.880747 7.70753 0.830546 7.67236 0.793553L7.31884 0.421462C7.24563 0.344397 7.12692 0.344397 7.05373 0.421462L3.86364 3.77941Z" fill="white" />
  </svg>;
}