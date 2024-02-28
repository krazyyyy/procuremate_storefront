import { motion } from "framer-motion"
import FavoriteIcon from "../favorite-item"
import clsx from "clsx"
import { ProductPreviewType } from "types/global"
import { useFavorites } from "@lib/context/favorite-context"
import ThumbnailImage from "../thumbnail-image"
import Link from "next/link"
import { useState } from "react"
import { useAccount } from "@lib/context/account-context"
import { useQuery } from "@tanstack/react-query"
import { fetchProductCategory } from "@lib/services/customizer"


const ProductItemCard = ({ id, thumbnail, handle, title, description, price, index, animation, collection }:
  { index: number, inView: boolean, animation: {} }
  & ProductPreviewType) => {
  const { customer } = useAccount()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const [loading, setLoading] = useState(false);
  const { data: category } = useQuery([id, 'product_category'], () => fetchProductCategory(id))

  const handleFavorite = async (id: string) => {
    if (!customer) return;
    setLoading(true);

    if (isFavorite(id)) await removeFavorite(id, customer.id)
    else await addFavorite(id, customer.id)
    setLoading(false);
  }
  return (
    <Link href={`/${collection?.handle}/${category?.handle ?? 'default'}/${handle}`} passHref legacyBehavior>
      <motion.div
        {...animation} className="bg-white rounded-xl border min-w-[340px] max-w-[384px]">
        <div className="flex rounded-md  flex-col relative">
          <div className="absolute right-3 top-5 z-10 cursor-pointer">
            <FavoriteIcon
              loading={loading}
              onClick={(e) => {
                e.preventDefault()
                handleFavorite(id)
              }}
              favorite={isFavorite(id)} />
          </div>
          <div className="h-[400px] overflow-hidden items-center justify-center flex p-5 select-none">
            <ThumbnailImage
              placeholder="/images/cat-2.png"
              height={400} width={400} alt={id} src={thumbnail ?? ''}
              className="object-cover shadow-none" />
          </div>
          <div className={clsx("italic border-t p-2 font-bold text-center rounded", {
            'bg-black text-white': index % 2 === 0,
            'bg-white shadow': index % 2 !== 0,
          })}>
            {price?.calculated_price}
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <span className="font-bold uppercase">{title}</span>
          <span className="line-clamp-3">{description}</span>
        </div>
      </motion.div>
    </Link>
  );
}

export default ProductItemCard;