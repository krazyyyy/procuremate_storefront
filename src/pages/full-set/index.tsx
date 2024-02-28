import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import SkeletonProductPage from "@modules/skeletons/templates/skeleton-product-page"
import { dehydrate, QueryClient, useInfiniteQuery } from "@tanstack/react-query"
import { GetServerSideProps, } from "next"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useMemo, useState } from "react"
import { fetchProductsList } from "@lib/data"
import { useCart } from "medusa-react"
import repeat from "@lib/util/repeat"
import SkeletonProductPreview from "../../modules/skeletons/components/skeleton-product-preview"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import usePreviews from "@lib/hooks/use-previews"
import { useInView } from "react-intersection-observer"
import { StoreGetProductsParams } from "@medusajs/medusa"
import InfiniteFullSetProducts from "../../modules/products/components/infinite-fullset-products"
import { useProductsFilter } from "../../lib/context/filter-context"

const FullSetProductsListPage = ({ notFound }: { notFound: boolean }) => {
  const { isFallback, replace } = useRouter()
  const { cart } = useCart();
  const { ref, inView } = useInView()
  const { collections } = useProductsFilter();
  var collection = collections.find((c) => c.handle.includes('full-set'))

  const { data, hasNextPage, fetchNextPage, isLoading, isSuccess, isError, isFetchingNextPage } =
    useInfiniteQuery(
      [`infinite-full-set-products`, cart?.region],
      ({ pageParam }) => fetchProductsList({ pageParam, queryParams: { collection_id: [collection?.id ?? ''] } }),
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
        <Head
          title={"Full Set Products"}
          description={'Full Set Products'}
        />
        <div className="content-container font-montserrat pt-10">
          <div className="flex items-center gap-3 justify-between w-full py-10">
            <span className="font-bold text-3xl small:text-[40px] italic">
              Our Full Set Products
            </span>
            {/* <Filter setRefinementList={setParams} refinementList={params} /> */}
          </div>
          <InfiniteFullSetProducts params={{ collection_id: [collection!.id] }} />
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

  await queryClient.prefetchQuery([`get-full-set-products`,], () =>
    fetchProductsList({ pageParam: 0, queryParams: { collection_id: [] } })
  )

  const queryData = await queryClient.getQueryData([`get-full-set-products`,])

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

FullSetProductsListPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default FullSetProductsListPage

