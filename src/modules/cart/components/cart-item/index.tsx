import Image from "next/image";
import { motion } from 'framer-motion';
import { linearIntroAnimation } from "@lib/util/animation-util";
import { LineItem } from "@medusajs/medusa";
import LineItemOptions from "@modules/common/components/line-item-options";
import { useState } from "react";
import { useCart } from "medusa-react";
import Spinner from "../../../common/icons/spinner";
import { useFavorites } from "../../../../lib/context/favorite-context";
import { toast } from "react-toastify";
import { Customer } from "../../../../types/medusa";


const SVGRenderer = ({ url = "", height = 400, width = 400 }: { url?: string, height?: number, width?: number }) => {
  return <object className="max-w-full max-h-full" width={width} height={height} type="image/svg+xml" data={url} />
}

interface CartItemProps {
  line_item: Omit<LineItem, 'beforeInsert'>,
  img?: string,
  name?: string,
  type?: string,
  region?: any,
  color?: string,
  size?: string,
  showSave?: boolean,
  onAmountChange: (value: number, line_id: string) => void,
  index: number,
  customer?: Customer,
  handleClear?: (line_item_id: string, cart_item_id: string) => void
}

const CartItem = ({ name, customer, region, onAmountChange, showSave = false, index = 0, line_item, handleClear }: CartItemProps) => {
  const { thumbnail } = line_item ?? { thumbnail: '/images/cart-1.png' };
  const { cart, setCart } = useCart();
  const [loading, setLoading] = useState(false);
  const { addFavorite, isFavorite } = useFavorites();
  const svg_url = line_item?.metadata?.url ?? thumbnail ?? '/images/product-1.png';

  // const handleClear = async () => {
  //   setLoading(true);
  //   await medusaClient.carts.lineItems.delete(line_item.cart_id, line_item.id);
  //   if (cart)
  //     setCart({ ...cart, items: cart?.items?.filter((c) => c.id !== line_item.id) })
  //   setLoading(false);
  // }

  const handleSaveForLater = async () => {
    setLoading(true);
    var res = await addFavorite(line_item.variant.product_id, customer?.id)
    if (res) {
      toast.success("Item added to favorites")
    }

    setLoading(false);
  }
  const [showTooltip, setShowTooltip] = useState(false);
  return <motion.div
    {...linearIntroAnimation('left', index * 0.15, 0.45)}
    // className="w-full h-full relative group flex flex-col items-center justify-center"
    className="w-full flex flex-row small:flex-nowrap flex-wrap items-start justify-between gap-4 ">


    <motion.div
      {...linearIntroAnimation('right', index * 0.15, 0.75)}
      className={`border-black-4 bg-[#d9d9d9] p-5 rounded-lg ${String(svg_url).endsWith('svg') ? 'pl-[70px]' : ''
        }`}
    >
      {
        String(svg_url).endsWith('svg') ? (
          <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-full h-full overflow-hidden p-1 group flex items-center justify-center mobile-scale"
            style={{
              maxWidth: '100%', // Ensure the SVG doesn't exceed its container's width
              maxHeight: '100%', // Ensure the SVG doesn't exceed its container's height
            }}
          >
            <SVGRenderer
              height={150}
              width={150}
              url={(svg_url ?? thumbnail ?? '/images/product-1.png') as string}
            />
          </div>

        ) : (
          <div
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="w-full h-full relative group"
            style={{
              maxWidth: '100%', // Ensure the image doesn't exceed its container's width
              maxHeight: '100%', // Ensure the image doesn't exceed its container's height
            }}
          >
            <Image
              objectFit="contain" // Adjust this property to your desired behavior (contain, cover, etc.)
              src={thumbnail ?? '/images/product-1.png'}
              alt={name ?? ''}
              height={200}
              width={600}
            />
          </div>
        )
      }
      {showTooltip && (
        <div className="tooltip absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 bg-gray-800 text-white text-xs rounded">
          Preview Your Customize Design
        </div>
      )}
    </motion.div>
    <div className="flex flex-col w-full">
      <div className="flex items-end gap-2">
        <span className="font-bold text-xl">
          {line_item?.title}
        </span>
        {line_item.order && <span className="font-bold text-base">
          ({line_item?.order?.total})
        </span>}
      </div>
      <LineItemOptions variant={line_item.variant} />
      <div className="border max-w-[100px] z-50 flex justify-between items-center p-1 px-3 border-black rounded">
        <button onClick={() => onAmountChange(line_item?.quantity - 1, line_item?.id)}>-</button>
        <span>{line_item?.quantity}</span>
        <button onClick={() => onAmountChange(line_item?.quantity + 1, line_item.id)}>+</button>
      </div>
    </div>
    <div className="min-w-max flex flex-col justify-end items-start md:items-end">
      <motion.button
        {...linearIntroAnimation('left', 0.3)}
        onClick={() => {
          if (typeof handleClear === 'function') {
            handleClear(line_item.id, line_item?.cart_id);
          }
        }}
        className="underline hover:bg-gray-200 px-2 rounded">{
          loading ? <Spinner /> : 'Clear'
        }</motion.button>
      {showSave && !isFavorite(line_item.variant.product_id) && <motion.button
        onClick={handleSaveForLater}
        {...linearIntroAnimation('right', 0.5)} className="underline  hover:bg-gray-200 px-2 rounded flex gap-2 items-center">
        {/* <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="hidden md:block" d="M7.30767 2.19767C4.61538 -1.60955 0 -0.0792607 0 3.80458C0 7.68844 7.69233 13 7.69233 13C7.69233 13 15 7.47524 15 3.80458C15 0.133891 10.7692 -1.60954 8.07692 2.19767L7.69233 2.50177L7.30767 2.19767Z" fill="black" />
        </svg> */}
        {loading ? <Spinner /> : 'Save for later'}
      </motion.button>}
      {String(svg_url).endsWith('svg') &&

        <motion.button className="underline  hover:bg-gray-200 px-2 rounded flex gap-2 items-center">
          <a className="underline" target="_blank" href={String(svg_url)}>
            Preview Customized Design
          </a>
        </motion.button>

      }
    </div>
  </motion.div>
}


export default CartItem