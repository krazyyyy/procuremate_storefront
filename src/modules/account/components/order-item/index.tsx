import { FulfillmentStatus, Order } from "@medusajs/medusa"
import clsx from "clsx"
import { formatAmount } from "medusa-react"
import React from "react"
import { getOrderDisplayId } from "../job-card"
import { toTitleCase } from "@lib/config"

type OrderItemProps = {
  order: Omit<Order, "beforeInsert">,
  onClick: React.MouseEventHandler,
  active: boolean,
}
const OrderItem = ({ order, active = false, onClick }: OrderItemProps) => {
  const getStatusColor = (status: FulfillmentStatus) => {
    switch (status) {
      case 'canceled':
        return ['Canceled', 'text-gray-400']
      case 'not_fulfilled':
        return ['Shipping in progress', 'text-blue-500']
      case 'shipped':
        return ['Successfully delivered', 'text-green-500']

      default:
        return ['', '']
    }
  }

  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return
    }
    return formatAmount({ amount, region: order.region, includeTaxes: false })
  }
  const getStatus = (): string => {
    var status: any = order.metadata?.status ?? order.status;
    if (status.toLowerCase() === "pending") {
      status = "Order Placed"
    }
    return status
  }

  return <div onClick={onClick} className="flex items-center cursor-pointer justify-between hover:bg-gray-50 border-b pr-5 small:pr-10 pb-3">
    <div className="flex gap-6">
      <div className={clsx("w-[10px] h-full min-h-[70px] rounded-r-[5px]", active ? 'bg-black' : '')} />
      <div className="flex flex-col justify-between">
        <span className="font-bold uppercase">#{getOrderDisplayId(order?.display_id)} </span>
        <span className="font-bold">
          <span>
            {getAmount(order.payments.reduce((acc, item) => acc + item.amount, 0))}
          </span>
        </span>
        <span>{order?.items?.length} items</span>
      </div>
    </div>
    <div className={clsx(getStatusColor(order?.fulfillment_status)[1])}>
      {toTitleCase(getStatus())}
    </div>
  </div>
}


export default OrderItem