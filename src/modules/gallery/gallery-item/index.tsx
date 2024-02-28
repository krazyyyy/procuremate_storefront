
import React from "react";
import { motion } from 'framer-motion'
import { Gallery } from "types/global";
import { useFavorites } from "@lib/context/favorite-context";
import { useAccount } from "@lib/context/account-context";
import Link from "next/link";
import { linearIntroAnimation } from "@lib/util/animation-util";
import FavoriteIcon from "../../products/components/favorite-item";
import ThumbnailImage from "../../products/components/thumbnail-image";
import clsx from "clsx";

const GalleryItem = ({ gallery, index, }:
  {
    gallery: Gallery,
    index: number,
  }) => {
  const { customer } = useAccount()
  const product = gallery?.product_id;
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!customer) return;
    if (isFavorite(product?.id)) {
      removeFavorite(product.id, customer.id);
    } else {
      addFavorite(product.id, customer.id);
    }

  }

  return (
    <Link className="p-[5px]" href={'/gallery/' + gallery?.handle} passHref>

      <motion.div
        {...linearIntroAnimation('left', index * 0.2, 0.55)}
        className={clsx("rounded-xl cursor-pointer max-w-sm", {
          'bg-white': index % 2 !== 0,
          'bg-[#f5f5f5]': index % 2 === 0,
        })}
      >
        <div
          className="flex bg-[#D9D9D9] rounded-xl flex-col relative">
          <div className="absolute right-5 top-5 z-10">
            <FavoriteIcon favorite={isFavorite(product?.id)} onClick={toggleFavorite} />
          </div>
          <div className="flex flex-col">
            <div className="p-5 select-none">
              <ThumbnailImage
                height={400}
                width={400}
                alt={product?.collection_id ?? ''}
                src={gallery?.images[0] ?? product?.thumbnail ?? '/images/gallery-short-jacket.png'}
                objectFit="cover"
                className="" />
            </div>
            <div className={clsx("italic p-2 font-bold text-center rounded", {
              'bg-black text-white': index % 2 === 0,
              'bg-white': index % 2 !== 0,
            })}>
            </div>
          </div>
        </div>
        <div
          className="flex cursor-pointer flex-col gap-2 p-3">
          <span className="font-bold uppercase">{gallery?.title ?? product?.title}</span>
          <span className="line-clamp-3">{gallery?.description ?? product?.description}</span>
        </div>
      </motion.div>

    </Link>
  );
}


export default GalleryItem