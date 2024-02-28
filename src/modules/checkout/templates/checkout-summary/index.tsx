import PaymentButton from "@modules/checkout/components/payment-button"
import CartTotals from "@modules/common/components/cart-totals"
import { useCart } from "medusa-react"
import Payment from "../../components/payment"
import { useEffect, useState } from "react"
import { debounce } from "lodash"

const CheckoutSummary = () => {
  const { cart, setCart, updateCart } = useCart()
  const [comment, setComment] = useState<string>('')

  useEffect(() => {
    if (typeof cart?.context?.comment === 'string' && comment?.length === 0) {
      setComment(cart?.context?.comment as string)
    }
  }, [cart?.context])

  if (!cart?.id) {
    return null
  }
  const handleMutation = async () => {
    await updateCart.mutateAsync(
      { context: { ...cart.context, comment } },
      {
        onSuccess: ({ cart }) => {
          setCart(cart)
        },
        onError: (error) => {
          if (process.env.NODE_ENV === "development") {
            console.error(error)
          }
        },
      }
    )
  }

  const handleCommentChange = (comm?: string) => {
    setComment(comm!)
    debounce(handleMutation, 200)();
  }

  return (
    <div className="sticky w-full small:w-1/2 top-0 flex mt-10 flex-col-reverse small:flex-col gap-y-8">
      <CartTotals cart={cart} />

      <textarea
        value={comment}
        onChange={(e) => handleCommentChange(e.target.value)}
        placeholder="Add additional comments" className="rounded border p-5 border-gray-300" />
      <div>
        <Payment />
        <PaymentButton paymentSession={cart?.payment_session} />
      </div>
    </div>
  )
}

export default CheckoutSummary
