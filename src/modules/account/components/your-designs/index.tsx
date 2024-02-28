import React from 'react'
import useToggleState from '@lib/hooks/use-toggle-state'
import { CustomDesign } from 'types/ffg';
import Medusa from '@lib/services/api';
import { useQuery } from '@tanstack/react-query';
import SkeletonOrderSummary from '@modules/skeletons/components/skeleton-order-summary';
import { motion } from 'framer-motion'
import ThumbnailImage from '@modules/products/components/thumbnail-image';
import Spinner from '@modules/common/icons/spinner';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { linearIntroAnimation } from '@lib/util/animation-util';
import { useAccount } from '@lib/context/account-context';

const fetchCustomDesigns = async (customer_id?: string): Promise<CustomDesign[]> => {
  if (!customer_id) return [];
  const { data: response } = await Medusa.customizer.customDesign.listByCustomer(customer_id);
  const { custom_design } = response.custom_design;
  if (custom_design) return custom_design;
  return [];
}


function YourDesignsSection() {
  const { customer } = useAccount()
  const { data: custom_designs, isLoading, isError, refetch } = useQuery(
    [`get_custom_design`, customer?.id],
    () => fetchCustomDesigns(customer?.id),
    {
      keepPreviousData: false,
    }
  )
  if (isLoading) {
    return <div className='content-container p-10' > <SkeletonOrderSummary /></div>
  }

  return (
    <div className="bg-[#f9f9f9]">
      <div className="w-full p-3 pb-10 group relative py-20 content-container">
        {(custom_designs?.length ?? 0) > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 small:grid-cols-3 gap-14" >
          {custom_designs?.map((p, index) => <CustomDesignItem
            key={index}
            index={index}
            onDelete={refetch}
            design={p} />)}
        </div> :
          <div className='h-60 bg-white flex items-center justify-center'>
            <span>No designs available</span>
          </div>}
      </div >
    </div>
  )
}

export default YourDesignsSection

export const CustomDesignItem = ({ design, index, onDelete }: {
  design: CustomDesign,
  index: number,
  onDelete: () => void
}) => {
  const router = useRouter()
  const { product_id } = design;
  const product = product_id as any;
  const { state: loading, open: startLoading, close: stop, toggle } = useToggleState(false);
  const handleEdit = async () => {
    const { product_id } = design as any;
    const id = product_id.id;
    router.push({
      pathname: "/customizer/style",
      query: { id, design_id: design.id }
    })
  }

  const handleDelete = async () => {
    toggle()
    await Medusa.customizer.customDesign.delete(design.id);
    toggle()
    onDelete();
  }

  return <motion.div
    {...linearIntroAnimation('left', index * 0.2, 0.55)}
    className={clsx("rounded-xl", {
      'bg-white': index % 2 !== 0,
      'bg-[#f5f5f5]': index % 2 === 0,
    })}>
    <>
      <div onClick={() => router.push('/products/' + product.handle)}
        className="flex bg-[#D9D9D9] rounded-xl flex-col relative">
        <div
          className="p-5 select-none overflow-hidden">
          <ThumbnailImage svg height={400} width={400} alt={product?.price}
            src={design.design_data.svg} objectFit="contain" className="" />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-3">
        <div className='flex gap-2 font-medium'>
          <button
            onClick={handleEdit}
            className="px-16 w-full rounded hover:bg-opacity-80 bg-primary py-2 border">
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-16 hover:bg-gray-200 w-full rounded text-red-500 py-2 border">
            {loading ? <Spinner /> : "Delete"}
          </button>
        </div>
        <span className="font-bold uppercase">{design.design_data?.title ?? product?.name}</span>
        <span className="">{product?.description}</span>
      </div>
    </>
  </motion.div>
}
