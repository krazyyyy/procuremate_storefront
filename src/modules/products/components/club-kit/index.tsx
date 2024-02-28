import React from 'react'
import PrimaryButton from '@modules/common/components/primary-button';
import Link from 'next/link';
import ClubKitProductActions from '../club-kit-actions';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { clearDesign } from '@lib/util/customizer';


export default function ClubKit({ product }: { product: PricedProduct }) {
  return <>
    <div className="flex flex-col gap-5">

      <ClubKitProductActions product={product} />
      <Link href={'/customizer/app?id=' + product.id} passHref legacyBehavior>
        <PrimaryButton onClick={() => {
          clearDesign(product.id!);
        }}>Customize</PrimaryButton>
      </Link>
      <div className='w-full small:text-base'>
        <p className='uppercase my-2 font-bold '>Product Description</p>
        <span>
          Our meticulously crafted fightwear is engineered to maximize your potential, ensuring a perfect balance of durability, flexibility, and breathability.
        </span>
      </div>
    </div>
  </>;
}