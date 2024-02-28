import clsx from "clsx"
import { useRouter } from "next/router"
import { linearIntroAnimation } from "../../../../lib/util/animation-util"
import { motion } from 'framer-motion';
import Image from "next/image";
import { Product } from "../../../../types/medusa";
import { ProductPrice } from "../../../../pages/products/[handle]";
import { ProductProvider } from "../../../../lib/context/product-context";
import { useQuery } from "@tanstack/react-query";
import { fetchProductCategory } from "../../../../lib/services/customizer";

const ProductItem = ({ product, index, onClick, favorite }:
  {
    product: Product,
    favorite: boolean,
    index: number,
    onClick: React.MouseEventHandler
  }) => {
  const router = useRouter();

  const { data: category } = useQuery(['fetch_product_category', product.id], () => fetchProductCategory(product.id))

  return <motion.div
    {...linearIntroAnimation('left', index * 0.2, 0.55)}
    className={clsx("rounded-xl cursor-pointer", {
      'bg-white': index % 2 !== 0,
      'bg-[#f5f5f5]': index % 2 === 0,
    })}
  >
    <>
      <div
        className="flex bg-[#D9D9D9] rounded-xl flex-col relative">
        <FavoriteButton favorite={favorite} onClick={onClick} />
        <div onClick={() => router.push(`/${product.collection?.handle}/${category?.handle ?? 'default'}/${product.handle}`)} className="flex flex-col">
          <div className="p-5 select-none">
            <Image
              height={400}
              width={400}
              alt={product.collection_id ?? ''}
              src={product.thumbnail ?? '/images/gallery-short-jacket.png'}
              objectFit="cover"
              className="" />
          </div>
          <div className={clsx("italic p-2 font-bold text-center rounded", {
            'bg-black text-white': index % 2 === 0,
            'bg-white': index % 2 !== 0,
          })}>
            <ProductProvider product={product as any}>
              <ProductPrice product={product as any} />
            </ProductProvider>
          </div>
        </div>
      </div>
      <div
        onClick={() => router.push('/products/' + product.handle)}
        className="flex cursor-pointer flex-col gap-2 p-3">
        <span className="font-bold uppercase">{product.title}</span>
        <span className="line-clamp-3">{product.description}</span>
      </div>
    </>
  </motion.div>
}

export default ProductItem;

const FavoriteButton = ({ favorite, onClick }: { favorite: boolean, onClick: React.ReactEventHandler }) => {
  return <div className="absolute right-3 top-5 z-10 cursor-pointer">
    {
      favorite ?
        <svg onClick={onClick} width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.9999 8.74776C14 -1.20959 2 2.7927 2 12.9504C2 23.1082 22.0001 37 22.0001 37C22.0001 37 41 22.5506 41 12.9504C41 3.35018 30 -1.20957 23 8.74776L22.0001 9.54309L20.9999 8.74776Z" fill="#FFCC4F" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg> :
        <svg onClick={onClick} width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.9999 8.74776C14 -1.20959 2 2.7927 2 12.9504C2 23.1082 22.0001 37 22.0001 37C22.0001 37 41 22.5506 41 12.9504C41 3.35018 30.0001 -1.20957 23 8.74776L22.0001 9.54308L20.9999 8.74776Z" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    }
  </div>
}