import Image from 'next/image';
import React from 'react'
import ArrowIcon from '../../../common/icons/arrow';
import PrimaryButton from '../../../common/components/primary-button';

function ShopCategorySection() {

  const categories = [
    {
      img: '/images/cat-1.png',
      name: 'Fight Wear',
      description: 'High class, premium materials to fight with a style.'
    },
    {
      img: '/images/cat-2.png',
      name: 'Fight Wear',
      description: 'High class, premium materials to fight with a style.'
    },
    {
      img: '/images/cat-3.png',
      name: 'Fight Wear',
      description: 'High class, premium materials to fight with a style.'
    },

  ]


  return <div className="flex-col content-container py-10  font-montserrat flex items-center justify-center">
    <div className="flex items-center gap-3 justify-start w-full py-10">
      <span className="font-bold text-xl small:text-[40px] italic">
        Shop by Category
      </span>
      <ArrowIcon className="pb-6" size={50} />
    </div>
    <div className="w-full group rounded-2xl relative">
      <div className="flex flex-col">
        <div className="flex py-10 overflow-x-scroll gap-5" >
          {
            categories.map((c, index) => <div key={index} className="bg-black cursor-pointer rounded-xl p-10 flex flex-col">
              <Image objectFit="contain" src={c.img} alt="customizer" height={400} width={400} className="" />
              <div className="flex flex-col gap-2 p-3">
                <span className="font-bold text-primary leading-[24.3px] mx-auto uppercase">{c.name}</span>
                <span className="text-center text-sm leading-[17.8px] text-white">{c.description}</span>
              </div>
            </div>)
          }
        </div>
        <PrimaryButton className="max-w-sm mx-auto" >Shop All</PrimaryButton>
      </div>
    </div>
  </div>;
}


export default ShopCategorySection