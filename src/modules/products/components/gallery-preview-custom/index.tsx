import FavoriteIcon from "../favorite-item"
import { useFavorites } from "@lib/context/favorite-context";
// import { useMeCustomer } from "medusa-react";
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing";
import ThumbnailImage from "../thumbnail-image";
import { useState } from "react";
import { Gallery } from "types/global";
import BackIcon from "../../../common/icons/back-icon";
import ForwardIcon from "../../../common/icons/forward-icon";
import { useAccount } from "@lib/context/account-context";

const GalleryPreviewCustom = ({ product, gallery }: { product: PricedProduct, gallery: Gallery }) => {
  const { customer } = useAccount()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const [index, setIndex] = useState(0)

  const [loading, setLoading] = useState(false);
  const toggleFavorite = async () => {
    setLoading(true);
    if (!isFavorite(product?.id)) {
      await addFavorite(product?.id!, customer?.id)
    } else {
      await removeFavorite(product?.id!, customer?.id)
    }
    setLoading(false);
  }

  return (
    <>
      <div className="relative select-none  w-full small:w-2/3">
        <div title="favorite" className='absolute cursor-pointer z-10 right-5 small:right-10 top-5 small:top-10'>
          <FavoriteIcon loading={loading} favorite={isFavorite(product?.id)} onClick={toggleFavorite} />
        </div>
        <div className='text-center'>
          <ThumbnailImage
            src={gallery?.images[index] ?? product.thumbnail}
            alt="product"
            height={772}
            width={662}
            objectFit="contain"
            className="inset-0"
          />
          <div className="flex justify-between  mx-16">
            <BackIcon
              className="cursor-pointer"
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1)
                }
              }} />
            <ForwardIcon
              className="cursor-pointer"
              onClick={() => {
                if (index < (gallery.images.length + 1)) {
                  setIndex(index + 1)
                }
              }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default GalleryPreviewCustom
