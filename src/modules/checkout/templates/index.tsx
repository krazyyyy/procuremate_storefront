import { CheckoutProvider } from "@lib/context/checkout-context"
import CheckoutLoader from "../components/checkout-loader"
import CheckoutForm from "./checkout-form"
import CheckoutSummary from "./checkout-summary"
import { useAccount } from "@lib/context/account-context"
import { useEffect } from "react"
import Medusa from '@lib/services/api'
import { useCart } from "medusa-react"

const CheckoutTemplate = () => {
  const { customer } = useAccount()
  const { cart } = useCart();

  useEffect(() => {
    const createOrder = async () => {
      return await Medusa.orders.create({ cart })
    }
    try {
      if (cart?.id) {
        createOrder();
      }
    } catch (error) {

    }
  }, [])

  return (
    <CheckoutProvider>
      <div className="font-montserrat relative small:min-h-screen">
        <div className="relative">
          {!customer && <h1 className="py-4 content-container small:py-8 text-3xl small:leading-[49px] small:text-[40px] font-bold">You are purchasing as Guest.</h1>}
          <CheckoutLoader />
          <div className="flex flex-wrap small:flex-nowrap justify-between gap-y-8 content-container gap-x-8 py-12">
            <CheckoutForm />
            <VerticalLine />
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  )
}

export default CheckoutTemplate;

const VerticalLine = () => {
  return <div className="h-full max-h-min min-h-screen small:block hidden mt-10 w-[2px]  bg-black" />
}