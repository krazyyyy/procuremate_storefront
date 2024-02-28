import React, { useMemo, useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion';
import { linearIntroAnimation } from '@lib/util/animation-util';
import ProductItemCard from '../product-item-card';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { StoreGetProductsParams } from '@medusajs/medusa';
import { useCart } from 'medusa-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsList } from '@lib/data';
import usePreviews from '../../../../lib/hooks/use-previews';

type RelatedProductsProps = {
  product: PricedProduct
}

function SimilarProducts({ product }: RelatedProductsProps) {
  const ref = useRef(null);
  const { cart } = useCart()

  const queryParams: StoreGetProductsParams = useMemo(() => {
    const params: StoreGetProductsParams = {}

    if (cart?.id) {
      params.cart_id = cart.id
    }

    if (product.collection_id) {
      params.collection_id = [product.collection_id]
    }

    if (product.tags) {
      params.tags = product.tags.map((t) => t.value)
    }

    params.is_giftcard = false

    return params
  }, [product, cart?.id])

  const inView = useInView(ref)

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-${product.id}`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )

  const previews = usePreviews({ pages: data?.pages as any, region: cart?.region })


  return <div ref={ref} className="flex-col pt-10 content-container bg-[#f5f5f5]  font-montserrat flex items-center justify-center">
    <div className="flex items-center gap-3 justify-between w-full py-10">
      <motion.span
        initial="hidden"
        animate={{
          x: inView ? 0 : -20,
          opacity: inView ? 1 : 0,
        }}
        // transition={linearIntroAnimation().transition}
        className="font-bold block text-xl uppercase small:text-[40px]">
        Similar products
      </motion.span>
      <div className="flex justify-between items-center mr-0 small:mr-20">
        <div className="flex gap-5">
          <motion.div initial="hidden"
            animate={{
              x: inView ? 0 : -20,
              opacity: inView ? 1 : 0,
            }}
            transition={linearIntroAnimation().transition} className="div">
            {/* <BackIcon size={32} /> */}
          </motion.div>
          <motion.div initial="hidden"
            animate={{
              x: inView ? 0 : 20,
              opacity: inView ? 1 : 0,
            }}
            transition={linearIntroAnimation().transition} className="div">
            {/* <ForwardIcon size={32} /> */}
          </motion.div>
        </div>
      </div>
    </div>

    <div className="w-full p-3 group  relative">
      <div className="flex flex-col">
        <div dir='rtl' className="flex py-10 mr-0 small:mr-20 overflow-x-scroll gap-5" >
          {previews.map((p, index) =>
            <ProductItemCard
              {...p}
              animation={linearIntroAnimation('right', index * 0.2, 0, inView)}
              inView={inView}
              key={index}
              index={index} />)}
        </div>
      </div>
    </div>
  </div>;
}

export default SimilarProducts


