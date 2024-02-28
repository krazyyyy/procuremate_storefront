import { Order } from "@medusajs/medusa"
import React from "react"
import { getOrderDisplayId } from "../../account/components/job-card"
import MenuIcon from "../../common/icons/menu"
import OrderLineItem from "../../account/components/order-line-item"
import { getAmount, getShippingAddress } from "@lib/util/format"
import Medusa from '@lib/services/api'
import useToggleState from "@lib/hooks/use-toggle-state"

type OrderDetailsTemplateProps = {
  order: Order
}

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  const { state, toggle } = useToggleState(false)

  const onCancel = async () => {
    if (order) {
      toggle()
      let { data } = await Medusa.orders.cancel(order?.id);
      toggle()
    }
  }

  return (
    <div className="bg-gray-50 py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex justify-center">
        <div className="w-full flex flex-col h-full gap-4">
          <div className="flex flex-col  w-full bg-white p-5 h-full">
            <div className='relative flex justify-between'>
              <span className="font-bold text-xl">
                {getOrderDisplayId(order.display_id)}
              </span>
              {/* {state && <div onMouseLeave={toggle} className="absolute bg-white shadow-xl right-0 top-full rounded ">
                <button onBlur={toggle} onClick={onCancel} className="px-8 py-3 text-sm font-semibold rounded hover:text-red-600 hover:bg-gray-200">
                  Cancel Order
                </button>
              </div>} */}
              <MenuIcon onClick={toggle} />

            </div>
            {order?.items?.map((l: any, i: number) => <OrderLineItem
              id={order.id}
              key={i}
              index={i}
              discount={order.discounts.length > 0 ? order.discounts.reduce((acc, o) => acc + Number(o.rule.value), 0) : 0}
              region={order.region}
              item={l}
              onJobSelect={(job) => { }}
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
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsTemplate
