import Image from "next/image";
import { ProductProvider } from "lib/context/product-context";
import { ProductPrice } from "pages/products/[handle]";
import Link from "next/link";
import FavoriteIcon from "../favorite-item";
import { useState } from "react";
import { useFavorites } from "lib/context/favorite-context";
import { fetchProductCategory } from "lib/services/customizer";
import { useCollection } from "medusa-react";
import { useQuery } from "@tanstack/react-query";
import { Customer, Product } from "types/medusa";
import clsx from "clsx";

const OurProductItem = ({ p, customer, index }: { p: Product, customer?: Customer, index: number }) => {
  const [loading, setLoading] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const { collection } = useCollection(p.collection_id!)
  const { data: category } = useQuery(['fetch_product_category', p.id], () => fetchProductCategory(p.id))

  const toggleFavorite = async (product: Product) => {
    setLoading(true);
    if (isFavorite(product.id)) {
      await removeFavorite(product.id!, customer?.id)
    } else
      await addFavorite(product.id!, customer?.id)
    setLoading(false);
  }

  return (
    <Link href={`/${collection?.handle}/${category?.handle}/${p.handle}`} passHref legacyBehavior>
      <div
        className="bg-white rounded-xl border max-w-[384px] h-[590px]">
        <div className="flex w-96  flex-col relative">
          <div className="absolute right-3 top-5 z-10 cursor-pointer">
            <FavoriteIcon
              loading={loading}
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(p)
              }}
              favorite={isFavorite(p.id)} />
          </div>
          <div className="h-[400px] overflow-hidden items-center justify-center flex p-5 select-none">
            <Image
              height={420}
              width={420}
              alt={p.title}
              src={p.thumbnail ?? '/images/gallery-short-jacket.png'}
              className='object-cover shadow-none'
            />
          </div>
          <div className={clsx("italic relative p-2 font-bold text-center rounded border-t", {
            'bg-black text-white': index % 2 === 0,
            'bg-white shadow': index % 2 !== 0,
          })}>
            <ProductProvider product={p as any}>
              <ProductPrice product={p as any} />
            </ProductProvider>
          </div>
        </div>
        <div className="flex flex-col gap-2 p-3 max-w-sm">
          <span className="font-bold uppercase">{p.title}</span>
          <span className="line-clamp-3">{p.description}</span>
        </div>
      </div>
    </Link>
  );
}



export default OurProductItem;