import Image from "next/image";
import { motion } from 'framer-motion';
import { linearIntroAnimation } from "@lib/util/animation-util";
import { LineItem } from "@medusajs/medusa";
import { Region } from "types/medusa";
import { getAmount } from "@lib/util/format";
import ThumbnailImage from "../../../products/components/thumbnail-image";

interface CheckoutCartItemProps {
  item: LineItem,
  index: number,
  region: Region,
  discount: number,
}


const CheckoutCartItem = ({ item, region, index = 0 }: CheckoutCartItemProps) => {
  return <motion.div
    {...linearIntroAnimation('left', index * 0.15, 0.45)}
    className="w-full flex items-start justify-between  gap-4">
    <motion.div
      {...linearIntroAnimation('right', index * 0.15, 0.75)}
      className="bg-[#d9d9d9] p-3 rounded-lg">
      <ThumbnailImage svgHeight={120} svgWidth={120} objectFit="contain" src={(item.metadata?.url ?? item.thumbnail) as string} alt={item?.title} height={100} width={100} />
    </motion.div>
    <div className="flex flex-col justify-between h-full w-full">
      <span className="font-bold text-xl">
        {item?.title}
      </span>
      <span className="font-bold text-base">
        ({item.description})
      </span>
      {String(item.metadata?.url).endsWith('svg') &&
      <div>
      <span className="underline">
        <a target="_blank" href={String(item.metadata?.url)}>
          Preview Customized Design
        </a>
        </span>
       
      </div>
      }

      <span className="text-sm">{item?.quantity ?? 0} Items</span>
    </div>
    <motion.button
      {...linearIntroAnimation('left', 0.3)}
      className="whitespace-nowrap font-bold">
      {getAmount(item.unit_price, region)}
    </motion.button>
  </motion.div>
}


export default CheckoutCartItem


