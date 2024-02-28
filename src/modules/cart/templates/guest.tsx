import Image from "next/image"
import { useState } from "react"
import Input from "../../common/components/input"
import PrimaryButton from "../../common/components/primary-button"
import Checkbox from "../../common/components/checkbox"
import CheckoutCartItem from "../components/cart-item/variant"
import clsx from "clsx"
import { useCart } from "medusa-react"
import SkeletonCartPage from "../../skeletons/templates/skeleton-cart-page"
import { useAccount } from "@lib/context/account-context"



const GuestTemplate = () => {
  const { cart } = useCart()
  const { customer } = useAccount()
  // const items = useEnrichedLineItems()


  const [paymentOption, setPaymentOption] = useState('visa')
  const [items, setItems] = useState([
    {
      img: '/images/product-2.png',
      name: 'Product 3',
      type: 'Ready Made',
      amount: 2,
      color: 'Pink/Black',
      size: 'XS',
    },
  ])
  if (!cart || !cart?.id?.length) {
    return <SkeletonCartPage />
  }

  return (
    <div className="font-montserrat">
      <div className="content-container">
        {!customer && <h1 className="py-4 small:py-8 text-3xl small:leading-[49px] small:text-[40px] font-bold">You are purchasing as Guest.</h1>}
        <div className="flex my-4 relative flex-wrap justify-between small:flex-nowrap overflow-hidden">
          <div className='p-4 flex small:max-w-lg flex-col gap-2 w-full small:w-1/2 relative'>
            <SectionTitle>Your details</SectionTitle>
            <Input name="first_name" title="First Name" label="First Name" />
            <Input name="last_name" title="Last Name" label="Last Name" />
            <Input name="email" title="Email" label="Email" />
            <div className="small:my-1"></div>
            <SectionTitle>Shipping address</SectionTitle>
            <Input name="address_1" title="Address 1" label="Address 1" />
            <Input name="address_2" title="Address 2" label="Address 2" />
            <Input name="city" title="City" label="City" />
            <Input name="zip_code" title="Zip Code" label="Zip Code" />
            <Input name="country" title="Country" label="Country" />
            <Input name="phone" title="Phone" label="Phone" />
            <Checkbox label="Use same address for billing" checked />
            <SectionTitle>Shipping Options</SectionTitle>
            <ShippingOption title="Standard Shipping" price={100} active />
            <ShippingOption title="Kerry Express" price={200} />
          </div>
          <div className="h-full max-h-min z-40 w-1 bg-black absolute hidden small:block left-1/2"></div>

          <div className="flex flex-col p-6 small:p-12 w-full small:w-1/2 gap-3">
            <div className="border flex flex-col gap-4 p-4">
              {
                items.map((c, i) => {
                  return <CheckoutCartItem price={2500} index={i} {...c} key={i} />
                })
              }
              <div className="flex flex-col gap-4">
                <Input name="promo" title="Promo Code/Voucher" label="Promo Code/Voucher" />
                <Input name="gift" title="Gift Card" label="Gift Card" />
              </div>
              <div className="flex justify-between w-full">
                <span className="">Subtotal</span>
                <span>THB {(20_000).toLocaleString()}</span>
              </div>
              <div className="flex font-bold justify-between w-full">
                <span className="">Total</span>
                <span>THB {(20_000).toLocaleString()}</span>
              </div>
            </div>
            {/* <CartMenu><PrimaryButton className="mt-3" >Checkout</PrimaryButton></CartMenu> */}
            <div>
              <SectionTitle>Payment</SectionTitle>
              <span className="text-xs sm:text-sm">Please choose payment method.</span>
              <div className="flex gap-2 my-2">
                {['/icons/visa.svg', '/icons/paypal.svg', '/icons/thai.svg'].map((icon, i) => {
                  return <PaymentOption active={icon.includes(paymentOption)} key={i} icon={icon} onClick={() => setPaymentOption(icon)} />
                })}
              </div>
              {/* <PaymentContainer paymentSession={{ provider_id: 'stripe' }} /> */}
              <span className="text-xs sm:text-sm">
                {"By clicking Pay and Place Order, you agree to purchase your item(s) from Global-e as merchant of record for this transaction, on Global-e’ Terms and Conditions and Privacy Policy."}
              </span>
              <PrimaryButton className="my-4">Place Order</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GuestTemplate

export const SectionTitle = ({ children }: any) => {
  return <div className="mt-2">
    <span className="font-bold uppercase">{children}</span>
  </div>
}

const ShippingOption = ({ active = false, title, price }: { active?: boolean, title: string, price: number }) => {
  return <div className="flex gap-3 justify-between rounded-[5px] border-[#757575] border p-4">
    <div className="flex items-center gap-4">
      <Checkbox label="" checked={active} />
      <span className="">{title}</span></div>
    <span className="">THB {price.toFixed(2)}</span>
  </div>
}

const PaymentOption = ({ active = false, icon, onClick }: { active: boolean, icon: string, onClick: React.MouseEventHandler }) => {
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