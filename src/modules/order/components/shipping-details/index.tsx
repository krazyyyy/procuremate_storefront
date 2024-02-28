import { Address, ShippingMethod } from "@medusajs/medusa"

type ShippingDetailsProps = {
  address: Address
  shippingMethods: ShippingMethod[]
}

const ShippingDetails = ({
  address,
  shippingMethods,
}: ShippingDetailsProps) => {
  if (!address) return null;
  return (
    <div className="text-base-regular">
      <h2 className="text-base-semi small:text-xl">Delivery</h2>
      <div className="my-2">
        <h3 className="text-base-regular text-gray-700 font-bold">Address</h3>
        <div className="flex flex-col">
          <span>{`${address?.first_name} ${address?.last_name}`}</span>
          <span>{`${address?.address_1}${address?.address_2 && ", " + address?.address_2
            }`}</span>
          <span>{`${address?.city}, ${address?.province} ${address?.postal_code}`}</span>
          <span>
            {(
              address?.metadata?.country !== undefined
                ? address?.metadata?.country
                : address?.country_code?.toUpperCase()
            ) as React.ReactNode}
          </span>
         </div>
      </div>
      <div className="my-2">
        <h3 className="text-small-regular text-gray-700">Delivery method</h3>
        <div>
          {shippingMethods.map((sm) => {
            return <div key={sm.id}>{sm.shipping_option.name}</div>
          })}
        </div>
      </div>
    </div>
  )
}

export default ShippingDetails
