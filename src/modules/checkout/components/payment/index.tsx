import { useCheckout } from "@lib/context/checkout-context"
import Spinner from "@modules/common/icons/spinner"
import { useEffect } from "react"
import { SectionTitle } from "../../../cart/templates/guest"
import PaymentContainer from "../payment-container"
import { PaymentOption } from "../../../common/components/cart-totals"

const Payment = () => {
  const {
    cart,
    setPaymentSession,
    initPayment,
  } = useCheckout()
  /**
   * Fallback if the payment session are not loaded properly we
   * retry to load them after a 5 second delay.
   */
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null

    if (cart?.payment_sessions) {
      timeout = setTimeout(() => {
        initPayment()
      }, 1000)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  const options: Record<string, string> = {
    'stripe': '/icons/visa.svg',
    'paypal': '/icons/paypal.svg',
    // 'manual': '/icons/thai.svg',
  }

  return (
    <div>
      <div>
        <SectionTitle>Payment</SectionTitle>
        <span className="text-xs sm:text-sm">Please choose payment method.</span>
      </div>
      {
        cart?.payment_sessions?.length ? (
          <div className="my-3">
            <div className="flex gap-4">
              {
                cart.payment_sessions
                  .sort((a, b) => {
                    return a.provider_id < b.provider_id ? 1 : -1
                  })
                  .map((paymentSession) => {
                    if (options[paymentSession.provider_id]) {
                      return <div key={paymentSession.provider_id}>
                        <PaymentOption
                          onClick={() => setPaymentSession(paymentSession.provider_id)}
                          active={cart?.payment_session?.provider_id === paymentSession.provider_id}
                          icon={options[paymentSession.provider_id]} />
                      </div>
                    }
                  })
              }
            </div>

            {cart.payment_sessions
              .sort((a, b) => {
                return a.provider_id < b.provider_id ? 1 : -1
              })
              .map((paymentSession) => {
                if (options[paymentSession.provider_id] && cart?.payment_session?.provider_id === paymentSession.provider_id) {
                  return <div key={paymentSession.provider_id}>
                    <PaymentContainer
                      paymentSession={paymentSession}
                      selected={cart?.payment_session?.provider_id === paymentSession.provider_id}
                    />
                  </div>
                }
              })
            }

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-gray-900">
            <Spinner />
          </div>
        )
      }
    </div >
  )
}

export default Payment
