import React, { useCallback, useEffect, useState } from 'react'
import OrderLineItem from '../order-line-item';
import OrderItem from '../order-item';
import { Order } from '@medusajs/medusa';
import { getAmount, getShippingAddress } from '@lib/util/format';
import { useCustomerOrders, useMeCustomer } from 'medusa-react';
import SkeletonOrderItems from '@modules/skeletons/components/skeleton-order-items';
import { JobCard } from 'types/global';
import JobCardView, { getOrderDisplayId } from '../job-card';
import clsx from 'clsx';
import Medusa from '@lib/services/api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../../common/icons/spinner';
import useToggleState from '@lib/hooks/use-toggle-state';
import MenuIcon from '../../../common/icons/menu';


const fetchJobCards = async (): Promise<JobCard[]> => {
  const { data: response } = await Medusa.jobCards.list();
  const { jobCards: data } = response;
  const { job_cards } = data;
  if (job_cards) return job_cards;
  return [];
};
const fetchJobCard = async (order_id: string): Promise<JobCard | undefined> => {
  const { data: response } = await Medusa.jobCards.retrieve(order_id);
  const { jobCards: data } = response;
  const { job_cards } = data;
  if (job_cards) return job_cards[0];
};


const OrdersSection = ({ guest }: { guest: boolean }) => {
  const { orders: customerOrders, isLoading: loadingOrders } = useCustomerOrders({ limit: 100 } as any);
  const { state, toggle } = useToggleState(false)
  const { data: jobCards, isLoading: loading, } = useQuery(
    [`get_all_jobcard`,],
    () => fetchJobCards(),
    {
      keepPreviousData: false,
    }
  )

  const [orders, setOrders] = useState<Order[]>([])
  const [order, setOrder] = useState<Order>();
  const { customer: meCustomer, isLoading } = useMeCustomer();
  const [customer, setCustomer] = useState<any>(undefined);
  const [jobcard, setJobcard] = useState<JobCard | undefined>(undefined)

  const isEqual = (o1: Order, o2: Order | undefined): boolean => {
    return JSON.stringify(o1) === JSON.stringify(o2);
  }


  const getOrderJobCard = useCallback((order: Order): JobCard | undefined => {
    var res = jobCards?.find((j) => j.custom_design_id && (j.order_id.id === order.id));
    if (!res) jobCards?.find((j) => (j.order_id.id === order.id));
    return res;
  }, [jobCards])


  useEffect(() => {
    if ((customerOrders?.length ?? 0) > 0) {
      setOrders(customerOrders!)
      setOrder(customerOrders![0]);
      setCustomer(meCustomer)
    }
  }, [customerOrders, meCustomer])
  useEffect(() => {
    setJobcard(undefined)

  }, [order])

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const onJobSelectItem = (itemId: string) => {
    setSelectedItemId(itemId);
  };
  if (!orders && customer || isLoading || loadingOrders || loading)
    return <div className='container-content max-w-5xl mx-auto'>
      <SkeletonOrderItems />
    </div>



  const onCancel = async () => {
    if (order) {
      toggle()
      let { data } = await Medusa.orders.cancel(order?.id);
      const { order_result: newOrder } = data;
      setOrders(orders.map((o) => o.id === newOrder.id ? { ...o, ...newOrder } : o));
      toggle()
    }
  }

  return <div className="bg-[#f9f9f9] gap-10 small:px-10 py-10">
    <div className="flex content-container flex-wrap small:flex-nowrap justify-between gap-10">
      <div className={clsx("flex flex-col w-full bg-white gap-3 ", order ? 'md:max-w-md' : 'items-center')}>
        <span className="font-bold p-5 text-xl text-left w-full">Orders History</span>
        {!order && <div className='p-5 py-10'>No orders </div>}
        {customer && orders?.map((o: Order, i: number) => <OrderItem
          onClick={() => setOrder(o)}
          active={isEqual(o, order)}
          key={i}
          order={o} />)}
      </div>
      {!customer && <div className='h-60'></div>}
      {order && !jobcard ? <div className="w-full flex flex-col h-full gap-4">
        <div className="flex flex-col  w-full bg-white p-5 h-full">
          <div className='relative flex justify-between'>
            <span className="font-bold text-xl">
              {getOrderDisplayId(order.display_id)}
            </span>
            {/* {state && <div onMouseLeave={toggle} className="absolute bg-white shadow-xl right-0 top-full rounded ">
              <button onBlur={toggle} onClick={onCancel} className="px-8 py-3 text-sm font-semibold rounded hover:text-red-600 hover:bg-gray-200">
                {loading ? <Spinner /> : "Cancel Order"}
              </button>
            </div>}
            <MenuIcon onClick={toggle} /> */}

          </div>
          {order?.items?.map((l: any, i: number) => <OrderLineItem
            id={order.id}
            key={i}
            index={i}
            discount={order.discounts.length > 0 ? order.discounts.reduce((acc, o) => acc + Number(o.rule.value), 0) : 0}
            region={order.region}
            item={l}
            jobcard={getOrderJobCard(order)}
            onJobSelect={(job) => { 
              setJobcard(job);
              // Pass the selected item ID to the onJobSelect function
              onJobSelectItem(l);
            }}
          />)}
        </div>
        <div className="flex flex-col max-h-[300px]  w-full bg-white p-5">
          <span className="font-bold text-xl">
            Order Details
          </span>

          <div className="flex mt-5 mb-1 justify-between font-bold">
            <span className="font-normal">Phone Number</span>
            <span className="">{order?.shipping_address.phone}</span>
          </div>
          <div className="flex my-1 justify-between font-bold">
            <span className="font-normal">Delivery Address</span>
            <span className="text-right uppercase">
              {getShippingAddress(order.shipping_address)}
            </span>
          </div>
          {order && <div className="flex my-3 justify-between font-bold">
            <span className="font-normal">Total</span>
            <span className="">
              {getAmount(order.payments.reduce((p: any, c) => p.amount + c.amount).amount, order.region)}
            </span>
          </div>}

        </div>
      </div> :
      order && jobcard && <JobCardView
        jobcard={jobcard}
        setJobcard={setJobcard}
        order={order}
        selectedItem={selectedItemId} // Pass the selected item ID to JobCardView
      />}
    </div>
  </div>
}
export default OrdersSection


