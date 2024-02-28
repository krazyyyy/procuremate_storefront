import { ErrorMessage } from "@hookform/error-message"
import { Cart } from "@medusajs/medusa"
import Spinner from "@modules/common/icons/spinner"
import { formatAmount, useCart, useCartShippingOptions } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import Checkbox from "../../../common/components/checkbox"

type ShippingOption = {
  value: string
  label: string
  price: string
}

type ShippingProps = {
  cart: Omit<Cart, "refundable_amount" | "refunded_total">,
  showLabel?: boolean,
}

type ShippingFormProps = {
  soId: string
}

const Shipping: React.FC<ShippingProps> = ({ cart, showLabel = true }) => {
  const { addShippingMethod, setCart } = useCart()
  const {
    control,
    setError,
    formState: { errors },
  } = useForm<ShippingFormProps>({
    defaultValues: {
      soId: cart.shipping_methods?.[0]?.shipping_option_id,
    },
  })

  // Fetch shipping options
  const { shipping_options, refetch } = useCartShippingOptions(cart.id, {
    enabled: !!cart.id,
  })

  // Any time the cart changes we need to ensure that we are displaying valid shipping options
  useEffect(() => {
    const refetchShipping = async () => {
      await refetch()
    }

    refetchShipping()
  }, [cart, refetch])

  const submitShippingOption = (soId: string) => {
    addShippingMethod.mutate(
      { option_id: soId },
      {
        onSuccess: ({ cart }) => setCart(cart),
        onError: () =>
          setError(
            "soId",
            {
              type: "validate",
              message:
                "An error occurred while adding shipping. Please try again.",
            },
            { shouldFocus: true }
          ),
      }
    )
  }

  const handleChange = (value: string, fn: (value: string) => void) => {
    submitShippingOption(value)
    fn(value)
  }

  // Memoized shipping method options
  const shippingMethods: ShippingOption[] = useMemo(() => {
    if (shipping_options && cart?.region) {
      return shipping_options?.map((option) => {
        return ({
          value: option.id!,
          label: option.name!,
          price: formatAmount({
            amount: option.amount || 0,
            region: cart.region,
          }),
        });
      })
    }

    return []
  }, [shipping_options, cart])


  return (
    <div>
      {showLabel && <div className="text-xl-semi flex items-center gap-x-4 px-8 pb-6 pt-8">
        <h2>Delivery</h2>
      </div>}
      <Controller
        name="soId"
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <div className="flex flex-col gap-4">
              {shippingMethods && shippingMethods.length ? (
                shippingMethods.map((option) => {
                  return (
                    <ShippingOptionComponent price={option.price} onClick={() => handleChange(option.value, onChange)} key={option.label} title={option.label} active={value === option.value} />
                  )
                })
              ) : (
                <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-900">
                  <Spinner />
                </div>
              )}
              <ErrorMessage
                errors={errors}
                name="soId"
                render={({ message }) => {
                  return (
                    <div className="pt-2 text-rose-500 text-small-regular">
                      <span>{message}</span>
                    </div>
                  )
                }}
              />
            </div>
          )
        }}
      />
    </div>


  )
}

export default Shipping

const ShippingOptionComponent = ({ active = false, title, price, onClick }: { active?: boolean, title: string, price: string, onClick: React.MouseEventHandler }) => {
  return <div onClick={onClick} className="flex transition-all hover:border-primary  hover:bg-gray-50 cursor-pointer gap-3 justify-between rounded-[5px] border-[#757575] border p-4">
    <div className="flex items-center gap-4">
      <Checkbox label="" checked={active} />
      <span className="">{title}</span></div>
    <span className="">{price}</span>
  </div>
}