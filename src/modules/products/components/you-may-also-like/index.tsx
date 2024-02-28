import React, { useMemo, useRef, useState } from 'react'
import ProductItemCard from '../product-item-card';
import { useInView } from 'framer-motion';
import { staggeredAnimation } from '@lib/util/animation-util';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { StoreGetProductsParams } from '@medusajs/medusa';
import { useCart } from 'medusa-react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsList } from '../../../../lib/data';
import usePreviews from '../../../../lib/hooks/use-previews';

type RelatedProductsProps = {
  product: PricedProduct
}

function YouMayAlsoLike({ product }: RelatedProductsProps) {
  const ref = useRef(null)
  const inview = useInView(ref)

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

  const { data, } =
    useInfiniteQuery(
      [`infinite-products-${product.id}`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )

  const previews = usePreviews({ pages: data?.pages as any, region: cart?.region })


  return <div ref={ref} className="flex-col content-container bg-[#f5f5f5]  font-montserrat flex items-center justify-center">
    <div className="flex items-center gap-3 justify-between w-full py-10">
      <div className="flex small:ml-20 justify-between items-center">
        <div className="flex gap-5">
          {/* <BackIcon size={32} />
          <ForwardIcon size={32} /> */}
        </div>
      </div>
      <span className="font-bold text-xl uppercase small:text-[40px]">
        You may also like
      </span>
    </div>

    <div className="w-full p-3 pb-10 group  relative">
      <div className="flex flex-col">
        <div className="flex py-10 small:ml-20 overflow-x-scroll gap-5" >
          {previews.map((p, index) => <ProductItemCard
            {...p}
            key={index}
            index={index}
            inView={inview}
            animation={staggeredAnimation(index, inview, { y: -50, x: 0, opacity: 1 })} />)}
        </div>
      </div>
    </div>
  </div>;
}

export default YouMayAlsoLike

