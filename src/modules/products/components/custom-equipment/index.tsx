import React from 'react'
import PrimaryButton from '@modules/common/components/primary-button';
import { hoverAnimation, linearIntroAnimation } from '@lib/util/animation-util';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { clearDesign } from '../../../../lib/util/customizer';


export default function CustomEquipment({ product }: { product: PricedProduct }) {

  return <>
    <div className='w-full small:text-base'>
      <motion.p    {...linearIntroAnimation('left', 0.75)} className='uppercase my-2 font-bold '>Product Description</motion.p>
      <motion.span {...linearIntroAnimation('left', 1, 0.75)}>
        {product.description}
      </motion.span>
    </div>
    <Link href={'/customizer/app?id=' + product.id}>

      <PrimaryButton
        onClick={() => {
          clearDesign(product.id!);
        }}
        {...linearIntroAnimation('bottom', 0, 0.75)}
        whileHover={hoverAnimation('scale')}
        className='my-5'>
        Customize
      </PrimaryButton>

    </Link>
  </>;

}