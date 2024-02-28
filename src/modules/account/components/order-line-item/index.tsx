import Image from "next/image";
import { motion } from 'framer-motion';
import { linearIntroAnimation } from "@lib/util/animation-util";
import { LineItem } from "@medusajs/medusa";
import { formatAmount, useOrder, useProduct } from "medusa-react";
import { Region } from "types/medusa";
import { JobCard } from "types/global";
import { useEffect, useState } from "react";
import { PricedVariant } from "@medusajs/medusa/dist/types/pricing";
import LineItemOptionsWithProduct from "../../../common/components/line-item-options-product";

interface OrderLineItemProps {
  item: LineItem,
  index: number,
  region: Region,
  discount: number,
  jobcard?: JobCard,
  onJobSelect: (job: any) => void,
  id: string,
}

const OrderLineItem = ({ item, id, region, index, jobcard, discount = 0, onJobSelect, }: OrderLineItemProps) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }
    if (discount > 0) {
      const d = (amount * discount) / 100
      amount = amount - d;
    }
    return formatAmount({ amount, region: region, includeTaxes: false })
  }

  const { product, isLoading } = useProduct(item.variant.product_id)

  const [variant, setVariant] = useState<Omit<PricedVariant, 'beforeInsert'> | null>(null);

  useEffect(() => {
    var v = product?.variants.find(v => v.id === item.variant_id);
    if (v) {
      setVariant(v)
    }
  }, [product])

  return <motion.div
    {...linearIntroAnimation('left', index * 0.15, 0.45)}
    className="w-full flex items-start justify-between border-b py-4 gap-4">
    <motion.div
      {...linearIntroAnimation('right', index * 0.15, 0.75)}
      className="bg-[#d9d9d9] p-3 rounded-lg">
      <Image objectFit="contain" src={item?.thumbnail ?? '/images/gallery-short-jacket.png'} alt={item?.title} height={100} width={100} />
    </motion.div>
    <div className="flex flex-col justify-start gap-2 h-full w-full">
      <div className="flex gap-2 items-end">
        <span className="font-bold text-xl">
          {item?.title}
        </span>
        <span className="font-bold text-base">
          ({item?.description})
        </span>
      </div>
      {variant && product && <LineItemOptionsWithProduct variant={variant} product={product} />}
      <span className="text-sm">{item?.quantity ?? 0} Items</span>
    </div>
    <div className="flex items-end justify-between h-20 flex-col">
      <motion.button
        {...linearIntroAnimation('left', 0.3)}
        className="whitespace-nowrap font-bold">
        {getAmount(item.unit_price - (item?.discount_total ?? 0))}
      </motion.button>
      {jobcard && <motion.button
        onClick={() => onJobSelect(jobcard)}
        {...linearIntroAnimation('left', 0.3)}
        className="underline text-xs hover:font-bold transition-all duration-300">
        View Job Card
      </motion.button>}
    </div>
  </motion.div>
}


export default OrderLineItem