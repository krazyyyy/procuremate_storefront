import { useFavorites } from "@lib/context/favorite-context";
import { linearIntroAnimation } from "@lib/util/animation-util";
import { Product } from "types/medusa";
import { useRouter } from "next/router";
import { useProduct } from "medusa-react";
import { motion } from 'framer-motion'
import clsx from "clsx";
import FavoriteIcon from "@modules/products/components/favorite-item";
import ThumbnailImage from "@modules/products/components/thumbnail-image";
import { ProductProvider } from "@lib/context/product-context";
import { ProductPrice } from "@pages/products/[handle]";


const FavoriteItem = ({ prod, index, onClick }:
  {
    prod: Product,
    index: number,
    onClick: React.MouseEventHandler
  }) => {
  const router = useRouter()
  const { isFavorite } = useFavorites()
  const { product } = useProduct(prod.id);

  return <motion.div
    {...linearIntroAnimation('left', index * 0.2, 0.55)}
    className={clsx("rounded-xl", {
      'bg-white': index % 2 !== 0,
      'bg-[#f5f5f5]': index % 2 === 0,
    })}>
    <>
      <div
        className="flex bg-[#D9D9D9] rounded-xl flex-col relative">
        <div className="absolute right-3 top-5 z-10 cursor-pointer">
          <FavoriteIcon
            favorite={isFavorite(prod.id)}
            onClick={onClick}
            loading={false} />
        </div>
        <div
          onClick={() => router.push('/products/' + prod.handle)}
          className="p-0 select-none">
          <ThumbnailImage height={400} width={400} alt={prod.title} src={prod.thumbnail ?? '/images/product-1.png'} objectFit="cover" className="" />
        </div>
        <div className={clsx("italic p-2 font-bold text-center rounded", {
          'bg-black text-white': index % 2 === 0,
          'bg-white': index % 2 !== 0,
        })}>

          {product && <ProductProvider product={product}>
            <ProductPrice product={product} />
          </ProductProvider>}
        </div>
      </div>
      <div
        onClick={() => router.push('/products/' + prod.handle)}
        className="flex flex-col gap-2 p-3">
        <span className="font-bold uppercase">{prod.title}</span>
        <span className="line-clamp-3">{prod.description}</span>
      </div>
    </>
  </motion.div>
}

export default FavoriteItem