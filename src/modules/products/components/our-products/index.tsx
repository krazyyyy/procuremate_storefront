import React, { useEffect, useMemo, useState } from 'react'
import ArrowIcon from '../../../common/icons/arrow';
import TabItem from '../tab-item';
import { medusaClient } from '@lib/config';
import { ProductCollection } from '@medusajs/medusa';
import { Product } from 'types/medusa';
import { useMeCustomer, useProductCategories } from 'medusa-react';
import Link from 'next/link';

import repeat from 'lib/util/repeat';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import OurProductItem from './our-product-item';
import { useAccount } from '@lib/context/account-context';

const fetchProductsBasedOnCollection = async (collection_id: string) => {
  return medusaClient.products.list({ collection_id: [collection_id] }).then(({ products }) => products);
}
export const fetchAllCollections = async () => {
  return medusaClient.collections.list().then(({ collections }) => collections)
}


function OurProductsRow({ collection, collections, setCollection }: { collection: ProductCollection | undefined, collections: ProductCollection[], setCollection: (col: any) => void }) {
  const { customer } = useAccount()
  const [current, setCurrent] = useState<ProductCollection | null>(null);
  const [products, setProducsts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false);
  const {
    product_categories: categoryData,
    isLoading
  } = useProductCategories({ expand: 'products' })

  const handleCollectionChange = async (collection: ProductCollection) => {
    setLoading(true);
    setCurrent(collection)
    setCollection(collection);
    var prods = await fetchProductsBasedOnCollection(collection.id)
    setProducsts(prods as any)
    setLoading(false);
  }


  useEffect(() => {
    if (!collections) return;
    var c = collections.filter(c => c.handle == 'ready-made').at(0);
    if (!collection && c)
      handleCollectionChange(c);
  }, [collections, collection])



  if (isLoading) {
    return <div className='flex gap-4 p-5 '>
      {repeat(4).map((index) => (
        <div key={index} className='w-full'>
          <SkeletonProductPreview />
        </div>
      ))}
    </div>

  }


  return <>
    <div className="flex-col px-0 content-container pt-10  font-montserrat flex items-center justify-center">
      <div className="flex items-center gap-3 justify-end w-full px-4 py-10">
        <ArrowIcon className="pt-6" size={50} style={{ rotate: '180deg' }} />
        <span className="font-bold text-xl small:text-[40px] italic">
          Our Products
        </span>
      </div>

      <div className="flex w-full px-3 items-center flex-wrap justify-center">
        {collections.map((c) => <TabItem
          key={c.id} title={c.title}
          active={current?.title == c.title}
          onClick={() => handleCollectionChange(c)} />)}
      </div>
      <div className="w-full cursor-pointer bg-[#f5f5f5] roundex-xl p-3 pb-10 group  relative">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
            </div>
            <Link href={"/products/"} className="underline font-medium">
              See all
            </Link>

          </div>
          <div className="flex py-10 overflow-x-scroll gap-5" >
            {loading ? repeat(4).map((index) => (
              <div key={index} className='w-full bg-gray-400 rounded-lg p-4'>
                <SkeletonProductPreview />
              </div>
            ))
              : products.map((p, index) => <OurProductItem
                index={index}
                customer={customer}
                key={index}
                p={p} />)
            }
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default OurProductsRow;

