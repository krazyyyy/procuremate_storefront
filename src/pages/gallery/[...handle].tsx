import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import ArrowIcon from '@modules/common/icons/arrow';
import Layout from '@modules/layout/templates';
import { linearIntroAnimation } from '@lib/util/animation-util';
import { motion } from 'framer-motion'
import { GetServerSideProps } from 'next';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { IS_BROWSER } from '@lib/constants';
import SkeletonProductPage from '@modules/skeletons/templates/skeleton-product-page';
import Head from '@modules/common/components/head';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import Medusa from '@lib/services/api'
import { Gallery } from 'types/global'
import GalleryPreviewCustom from '../../modules/products/components/gallery-preview-custom';
import PrimaryButton from '../../modules/common/components/primary-button';
import { clearDesign } from '../../lib/util/customizer';
import Image from 'next/image';


const fetchGalleryItem = async (handle: string): Promise<Gallery> => {
  return await Medusa.gallery
    .retrieve(handle)
    .then(({ data: response }) => {
      const { gallery } = response;
      return gallery
    })
}

interface CusotmProps {
  notFound: boolean,
}

const GalleryItemPage = ({ notFound }: CusotmProps) => {
  const { query, isFallback, replace, push, back } = useRouter()
  const handle = typeof query.handle?.at(1) === "string" ? query.handle?.at(1)! : ""
  const { data, isError, isLoading, isSuccess } = useQuery(
    [`get_gallery_item`, handle,],
    () => fetchGalleryItem(handle),
    {
      enabled: handle?.length > 0,
      keepPreviousData: true,
    }
  )
  const [customData, setCustomData] = useState<{ style: string | undefined, size: string | undefined }>({
    style: undefined,
    size: undefined,
  })
  const [materials, setMaterials] = useState<[]>([])

  useEffect(() => {
    var items = (data?.custom_design_id?.design_data.design)
    if (items?.length > 0) {
      var style = items.find((c: any) => c?.id === 'custom_style')
      var size = items.find((c: any) => c?.id === 'size')
      setCustomData({
        style: style?.name,
        size: size?.name,
      })
      const unique: any = [];
      const finalItems: any = [];
      for (var item of items) {
        if (!unique.includes(item.image_url)) {
          unique.push(item.image_url);
          finalItems.push(item);
        }
      }
      setMaterials(finalItems);
    }

  }, [data?.custom_design_id?.design_data])

  if (isFallback || isLoading || !data) {
    return <SkeletonProductPage />
  }

  if (isError) {
    replace("/404")
  }
  const product = data.product_id;



  const getUrl = (src: string) => {
    if (src.startsWith('htt')) {
      return `url(${src})`
    }
    return src;
  }


  const handleEdit = async () => {
    const design = data.custom_design_id;
    if (!design) return;
    const id = product?.id;
    clearDesign(id);
    push({
      pathname: "/customizer/style",
      query: { id, design_id: design?.id, }
    })
  }


  const filter = (material: any) => {

    var exclude = ['custom_style', 'graphic', 'production', 'text', 'font', 'graphic'];
    return !exclude.includes(material?.id)
  }


  if (isSuccess) {

    return (
      <>
        <Head title={data?.title} description={data?.description} />
        <div className='flex p-0 content-container flex-wrap-reverse md:flex-nowrap font-montserrat min-h-screen bg-gray-50'>
          {product ? <GalleryPreviewCustom gallery={data} product={product as unknown as PricedProduct} /> : <div>No product attached to this gallery item.</div>}
          {
            <div className='w-full p-4 small:w-1/2 mx-auto max-w-xl'>
              <motion.div
                onClick={back}
                {...linearIntroAnimation('right',)}
                className='flex cursor-pointer justify-end text-right'>
                <ArrowIcon size={40} />
              </motion.div>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-xl small:text-[40px] small:leading-[49px]'>{data.title}</h1>
                <p className='my-2'>{data.description}</p>
                {customData.style && < SpecItem
                  title='Style'
                  value={customData.style}
                />}
                {customData.size && <SpecItem
                  title='Size'
                  value={customData.size}
                />}
                <div className='my-5 flex flex-col items-start gap-2'>
                  <span className='uppercase font-bold'>Materials</span>
                  <div className='flex gap-4 flex-wrap justify-start'>
                    {materials.filter(filter).map((d: any, i: number) => {
                      if (!d.image_url) return null;
                      var url = getUrl(d.image_url)
                      return <div key={i} className='flex max-w-[100px] text-center justify-start flex-col items-center'>
                        {d.image_url?.startsWith('http') ?
                          <Image height={100} width={100} alt={d.image_url} src={d.image_url} className='h-[100px] text-center w-[100px] rounded' />
                          : <div style={{ background: url }} className='h-[100px] text-center w-[100px] rounded' />}
                        <span className='text-sm py-2'>{d.name}</span>
                      </div>
                    })}
                  </div>
                </div>
                <PrimaryButton onClick={handleEdit} disabled={!data?.custom_design_id}>Customize</PrimaryButton>
              </div>
            </div>}
        </div>
      </>
    )
  }
}

const SpecItem = ({ title, value }: { title: string, value: string }) => {
  return <div className='flex justify-start items-center'>
    <span className='font-bold text-base block w-20 uppercase'>{title}:</span>
    <span className='text-sm'>{value}</span>
  </div>

}

GalleryItemPage.getLayout = (page: any) => {
  return <Layout >{page}</Layout>
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const handle = typeof query.handle?.at(1) === "string" ? query.handle?.at(1)! : ""
  console.log('gallery handle', handle);
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery([`get_gallery_item`, handle], () => fetchGalleryItem(handle))
  const queryData = await queryClient.getQueryData([`get_gallery_item`, handle])
  if (!queryData) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}



export default GalleryItemPage


