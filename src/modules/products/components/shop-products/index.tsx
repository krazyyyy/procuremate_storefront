import React, { useState } from 'react'
import ArrowIcon from '@modules/common/icons/arrow';
import PrimaryButton from '@modules/common/components/primary-button';
import { ProductCategory, ProductCollection } from '@medusajs/medusa';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import repeat from '@lib/util/repeat';
import SkeletonProductPreview from '../../../skeletons/components/skeleton-product-preview';
import { useQuery } from '@tanstack/react-query';
import { fetchCollectionCategories } from 'pages/_app';

function ShopCategorySection({ collection }: { collection?: ProductCollection }) {
  const { data: product_categories, isLoading } = useQuery([collection?.id, 'fetch_categories'], () => fetchCollectionCategories(collection?.handle ?? ''))

  if (isLoading) {
    return <div className='flex gap-4 p-5 bg-gray-300 '>
      {repeat(4).map((index) => (
        <div key={index} className='w-full'>
          <SkeletonProductPreview />
        </div>
      ))}
    </div>
  }


  if (product_categories?.length === 0) {
    return null
  }

  return <div className="flex-col content-container mx-auto bg-[#f5f5f5] py-10 font-montserrat flex items-center justify-center">
    <div className="flex items-center gap-3 justify-start w-full py-10">
      <span className="font-bold text-xl small:text-[40px] italic">
        Shop by Category
      </span>
      <ArrowIcon className="pb-6" size={50} />
    </div>
    <div className="w-full group rounded-2xl relative">
      <div className="flex flex-col">
        <div className="flex py-10 overflow-x-auto">
          {/* Use "flex-none" on the card container to prevent it from growing */}
          <div className="flex gap-2 flex-nowrap">
            {product_categories && product_categories?.filter(c => hashSlash(c.handle)).map((c: ProductCategory, index: number) => (
              <CategoryItem collection={collection} key={index} index={index} c={c} />
            ))}
          </div>
        </div>
        <Link href="/products">
          <PrimaryButton className="max-w-sm mx-auto">Shop All</PrimaryButton>
        </Link>
      </div>
    </div>
  </div>;
}



function hashSlash(inputString: string) {
  let count = 0;
  for (var car of inputString) {
    if (car === '/')
      count++;
  }
  if (count === 0 || count === 1) return true;
  return false;
}


export default ShopCategorySection

const categoryImages = [
  {
    img: "/category-images/boxing_robe.png",
    name: "robes"
  },
  {
    img: "/category-images/muaythai_short.png",
    name: "muay thai shorts"
  },
  {
    img: "/category-images/jacket.png",
    name: "jackets"
  },
  {
    img: "/category-images/vest.png",
    name: "vests"
  },
  {
    img: "/category-images/t_shirt.png",
    name: "t-shirts sponsor"
  },
  {
    img: "/category-images/mmashort.png",
    name: "mma shorts"
  },
  {
    img: "/category-images/sport_bra.png",
    name: "sports bra"
  },
  {
    img: "/category-images/gladiator_short.png",
    name: "gladiator shorts"
  },
  {
    img: "/category-images/boxingshorts_and_jacket(premium_item).png",
    name: "boxing and jacket set (premium design)"
  },
  {
    img: "/category-images/glove.png",
    name: "boxing gloves"
  },
  {
    img: "/category-images/head_guard.png",
    name: "head guard"
  },
  {
    img: "/category-images/gorin guard.png",
    name: "groin guard"
  },
  {
    img: "/category-images/pads.png",
    name: "pads"
  },
  {
    img: "/category-images/boxing_short.png",
    name: "boxing shorts"
  }
];

// Helper function to find the image URL based on category name
const getImageUrlByCategoryName = (categoryName: string) => {
  const lowerCaseCategoryName = categoryName.toLowerCase();
  const categoryImage = categoryImages.find((category) =>
    category.name.toLowerCase().includes(lowerCaseCategoryName.replace("&", "and"))
  );
  return categoryImage ? categoryImage.img : null;
};



const CategoryItem = ({ c, index, collection }: { c: ProductCategory, index: number, collection?: ProductCollection }) => {
  const { description } = c;

  // Get the image URL using the category name
  const imageUrl = getImageUrlByCategoryName(c.name);

  return (
    <Link href={"/" + collection?.handle + '/' + c.handle} passHref>
      <div
        key={index}
        className="bg-black cursor-pointer rounded-xl p-3 h-[320px] w-[250px] small:p-10 flex flex-col"
      >
        <ThumbnailImage
          objectFit="contain"
          src={imageUrl ? imageUrl : '/images/image-6.png'}
          alt={c.name}
          height={400}
          placeholder={imageUrl ? imageUrl : '/images/image-6.png'}
          width={400}
          className=""
        />
        <div className="flex flex-col gap-2 p-3">
          <span className="font-bold text-primary text-center leading-[24.3px] mx-auto uppercase">
            {c.name}
          </span>
          <span className="text-center text-sm leading-[17.8px] line-clamp-3 text-white">
            {description as string ?? ''}
          </span>
        </div>
      </div>
    </Link>
  );
};



const ThumbnailImage = ({ src, objectFit, alt, height, width, className, placeholder = '/images/cat-1.png', }: {
  src: string,
  objectFit: 'contain' | 'cover',
  alt?: string,
  height?: number,
  width?: number,
  className?: string,
  placeholder?: string,
}) => {

  const [source, setSource] = useState<string>(src);

  return <Image
    src={source}
    className={clsx(className, '')}
    objectFit={objectFit}
    onError={() => {
      setSource(placeholder)
    }}
    blurDataURL={placeholder}
    height={height}
    width={width}
    alt={alt || ""} />

}