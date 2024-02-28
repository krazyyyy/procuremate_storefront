import { IS_BROWSER } from "@lib/constants"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { GetServerSideProps, } from "next"
import { useRouter } from "next/router"
import { ReactElement, useEffect, useMemo, useState } from "react"
import Filter from "@modules/products/components/filter-menu/filter"
import { useCart } from "medusa-react"
import { Gallery } from "../../types/global"
import Medusa from '@lib/services/api'
import Search from "../../modules/common/icons/search"
import SekeletonCartProduct from "../../modules/skeletons/components/skeleton-cart-product"
import GalleryItem from "../../modules/gallery/gallery-item"
import useGalleryPreviews from "@lib/hooks/use-gallery-previews"
import { useInView } from "react-intersection-observer"
import repeat from "../../lib/util/repeat"
import getNumberOfSkeletons from "../../lib/util/get-number-of-skeletons"
import SkeletonProductPreview from "../../modules/skeletons/components/skeleton-product-preview"

export declare class StoreGetGalleryParams {
  category_id?: string[];
}

export declare class FetchGalleryListParams {
  pageParam?: number
  queryParams: StoreGetGalleryParams
}

export const fetchGalleryList = async ({ pageParam, queryParams }: FetchGalleryListParams): Promise<any> => {
  console.log(pageParam, queryParams)

  const { data: response } = await Medusa.gallery.list({ pageParam, category_id: queryParams?.category_id })
  const { gallery: data } = response;
  const { gallery, totalCount: count } = data;
  console.log(count)
  const offset = pageParam || 1; // Set the offset to pageParam if provided, otherwise use 0
  return {
    response: { gallery, count },
    nextPage: count > offset + 10 ? offset + 10 : null, // Adjust the offset value according to your desired logic
  }
}

const GalleryListPage = ({ notFound }: { notFound: boolean }) => {
  const { replace } = useRouter()
  const { cart } = useCart();
  const [params, setParams] = useState<StoreGetGalleryParams>({})
  const { ref, inView } = useInView()


  const queryParams = useMemo(() => {
    const p: StoreGetGalleryParams = {}

    return {
      ...p,
      ...params,
    }
  }, [params])

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    [`get_gallery_list`, cart?.region, params],
    ({ pageParam = 1 }) => {
      console.log('page', pageParam)
      return fetchGalleryList({ queryParams, pageParam })
    },
    {
      keepPreviousData: false
    }
  )

  const previews = useGalleryPreviews({ pages: (data as any)?.pages })


  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasNextPage])

  // if (isError) {
  //   return <div className="w-screen min-h-screen flex gap-5 flex-col items-center justify-center">
  //     <span className="text-5xl font-montserratf font-bold">Error</span>
  //     <span>{JSON.stringify(failureReason)}</span>
  //     <PrimaryButton className="max-w-sm" onClick={back}>Go Back</PrimaryButton>
  //   </div>;
  // }

  if (isLoading) {
    return <SekeletonCartProduct />
  }

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SekeletonCartProduct />
  }

  // if (isError) {
  //   replace("/404")
  // }
  const emptyGallery = <div className="min-h-[40vh] flex-col gap-4 w-full flex items-center justify-center">
    <Search size={60} />
    <span>No Gallery item available...</span>
  </div>

  return (
    <>
      <div className="content-container font-montserrat pt-10">
        <div className="flex items-center gap-3 justify-between w-full py-10">
          <h1 className="font-bold text-3xl small:text-[40px] italic">
            Procuremate Gallery | Showcasing Premium Fight Gear
          </h1>
          <Filter setRefinementList={setParams} refinementList={params} />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-4 gap-y-8 flex-1">
          {previews.map((g: Gallery, index: number) => (
            <li key={g.id}>
              <GalleryItem index={index} gallery={g as any} key={g.id} />
            </li>
          ))}
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
        </ul>
        <div
          className="py-16 flex justify-center items-center text-small-regular text-gray-700"
          ref={ref}
        >
          <span ref={ref}></span>
        </div>
        {/* {data?.length === 0 ? emptyGallery
            :
            <div className="flex flex-wrap py-12">
              {data?.map((g, index) => {
                return <GalleryItem index={index} gallery={g} key={g.id} />
              })}
            </div>} */}
      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([`get_gallery_list`,], () => fetchGalleryList({ pageParam: 1, queryParams: {} }))

  const queryData = await queryClient.getQueryData([`get_gallery_list`,])

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

GalleryListPage.getLayout = (page: ReactElement) => {
  return <Layout>
    <Head
      title={"Procuremate Gallery | Showcasing Premium Fight Gear"}
      description={'Are you looking for high-quality boxing fightwear? Browse our diverse collection of boxing shorts, gladiator trunks, and customize your personal gear today!'}
      canonical={"https://www.fiercefightgear.com/gallery"}
    />
    {page}
  </Layout>
}

export default GalleryListPage;

