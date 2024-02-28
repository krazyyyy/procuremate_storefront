import React from 'react'
import Link from 'next/link';
import { motion } from 'framer-motion'
import { linearIntroAnimation } from '@lib/util/animation-util';
import ReadyMadeProductActions from '../ready-made-actions';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';


export default function ReadyMadeProduct({ product }: { product: PricedProduct }) {
  return <>
    {product.collection && (
      (<Link href={`/collections/${product.collection.id}`}>

        <motion.span
          {...linearIntroAnimation('right', 0.45)}
          className='font-bold italic'>
          ({product.collection?.title ?? 'Ready Made'})</motion.span>

      </Link>)
    )}

    <div className='flex flex-col gap-5'>
      <ReadyMadeProductActions product={product} />
      <div className='w-full small:text-base'>
        <p className='uppercase my-2 font-bold '>Product Description</p>
        <span>
          {product.description}
        </span>
      </div>
    </div>
  </>;
}