import { useCheckout } from "@lib/context/checkout-context"
import Button from "@modules/common/components/button"
import Checkbox from "@modules/common/components/checkbox"
import BillingAddress from "../../components/billing_address"
import ShippingAddress from "../../components/shipping-address"
import Shipping from "../../components/shipping"
import { Cart } from "@medusajs/medusa"

const CheckoutForm = () => {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isEdit, toggle: setEdit },
    setAddresses,
    handleSubmit,
    cart,
  } = useCheckout()
  return (
    <div className="small:max-w-lg w-full">
      <div>
        <ShippingAddress />
        <div className="mt-6">
          <Checkbox
            onChange={onChange}
            label="Use same address for billing"
            checked={checked} />
        </div>
        {!checked && (
          <div className="">
            <div className="text-xl-semi flex items-center gap-x-4 pb-6 pt-8">
              <h2>Billing address</h2>
            </div>
            <BillingAddress />
          </div>
        )}
        <Button
          className="max-w-[200px] rounded-[5px] mt-6"
          onClick={handleSubmit(setAddresses)}>
          Continue
        </Button>
        {cart?.billing_address && <Shipping cart={cart as Cart} />}
      </div>
    </div>
  )
}

export default CheckoutForm
