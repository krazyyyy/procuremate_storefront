import { Order } from "@medusajs/medusa";
import { formatDate, getShippingAddress, getUserName } from "@lib/util/format";
import BackIcon from "@modules/common/icons/back-icon";
import { Comment, JobCard } from "types/global";
import clsx from "clsx";
import { useProduct } from "medusa-react";
import { useEffect, useState } from "react";
import ThumbnailImage from "@modules/products/components/thumbnail-image";
import useDesign from "@lib/hooks/use-design";
import Spinner from "../../../common/icons/spinner";

interface JobCardProps {
  order: Order,
  setJobcard: (job: any) => void,
  jobcard?: JobCard,
  selectedItem: any
}

export function getOrderDisplayId(order_id: any) {
  return `3A00${order_id}`;
}

const filter = (material: any) => {
  var exclude = ['fight', 'size', 'custom_style', 'image', 'logo', 'flag', 'graphic', 'image'];
  return !exclude.includes(material?.id)
}

const filterLogos = (material: any) => {
  var include = ['graphic', 'logo', 'flag', 'image']
  return include.includes(material.id);
}

const JobCardView = ({ order, setJobcard, jobcard, selectedItem }: JobCardProps) => {
  const { product } = useProduct(jobcard?.product_id.id ?? '');
  const { design, isLoading, isError } = useDesign({ id: jobcard?.custom_design_id?.id })
  var data = design?.design_data as any;
  const [designData, setDesignData] = useState<Record<string, any>>({
    style: undefined,
    size: undefined,
    logo: undefined,
    materials: [],
    logos: [],
  })


  useEffect(() => {

    if (data) {
      let { design: layers } = data;
      var style = layers.find((l: any) => l.id === 'custom_style')
      var size = layers.find((l: any) => l.id === 'size')
      var logos = layers.filter(filterLogos)
      layers = layers?.filter(filter);
      setDesignData({ ...designData, size, style, materials: layers, logos });
    }
  }, [data])
  const selectedItemID = selectedItem?.id;

  // Find the fulfillment object that matches the selectedItemID
  const matchingFulfillments = order.fulfillments.filter(fulfillment =>
    fulfillment.items.some(item => item.item_id === selectedItemID)
  );
  const trackingArrays = matchingFulfillments.map(fulfillment => fulfillment.tracking_links);
  const nonEmptyTrackingArrays = trackingArrays.filter(trackingArray => trackingArray.length > 0);


  return <div className='w-full'>
    <button onClick={() => setJobcard(undefined)} className='mb-8 flex gap-2 items-center cursor-pointer'>
      <BackIcon size={10} />
      <span className='text-sm'>
        Back to Order #{getOrderDisplayId(order?.display_id)}
      </span>
    </button>
    <div className='w-full grid grid-cols-1 small:grid-cols-2 gap-6'>
      <SectionGrid>
        <SectionMenubar showMenu={false} title="Order Information" >
          <div className="flex flex-col gap-2">
            <OrderStatusIndicator order={order} />
            <OrderBadge jobcard={jobcard} />
          </div>
        </SectionMenubar>
        <GridSpecItem title='Order#' value={getOrderDisplayId(order?.display_id)} />
        <GridSpecItem title='Order Date' value={formatDate(order?.created_at)} />
        {order.metadata?.due_date && <div className='flex justify-between items-start'>
          <GridSpecItem title='Fight Date' value={formatDate(jobcard?.fight_date ?? new Date('2023-07-23'))} />
          <div className='bg-[#DF3A23] text-white text-sm font-bold px-2 py-1 rounded flex flex-col gap-1'>
            <span>Due: {formatDate(order.metadata?.due_date)}</span>
            <span>Quantity: {order?.items.reduce((i1: any, i2) => (i1.quantity + i2.quantity)).quantity}</span>
          </div>
        </div>}
      </SectionGrid>
      <SectionGrid>
        <div className='flex items-center gap-2 justify-between'>
          <span className="font-bold text-xl">Job Card Updates</span>
          {/* <MenuIcon /> */}
        </div>
        <GridSpecItem title='Quantity' value={order?.items.reduce((i1: any, i2) => (i1.quantity + i2.quantity)).quantity} />
        <GridSpecItem title='Due Date' value={order.metadata?.due_date ? formatDate(order.metadata?.due_date) : 'Not set'} />
        <GridSpecItem
          title='Status'
          value={
            String(order.metadata?.status).toLowerCase() === 'pending'
              ? 'Order Placed'
              : order.metadata?.status ?? order.status
          }
        />
        <GridSpecItem
          title='Tracking Delivery Number'
          value={
            nonEmptyTrackingArrays.length > 0 && nonEmptyTrackingArrays[0].length > 0
              ? nonEmptyTrackingArrays[0][0]?.tracking_number || 'Not available at the moment'
              : 'Not available at the moment'
          }
        />

      </SectionGrid>
      <SectionGrid>
        <SectionMenubar showMenu={false} title="Customer Information" />
        <GridSpecItem title='Name' value={getUserName(order?.customer.first_name, order?.customer.last_name)} />
        <GridSpecItem title='Email' value={order?.customer?.email} />
        <GridSpecItem title='Shipping Address' value={getShippingAddress(order?.shipping_address)} />
        <GridSpecItem title='Mobile Number' value={order?.shipping_address.phone ?? order?.billing_address?.phone} />
        <GridSpecItem title='Payment Method' value={'Credit Card'} />
      </SectionGrid>
      {/* Comments */}
      <SectionGrid>
        <div className='flex items-center gap-2 justify-between'>
          <span className="font-bold text-xl">Comments</span>
        </div>
        <div>
          {jobcard?.comment && <CommentItem comment={{ message: jobcard?.comment, }} />}
        </div>
      </SectionGrid>
      <SectionGrid className="small:col-span-2">
        <SectionMenubar showMenu={false} title={product?.title!} />
        {/* <span className="text-sm">Product Code: <span className="font-bold">{product?.variants.at(0)?.sku?.at(0) ?? ''}</span></span> */}
        <div className="flex gap-2">
          {design && <ThumbnailImage svg height={400} width={400} alt={design?.id}
            src={design?.design_data.svg} objectFit="contain" className="" />}
        </div>
      </SectionGrid>
      {/* Custom Design Section */}
      {!design ? <div></div> : isLoading ? <SectionGrid className="small:col-span-2">
        <SectionMenubar showMenu={false} title="Product Design" />
        <div className="flex gap-2 flex-wrap w-full items-start text-center h-20">
          <Spinner />
        </div>
      </SectionGrid>
        : <>
          {designData.materials.length > 0 && <SectionGrid className="small:col-span-2">
            <SectionMenubar showMenu={false} title="Product Design" />
            {designData.style && <GridSpecItem title="Style" value={designData.style?.name} />}
            {designData.size && <GridSpecItem title="Size" value={designData.size?.name} />}
            <div className="flex gap-2 flex-wrap w-full items-start text-center">
              {designData?.materials?.filter(filter)?.map((mat: any, i: number) => {
                return <DesignMaterialView mat={mat} key={i} />;
              })}
            </div>
          </SectionGrid>}
          {designData.materials.length > 0 && <SectionGrid className="small:col-span-2">
            <SectionMenubar showMenu={false} title="Logos Sponsorship and Added Graphic" />
            <div className="flex gap-2 flex-wrap items-start justify-start">
              {designData?.logos?.map((mat: any, i: number) => {
                return <div key={i} className="flex max-w-[100px] text-center items-center justify-center text-xs flex-col gap-1">
                  <ThumbnailImage objectFit="cover" alt="image" height={100} width={100} src={mat?.image_url ?? '/images/icon.svg'} />
                  {/* <div style={{ background: `url(${mat.image_url})` }} className="w-24 h-24 rounded"></div> */}
                  <span className="font-bold">{mat.name}</span>
                  {/* <span className="">{mat.price}</span> */}
                </div>
              })}
            </div>
          </SectionGrid>}
        </>}
    </div>
  </div>

}

