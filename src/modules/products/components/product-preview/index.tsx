import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { motion } from 'framer-motion';
import { linearIntroAnimation } from "@lib/util/animation-util";
import { useFavorites } from "@lib/context/favorite-context";
// import { useMeCustomer } from "medusa-react";
import FavoriteIcon from "../favorite-item";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCategory } from "@lib/services/customizer";
import { useAccount } from "@lib/context/account-context";

const ProductPreview = ({
  id,
  title,
  handle,
  thumbnail,
  description = '',
  price,
  index = 0,
  collection,
}: ProductPreviewType) => {
  const { customer } = useAccount()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { data: category } = useQuery(['fetch_product_category', id], () => fetchProductCategory(id))
  const toggle = (id: string) => {
    if (isFavorite(id)) {
      removeFavorite(id, customer?.id)
    } else {
      addFavorite(id, customer?.id)
    }
  }

  return (
    (<Link href={`/${collection?.handle}/${category?.handle ?? 'default'}/${handle}`}>
      <motion.div
        {...linearIntroAnimation('left', index * 0.2, 0.55)}
        className={clsx("rounded-xl border small:h-[570px]")}>
        <>
          <div
            className="flex bg-white rounded-xl flex-col relative">
            <div className="absolute right-3 top-5 z-10 cursor-pointer">
              <FavoriteIcon
                favorite={isFavorite(id)}
                onClick={(e) => {
                  e.preventDefault();
                  toggle(id)
                }} />
            </div>
            <div
              className="p-5 select-none">
              <Thumbnail thumbnail={thumbnail} size="full" />
            </div>
            <div className={clsx("italic p-2 font-bold text-center rounded", {
              'bg-black text-white': index % 2 === 0,
              'bg-white': index % 2 !== 0,
            })}>
              <div className="flex justify-center items-center gap-x-2 mt-1">
                {price ? (
                  <>
                    {price.price_type === "sale" && (
                      <span className="line-through text-gray-500">
                        {price.original_price}
                      </span>
                    )}
                    <span
                      className={clsx("font-semibold", {
                        "text-rose-500": price.price_type === "sale",
                      })}
                    >
                      {price.calculated_price}
                    </span>
                  </>
                ) : (
                  <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
                )}
              </div>
            </div>
          </div>
        </>
        <div className="p-5 flex flex-col gap-2">
          <span className="font-bold uppercase">{title}</span>
          <span className="line-clamp-3">{description}</span>
        </div>
      </motion.div>

    </Link>)
  );
}



export default ProductPreview
