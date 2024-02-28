import { PaymentSession } from "@medusajs/medusa"
import clsx from "clsx"
import React from "react"
import PaymentStripe from "../payment-stripe"
import PaymentTest from "../payment-test"

type PaymentContainerProps = {
  paymentSession: PaymentSession
  selected: boolean
  disabled?: boolean,
}

const PaymentInfoMap: Record<string, { title: string; description: string }> = {
  stripe: {
    title: "Credit card",
    description: "Secure payment with credit card",
  },
  "stripe-ideal": {
    title: "iDEAL",
    description: "Secure payment with iDEAL",
  },
  paypal: {
    title: "PayPal",
    description: "Secure payment with PayPal",
  },
  manual: {
    title: "Test payment",
    description: "Test payment using medusa-payment-manual",
  },
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({
  paymentSession,
  selected,
  disabled = false,
}) => {
  return (
    <div>
      <div
        className={clsx(
          "flex flex-col gap-y-4 my-2 last:border-b-0",
          { 'bg-gray-50': selected }
        )} >
        <button
          className={"gap-x-4 text-left py-4 px-8"}
          disabled={disabled}>
          <h3 className="text-base-semi  leading-none text-gray-900">
            {PaymentInfoMap[paymentSession.provider_id]?.title}
          </h3>
          <span className="text-gray-700  text-small-regular mt-2">
            {PaymentInfoMap[paymentSession.provider_id]?.description}
          </span>
          <div className="flex text-left">
            <div className="w-full my-5">
              <PaymentElement paymentSession={paymentSession} />
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}

const PaymentElement = ({
  paymentSession,
}: {
  paymentSession: PaymentSession
}) => {
  switch (paymentSession.provider_id) {
    case "stripe":
      return (
        <div className="pt-8 pr-7">
          <PaymentStripe />
        </div>
      )
    case "paypal":
      return (
        <div className="pt-8 pr-7">

        </div>
      );

    case "manual":
      // We only display the test payment form if we are in a development environment
      return process.env.NODE_ENV === "development" ? <PaymentTest /> : null
    default:
      return null
  }
}

export default PaymentContainer
