import { ProductCategory, ProductCollection } from "@medusajs/medusa";
import Link from "next/link";
import ThumbnailImage from "../thumbnail-image";

const CategoryItem = ({ c, index, collection }: { c: ProductCategory, index: number, collection: ProductCollection | null }) => {
  const { description } = c;
  const getHandle = (): string => {
    if (collection?.handle) {
      return collection.handle + '/' + c.handle;
    }
    return c.handle;
  }

  return (
    <Link href={getHandle()} passHref legacyBehavior>
      <div className="bg-black cursor-pointer rounded-xl p-3 small:p-10 flex flex-col">
        <ThumbnailImage
          objectFit="contain" src={'/images/cat-' + (index + 1) + '.png'}
          alt={c.name}
          height={400}
          placeholder='/images/cat-2.png'
          width={400}
          className="" />
        <div className="flex flex-col gap-2 p-3">
          <span className="font-bold text-primary text-center leading-[24.3px] mx-auto uppercase">{c.name}</span>
          <span className="text-center text-sm leading-[17.8px] line-clamp-3 text-white">{description as string ?? ''}</span>
        </div>
      </div>
    </Link >
  );
}


export default CategoryItem;