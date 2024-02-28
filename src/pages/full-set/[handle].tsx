import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router';
import ArrowIcon from '@modules/common/icons/arrow';
import Layout from '@modules/layout/templates';
import SimilarProducts from '@modules/products/components/similar-products';
import YouMayAlsoLike from '@modules/products/components/you-may-also-like';
import ProductPreviewCustom from '@modules/products/components/product-preview-custom';
import { linearIntroAnimation } from '@lib/util/animation-util';
import { motion } from 'framer-motion'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { getProductHandles } from '@lib/util/get-product-handles';
import { medusaClient } from '@lib/config';
import { IS_BROWSER } from '../../lib/constants';
import SkeletonProductPage from '../../modules/skeletons/templates/skeleton-product-page';
import { ProductProvider, useProductActions } from '../../lib/context/product-context';
import ReadyMadeProduct from '../../modules/products/components/ready-made-product';
import CustomEquipment from '../../modules/products/components/custom-equipment';
import ClubKit from '../../modules/products/components/club-kit';
import useProductPrice from '../../lib/hooks/use-product-price';
import Head from '../../modules/common/components/head';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

const fetchProduct = async (handle: string) => {
  return await medusaClient.products
    .list({ handle })
    .then(({ products }) => products[0])
}

interface CusotmProps {
  notFound: boolean,
}

const ProductItemView = ({ notFound }: CusotmProps) => {
  const { query, isFallback, replace, back } = useRouter()
  const handle = typeof query.handle === "string" ? query.handle : ""
  const [step, setStep] = useState(2);
  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_product`, handle,],
    () => fetchProduct(handle),
    {
      enabled: handle.length > 0,
      keepPreviousData: true,
    }
  )
  useEffect(() => {
    if (data) {
      if (data.collection?.handle.includes('ready-made')) {
        setStep(0)
      } else if (data.collection?.handle.includes('club-kit')) {
        setStep(1);
      } else {
        setStep(2)
      }
    }
  }, [data])

  if (notFound) {
    if (IS_BROWSER) {
      replace("/404")
    }

    return <SkeletonProductPage />
  }

  if (isFallback || isLoading || !data) {
    return <SkeletonProductPage />
  }

  if (isError) {
    replace("/404")
  }

  const steps = () => {
    return [
      <ReadyMadeProduct product={data} key="ready made" />,
      <ClubKit key='club kit' product={data} />,
      <CustomEquipment product={data} key='custom equipment' />,
    ]
  }

  var prod = data as any;

  if (isSuccess) {

    return (
      <>
        <Head title={prod?.seo_title ?? data?.title} description={prod?.seo_description ?? data?.description} />
        <ProductProvider product={data}>
          <div className='flex p-0 content-container flex-wrap-reverse md:flex-nowrap font-montserrat min-h-screen bg-gray-50'>
            <ProductPreviewCustom product={data} />
            {
              <div className='w-full p-4 small:w-1/2 mx-auto max-w-xl'>
                <motion.div
                  onClick={back}
                  {...linearIntroAnimation('right',)}
                  className='flex cursor-pointer justify-end text-right'>
                  <ArrowIcon size={40} />
                </motion.div>
                <div className='flex flex-col'>
                  <motion.span
                    {...linearIntroAnimation('right', 0.25)}
                    className='small:text-[40px] font-bold'>
                    {data.title}
                  </motion.span>
                  <ProductPrice product={data} />
                </div>
                {steps()[step]}
              </div>}
          </div>
          <SimilarProducts product={data} />
          <YouMayAlsoLike product={data} />
        </ProductProvider>
      </>
    )
  }
}

ProductItemView.getLayout = (page: any) => {
  return <Layout >{page}</Layout>
}


export const ProductPrice = ({ product }: { product: PricedProduct }) => {
  const { variant } = useProductActions()

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])
  return <motion.span
    {...linearIntroAnimation('bottom', 0.55)}
    className='font-bold italic'>
    <span className='uppercase'>
      {selectedPrice?.calculated_price}
    </span>
  </motion.span>;
}

// export const getStaticPaths: GetStaticPaths<Params> = async () => {
//   const handles = await getProductHandles()
//   return {
//     paths: handles.map((handle) => ({ params: { handle } })),
//     fallback: true,
//   }
// }

export const getServerSideProps: GetServerSideProps = async (context) => {
  const handle = context.params?.handle as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([`get_product`, handle], () =>
    fetchProduct(handle)
  )

  const queryData = await queryClient.getQueryData([`get_product`, handle])

  if (!queryData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    notFound: false,
  }
}



export default ProductItemView


