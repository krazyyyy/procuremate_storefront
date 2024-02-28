import Image from "next/image"
import FavoriteIcon from "../favorite-item"
import { useFavorites } from "@lib/context/favorite-context";
// import { useMeCustomer } from "medusa-react";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import ThumbnailImage from "../thumbnail-image";
import { useAccount } from "@lib/context/account-context";

const ProductPreviewCustom = ({ product }: { product: PricedProduct }) => {
  const { customer } = useAccount()
  const { isFavorite, addFavorite, removeFavorite, loading } = useFavorites()

  const toggleFavorite = () => {
    if (isFavorite(product.id!)) {
      removeFavorite(product.id!, customer?.id)
    } else {
      addFavorite(product.id!, customer?.id)
    }
  }

  return (
    <>
      <div className="relative py-10 select-none bg-white  w-full small:w-2/3">
        <div title="favorite" className='absolute cursor-pointer z-10 right-5 small:right-10 top-5 small:top-10'>
          <FavoriteIcon loading={loading} favorite={isFavorite(product.id!)} onClick={toggleFavorite} />
        </div>
        <div className='text-center py-4'>
          <ThumbnailImage
            src={product?.thumbnail ?? '/images/cat-2.png'}
            alt="product"
            height={500}
            width={662}
            objectFit="contain"
            className="inset-0 object-contain"
          />
        </div>
        <div className='flex w-full flex-wrap justify-start gap-5'>
          {product.images?.map((img) => {
            return <ThumbnailImage
              key={img.id}
              src={img.url ?? '/exit.svg'}
              alt=""
              height={200}
              width={200}
              className="inset-0 object-contain rounded"
            />;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductPreviewCustom
