import { Cart } from "@medusajs/medusa"
import { formatAmount } from "medusa-react"
import React, { useState } from "react"
import DiscountCode from "../../../checkout/components/discount-code"
import CheckoutCartItem from "../../../account/components/cart-item/variant"
import GiftCard from "../../../checkout/components/gift-card"
import clsx from "clsx"
import Image from "next/image"

type CartTotalsProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">
}

const CartTotals: React.FC<CartTotalsProps> = ({ cart }) => {
  const {
    subtotal,
    discount_total,
    total,
  } = cart

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: cart.region,
      includeTaxes: false,
    })
  }


  return (
    <div>
      <div className="flex flex-col w-full gap-3">
        <div className="border flex flex-col gap-4 p-4">
          {
            cart.items.map((c, i) => {
              return <CheckoutCartItem region={cart.region} discount={0} index={i} item={c} key={i} />
            })
          }

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <DiscountCode cart={cart} />
            </div>
          </div>
          <div className="flex justify-between w-full">
            <span className="">Subtotal</span>
            <span>{getAmount(subtotal)}</span>
          </div>
          {!!discount_total && (
            <div className="flex items-center justify-between">
              <span>Discount</span>
              <span>- {getAmount(discount_total)}</span>
            </div>
          )}
          <div className="flex font-bold justify-between w-full">
            <span>Total</span>
            <span>{getAmount(total)}</span>
          </div>
        </div>
        {/* <CartMenu><PrimaryButton className="mt-3" >Checkout</PrimaryButton></CartMenu> */}
      </div>
      {/* <div className="text-small-regular text-gray-700">
        <div className="flex flex-col gap-y-1">

          <div className="border flex flex-col gap-4 p-4">
            {
              cart.items.map((c, i) => {
                return <CheckoutCartItem region={cart.region} discount={0} index={i} item={c} key={i} />
              })
            }
            <div className="flex flex-col gap-4">
              <DiscountCode cart={cart} />
              <GiftCard cart={cart} />
            </div>

            <div className="flex justify-between w-full">
              <span className="">Subtotal</span>
              <span>{getAmount(subtotal)}</span>
            </div>
            {!!discount_total && (
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span>- {getAmount(discount_total)}</span>
              </div>
            )}
            {!!gift_card_total && (
              <div className="flex items-center justify-between">
                <span>Gift card</span>
                <span>- {getAmount(gift_card_total)}</span>
              </div>
            )}
            <div className="flex font-bold justify-between w-full">
              <span>Total</span>
              <span>{getAmount(total)}</span>
            </div>
          </div>


        </div>
      </div> */}
    </div>
  )
}

export default CartTotals

export const PaymentOption = ({ active = false, icon, onClick }: { active: boolean, icon: string, onClick: React.MouseEventHandler, }) => {
  return <div
    onClick={onClick}
    className={clsx("border p-4 h-[100px] cursor-pointer w-[100px] rounded-[5px]",
      {
        'border-black border-2': active,
        'border-[#757575] bg-[#d9d9d9]': !active,
      }
    )}>
    <Image src={icon} height={100} width={100} alt={icon} />
  </div>
}