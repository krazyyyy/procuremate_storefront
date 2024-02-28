import usePreviews from "@lib/hooks/use-previews"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useCart } from "medusa-react"
import React, { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery } from "@tanstack/react-query"
import ProductPreview from "../../products/components/product-preview"
import { ProductCategory, ProductCollection } from "@medusajs/medusa"
import { medusaClient } from "@lib/config"
import { useRouter } from "next/router"
import BreadCrumb from "@modules/common/breadcrumb"

type CategoryTemplateProps = {
  category: ProductCategory,
  category_title?: string
  collection: ProductCollection
}

export const fetchCategoryProducts = async ({
  pageParam = 0,
  id,
  cartId,
  collectionId,
}: {
  pageParam?: number
  id: string
  cartId?: string
  collectionId: string,
}) => {

  const { products, count, offset } = await medusaClient.products.list({
    collection_id: [collectionId],
    limit: 10,
    offset: pageParam,
    category_id: [id],
    cart_id: cartId,
  })
  return {
    response: { products, count },
    nextPage: count > offset + 10 ? offset + 10 : null,
  }
}

const CategoryTemplate: React.FC<CategoryTemplateProps> = ({
  category,
  category_title,
  collection
}) => {
  const { cart } = useCart()
  const { ref, inView } = useInView()
  const { replace } = useRouter()
  const { query } = useRouter()
  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    [`get_category_products`, query.collection, category.id, cart?.id, cart?.region_id],
    ({ pageParam }) =>
      fetchCategoryProducts({
        pageParam,
        id: category?.id,
        cartId: cart?.id,
        collectionId: collection.id,
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )
  if (infiniteData?.pages[0].response.count === 0) {
    replace('/404')
  }

  const previews = usePreviews({
    pages: infiniteData?.pages as any,
    region: cart?.region,
  })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  return (
    <div className="content-container py-6">
      <BreadCrumb />
      <div className="mb-8 text-2xl-semi">
        <h1>{category_title ?? category.name ?? ''}</h1>
      </div>
      {previews.length === 0 && !isLoading && !isFetchingNextPage ? (
        <div className="text-center flex flex-col justify-center items-center h-40">
          <h3 className="font-bold">
            No products available yet. Please come back later.
          </h3>
        </div>
      ) : (
        <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8">
          {previews.map((p, i) => (
            <li key={p.id}>
              <ProductPreview href={`/${query.collection}/${query.category}/${p.handle}`} {...p} />
            </li>
          ))}
          {(isLoading) &&
            !previews.length &&
            repeat(8).map((index) => (
              <li key={index}>
                <SkeletonProductPreview />
              </li>
            ))}
          {isFetchingNextPage &&
            repeat(getNumberOfSkeletons(infiniteData?.pages as any)).map((index) => (
              <li key={index}>
                <SkeletonProductPreview />
              </li>
            ))}
        </ul>
      )}
      <div
        className="py-16 flex justify-center items-center text-small-regular text-gray-700"
        ref={ref}
      >
        <span ref={ref}></span>
      </div>
    </div>
  )
}

export default CategoryTemplate