export default JobCardView

const DesignMaterialView = ({ mat }: { mat: any }) => {
  const getUrl = (src: string): string => {
    if (src.startsWith('http')) return `url(${src})`
    return src;
  }
  return <div className="flex items-center justify-center max-w-[100px] text-xs flex-col gap-1">
    {mat.image_url.startsWith('http') ? <ThumbnailImage placeholder="/images/cat-1.png" objectFit="contain" className="rounded" height={100} width={100} src={mat.image_url} alt={mat.name} /> : <div style={{ background: getUrl(mat.image_url) }} className="w-24 h-24  rounded">
      {!mat.image_url.startsWith('#') && <ThumbnailImage placeholder="/images/cat-1.png" objectFit="contain" className="rounded" height={100} width={100} src={'/'} alt={mat.name} />}
    </div>}
    <span className="font-bold">{mat.layer_name}</span>
    <span className="">{mat.name}</span>
  </div>
}

const SectionGrid = ({ children, className }: { children: any, className?: string }) => {
  return <div className={clsx("flex flex-col p-5 gap-5 w-full bg-white", className)}>
    {children}
  </div>
}


const SectionMenubar = ({ children, title, onMenuClick, showMenu = true }:
  {
    title: string,
    children?: any,
    onMenuClick?: React.MouseEventHandler,
    showMenu: boolean,
  }) => {
  return <div className='flex items-start relative gap-2 justify-between'>
    <span className="font-bold text-xl">{title}</span>
    {children}
    {showMenu && <MenuIcon className="cursor-pointer hover:bg-gray-100" onClick={onMenuClick} />}
  </div>
}


