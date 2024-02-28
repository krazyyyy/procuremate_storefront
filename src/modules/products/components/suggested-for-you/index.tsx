import React, { useMemo, useRef } from 'react'
import ProductItemCard from '../product-item-card';
import { useInView } from 'framer-motion';
import { linearIntroAnimation, staggeredAnimation } from '@lib/util/animation-util';
import { motion } from 'framer-motion';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchProductsList } from 'lib/data';
import { useCart } from 'medusa-react';
import { StoreGetProductsParams } from '@medusajs/medusa';
import usePreviews from 'lib/hooks/use-previews';
import SkeletonProductPreview from '../../../skeletons/components/skeleton-product-preview';
import repeat from 'lib/util/repeat';

function SuggestedForYou() {
  const ref = useRef(null)
  const inView = useInView(ref)

  const { data: allData, isError, isLoading: loading } = useQuery([], ({ pageParam, queryKey }) => fetchProductsList({ pageParam, queryParams }))
  const product = allData?.response.products.at(0);
  const { cart } = useCart()

  const queryParams: StoreGetProductsParams = useMemo(() => {
    const params: StoreGetProductsParams = {}

    if (cart?.id) {
      params.cart_id = cart.id
    }

    if (product?.collection_id) {
      params.collection_id = [product.collection_id]
    }

    if (product?.tags) {
      params.tags = product.tags.map((t) => t.value)
    }

    params.is_giftcard = false

    return params
  }, [product, cart?.id])

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-${product?.id}`, queryParams, cart],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )


  const previews = usePreviews({ pages: data?.pages as any, region: cart?.region })

  if (isLoading) {
    return <div className='flex items-center justify-center gap-3 w-full py-10'>
      {repeat(5).map((i) => <SkeletonProductPreview key={i} />)}
    </div>
  }

  return <div ref={ref} className="flex-col content-container bg-[#f5f5f5]  font-montserrat flex items-center justify-center">
    <div className="flex items-center gap-3 justify-between w-full py-10">
      <motion.span
        {...linearIntroAnimation('left')}
        className="font-bold text-xl uppercase small:text-[40px]">
        Suggested for you
      </motion.span>
      <motion.div
        {...linearIntroAnimation('right')}
        className="flex small:mr-20 justify-between items-center">
        <div className="flex gap-5">
          {/* <BackIcon size={32} />
          <ForwardIcon size={32} /> */}
        </div>
      </motion.div>
    </div>

    <div className="w-full p-3 pb-10 group  relative">
      <div className="flex flex-col">
        <div dir='rtl' className="flex py-10 small:mr-20 overflow-x-scroll gap-5" >
          {product && previews.map((p, index) => <ProductItemCard
            key={index}
            index={index}
            {...p}
            inView={inView}
            animation={staggeredAnimation(index, inView, { y: -50, x: 0, opacity: 1 })} />
          )}
        </div>
      </div>
    </div>
  </div>;
}

export default SuggestedForYou

