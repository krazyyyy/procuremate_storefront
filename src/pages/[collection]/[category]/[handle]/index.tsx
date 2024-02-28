import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router"
import { medusaClient } from "@lib/config";
import SkeletonCartPage from "@modules/skeletons/templates/skeleton-cart-page";
import ProductTemplate from "@modules/products/templates";

const fetchProduct = async (handle: string): Promise<any> => {
  return await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
}

const ProductsView = ({ notFound, queryData }: any) => {
  const { query, replace, } = useRouter();
  const { handle } = query ?? { handle: '' };
  const { data, isLoading, isError, isSuccess } = useQuery(["get_product", handle],
    () => fetchProduct(handle as string))

  if (isLoading) {
    return <SkeletonCartPage />
  }

  if (!data || isError || notFound) {
    replace('/404')
    return null;
  }

  if (isSuccess) {
    return (
      <>
        <ProductTemplate product={data!} />
      </>
    )
  }

}

ProductsView.getLayout = (page: any) => {

  const data = page?.props?.queryData ?? {}
  return <Layout>
    <Head title={data?.metadata?.seo_title ?? data?.title ?? ""} description={data?.metadata?.seo_description ?? data?.description ?? ""} canonical={data?.metadata?.canonical_url ?? ""} />
    {page}</Layout>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const handle = query.handle;
  const queryClient = new QueryClient()

  if (!handle) {
    return {
      props: {
        notFound: true,
      }
    }
  }

  await queryClient.prefetchQuery([`get_product`, handle], () => fetchProduct(handle as string))
  const queryData = await queryClient.getQueryData([`get_product`, handle])
  if (!queryData) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      notFound: false,
      queryData
    }
  }

}

export default ProductsView