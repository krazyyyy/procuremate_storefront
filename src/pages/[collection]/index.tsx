import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { useRouter } from "next/router"
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page";
import { ProductCategory, ProductCollection } from "@medusajs/medusa";
import Link from "next/link";
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { fetchCollectionCategories } from "pages/_app";
import Search from "@modules/common/icons/search";
import { GetServerSideProps } from "next";
import Medusa from '@lib/services/api';
import BreadCrumb from "@modules/common/breadcrumb";

export async function fetchCollectionByHandle(collectionHandle: string): Promise<ProductCollection | undefined> {
  try {
    const { data: response } = await Medusa.collections.retrieve(collectionHandle);
    const { collection } = response;
    return collection
  } catch (error: any) {
    console.error(error.message)
  }
}
type Props = {
  notFound: boolean
}

const CollectionView = ({ notFound }: Props) => {
  const { query, replace } = useRouter();
  const {
    data: collection,
    isLoading,
    isError,
    isSuccess } = useQuery([query.collection, 'fetch_collection'], () => fetchCollectionByHandle(query?.collection as string))
  const {
    data: categories,
    isLoading: loading,
    isError: error,
    isSuccess: success } = useQuery([query.collection, 'fetch_categories'], () => fetchCollectionCategories(query?.collection as string))


  if (loading || isLoading) {
    return <SkeletonCartPage />
  }

  if (!categories || isError || !collection || error || !collection) {
    replace('/404')
    return null;
  }


  if (categories?.length === 0 && !loading) {
    return <div className="h-[60vh] flex items-center justify-center flex-col gap-3">
      <Search size={50} />
      <p>No categories available for this collection</p>
    </div>
  }

  if (success && isSuccess) {
    return (
      <>
        <Head title={collection?.title} description={collection?.metadata?.description as any} />
        <CollectionCatTemplate categories={categories} collection={query.collection as string} />
      </>
    )
  }

}


const CollectionCatTemplate = ({ categories, collection }: { categories: ProductCategory[], collection: string }) => {
  return <div className="min-h-[60vh]">
    <div className="flex flex-col content-container my-4">
      <div className="mb-3"><BreadCrumb /></div>
      {categories.map((cat) => {
        return <Link key={cat.id} href={`${collection}/${cat.handle}`} passHref>
          <div className="px-6 max-w-md cursor-pointer whitespace-nowrap py-2 border-b shadow-sm m-1 hover:bg-gray-200 rounded-md">
            <p>{cat.name}</p>
          </div>
        </Link>
      })}
    </div>
  </div>
}

CollectionView.getLayout = (page: any) => {
  return <Layout>{page}</Layout>
}



export default CollectionView


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const handle = query.collection;
  const queryClient = new QueryClient();

  if (!handle) {
    console.error('no handle')
    return {
      notFound: true
    }
  }
  await queryClient.prefetchQuery(['fetch_collection', handle], () => fetchCollectionByHandle(handle as string));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
    }
  }
}