const CommentItem = ({ comment }: { comment: Comment }) => {
  return <div className='border-t border-b py-4'>
    “{comment?.message}”
  </div>
}

export const GridSpecItem = ({ title, value }: { title: string, value: any }) => {
  return <div className='flex flex-col gap-2'>
    <span className="font-bold text-sm leading-[15px]">{title}</span>
    <span className="text-sm font-normal text-[#757575] leading-[15px]">{value}</span>
  </div>
}

const OrderStatusIndicator = ({ order }: { order?: Order }) => {
  const getStatus = () => {
    if (order?.metadata?.status) return order.metadata.status;
    if (order?.payment_status === 'awaiting') {
      return 'Pending';
    }
    if (order?.payment_status === 'canceled')
      return 'Canceled'

    return 'Active';
  }
  const getTextColor = () => {
    if (order?.payment_status === 'awaiting' || order?.payment_status === 'canceled') {
      return 'text-gray-400';
    }
    return 'text-green-500';
  }

  const getBgColor = () => {
    if (order?.payment_status === 'awaiting') {
      return 'bg-gray-400'
    }
    if (order?.payment_status === 'canceled') {
      return 'bg-gray-400'
    }
    return 'bg-green-500';
  }

  return <div className={clsx('flex gap-1 items-center justify-center text-[12px]', getTextColor())}>
    <div className={clsx('h-1.5 w-1.5 rounded-full', getBgColor())}></div> {getStatus()}
  </div>
}

const OrderBadge = ({ jobcard }: { jobcard?: any }) => {
  const getStatus = () => { }
  return <div className='bg-[#DF3A23] text-white flex items-center justify-center m-auto rounded text-[12px] font-bold px-2 py-0.5 uppercase'>
    {jobcard?.type}
  </div>
}
const MenuIcon = ({ ...props }) => {
  return <svg {...props} width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.62 4.16C1.54 4.16 0.68 3.34 0.68 2.2C0.68 1.04 1.54 0.28 2.62 0.28C3.7 0.28 4.56 1.04 4.56 2.2C4.56 3.34 3.7 4.16 2.62 4.16ZM7.85438 4.16C6.77438 4.16 5.91438 3.34 5.91438 2.2C5.91438 1.04 6.77438 0.28 7.85438 0.28C8.93438 0.28 9.79438 1.04 9.79438 2.2C9.79438 3.34 8.93438 4.16 7.85438 4.16ZM13.0888 4.16C12.0088 4.16 11.1488 3.34 11.1488 2.2C11.1488 1.04 12.0088 0.28 13.0888 0.28C14.1688 0.28 15.0288 1.04 15.0288 2.2C15.0288 3.34 14.1688 4.16 13.0888 4.16Z" fill="black" />
  </svg>
}
