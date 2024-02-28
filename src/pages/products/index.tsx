import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { GetServerSideProps, } from "next"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useMemo, useState } from "react"
import Filter from "@modules/products/components/filter-menu/filter"
import { fetchProductsList } from "@lib/data"
import { useCart } from "medusa-react"
import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import usePreviews from "@lib/hooks/use-previews"
import { useInView } from "react-intersection-observer"
import { StoreGetProductsParams } from "@medusajs/medusa"
import InfiniteProducts from "@modules/products/components/infinite-products"

const ProductsListPage = ({ notFound }: { notFound: boolean }) => {
  const { isFallback, replace } = useRouter()
  const { cart } = useCart();
  const { ref, inView } = useInView()
  const [params, setParams] = useState<StoreGetProductsParams>({})

  const { data, hasNextPage, fetchNextPage, isLoading, isSuccess, isError, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-products-store`, cart?.region],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams: {} }),
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    )


  const previews = usePreviews({ pages: data?.pages as any, region: cart?.region })

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  if (isFallback || isLoading || !data) {
    return <SkeletonProductPage />
  }

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SkeletonProductPage />
  }

  if (isError) {
    replace("/404")
  }

  if (isSuccess) {
    return (
      <>
        <div className="content-container font-montserrat pt-10">
          <div className="flex items-center gap-3 justify-between w-full py-10">
            <h1 className="font-bold text-3xl small:text-[40px] italic">
              High Quality Sneaker Products at Procuremate
            </h1>
            <Filter setRefinementList={setParams} refinementList={params} />
          </div>
          <InfiniteProducts params={params} />
        </div>

        {isLoading &&
          !previews.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(data?.pages as any)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        <div
          className="py-16 flex justify-center items-center text-small-regular text-gray-700"
          ref={ref}
        >
          <span ref={ref}></span>
        </div>
      </>
    )
  }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([`get_products`,], () =>
    fetchProductsList({ pageParam: 0, queryParams: {} })
  )

  const queryData = await queryClient.getQueryData([`get_products`,])

  if (!queryData) {
    return {
      props: {
        notFound: false,
      },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
    },
  }
}

ProductsListPage.getLayout = (page: ReactElement) => {
  return <Layout>
    <Head
      title={"Shop Quality Sneaker Products | All Items Are Customizable"}
      description={"Explore our wide range of customizable premium boxing products at our Sneaker Shop. From gloves to apparel, gear up for success in Sneker, and more."}
      canonical={"https://www.fiercefightgear.com/products"}
    />
    {page}
  </Layout>
}

export default ProductsListPage

